from django.http import HttpResponse
from django.shortcuts import render
from django.views import generic
from django.views.decorators.csrf import csrf_exempt
from django.utils.crypto import salted_hmac
from django.core.cache import cache
import json, demjson, sys, os
print sys.path
# change to wherever fswig_hklgen.py is located
sys.path.append("/mnt/hgfs/Ubuntu_Shared/pycrysfml/hklgen")
from decimal import *
import periodictable
import fswig_hklgen as H
import pycrysfml as pyc
import hkl_model as Mod
import numpy as np
from math import floor
from string import ljust
import StringIO, zipfile
from bumps.fitters import FitDriver, DreamFit, StepMonitor
from bumps.mapper import SerialMapper
from bumps.fitproblem import FitProblem, nllf_scale
from bumps.options import BumpsOpts
from bumps import monitor
from bumps.history import History
import bumps.util
from bumps.cli import setup_logging, make_store, store_overwrite_query, save_best, beep
from .calculations.vtkModel.CellClass import Cell
from .calculations.vtkModel.SpaceGroups import *
from .models import Question, Choice, Atom
from .read_cif import *
import hashlib, threading, datetime, time

"""Template used for main page"""
class IndexView(generic.ListView):
    template_name = 'bland/index.html'
    
    def get_queryset(self):
	pass

"""Renders page with status of fit"""
def status(request, token):
    context = {'token': token}
    return render(request, 'bland/status.html', context)

"""Modified CrystalCell class from fswig_hklgen.py."""
class _CrystalCell(H.CrystalCell):
    def __init__(self, length=None, angle=None):
	H.CrystalCell.__init__(self, length, angle)
        """pyc.crystal_cell_type.__init__(self)
        if (length != None):
            self.setCell(length, angle)"""
    def length(self):
        LVec = pyc.FloatVector([0 for i in range(3)])
        self.get_crystal_cell_cell(LVec)
        return LVec
    def lengthList(self):
        LVec = self.length()
        return list(LVec)
    def angle(self):
        AVec = pyc.FloatVector([0 for i in range(3)])
        self.get_crystal_cell_ang(AVec)
        return AVec
    def angleList(self):
        AVec = self.angle()
        return list(AVec)
    @property
    def volume(self):
        return self.get_crystal_cell_cellvol()
    @volume.setter
    def volume(self, value):
        self.set_crystal_cell_cellvol(value)
    def setCell(self, length, angle):
        pyc.FortFuncs().set_crystal_cell(pyc.FloatVector(length), pyc.FloatVector(angle), self, None, None)    

"""Modified SpaceGroup class from fswig_hklgen.py."""
class _SpaceGroup(H.SpaceGroup):
    def __init__(self, groupName=None):
	H.SpaceGroup.__init__(self, groupName)
    @property
    def labl(self):
        return pyc.getSpaceGroup_info(self)
    @property
    def PG(self):
        return pyc.getSpaceGroup_pg(self)
    @property
    def symbol(self):
        return pyc.getSpaceGroup_spg_symb(self)

"""Modified Atom class from fswig_hklgen.py. Added functionality"""
class Atom(pyc.atom_type):
    def __init__(self, *args):
        # construct an atom from a list of attributes
        pyc.atom_type.__init__(self)
        if (len(args) == 6):
            pyc.FortFuncs().init_atom_type(self)
            self.set_atom_lab(ljust(args[0],20)) # set atom label
            self.set_atom_chemsymb(ljust(args[1], 2)) # set element
            self.set_atom_sfacsymb(ljust(self.element(), 4))
            self.set_atom_x(pyc.FloatVector(args[2]))
            self.set_atom_mult(args[3])
            self.set_atom_occ(float(args[4]))
            self.set_atom_biso(float(args[5]))
    def coords(self):
        CVec = pyc.FloatVector([0 for i in range(3)])
        self.get_atom_x(CVec)
        return list(CVec)
    def setCoords(self, value):
        self.set_atom_x(pyc.FloatVector(value))
    def multip(self):
        return self.get_atom_mult()
    def sfacsymb(self):
        return pyc.getAtom_sfacsymb(self)
    def setSfacsymb(self):
        self.set_atom_sfacsymb(self.element())
    def setMultip(self, value):
        return self.set_atom_mult(value)
    def occupancy(self):
        return self.get_atom_occ()
    def setOccupancy(self, value):
        self.set_atom_occ(value)
    def element(self):
        return pyc.getAtom_chemsymb(self)
    def setElement(self, value):
        assert len(value) <= 2, "Value must be 2 characters or less"
        return self.set_atom_chemsymb(value)
    def BIso(self):
        return self.get_atom_biso()
    def setBIso(self, value):
        self.set_atom_biso(value)
    def label(self):
        return pyc.getAtom_lab(self)
    def setLabel(self, label):
        self.set_atom_lab(label)
    def sameSite(self, other):
        # TODO: make this work for equivalent sites, not just identical ones
        # returns true if two atoms occupy the same position
        # Warning: they must be specified with identical starting coordinates
        eps = 0.001
        return all([H.approxEq(self.coords()[i], other.coords()[i], eps)
                    for i in xrange(3)])

"""Modified AtomList class from fswig_hklgen.py"""
class AtomList(pyc.atom_list_type, pyc.matom_list_type):
    def __init__(self, atoms=None, magnetic=False):
        self.magnetic = magnetic
        self.index = -1
        if magnetic:
            pyc.matom_list_type.__init__(self)
        else:
            pyc.atom_list_type.__init__(self)
        if (atoms != None):
            self.numAtoms = len(atoms)
            pyc.FortFuncs().allocate_atom_list(len(atoms), self, None)
            #self.numAtoms = numAtoms
            self.set_atom_list_natoms(len(atoms))
            ## copy information from provided atom list
            for i, atom in enumerate(self):
                """for field in atom._fields_:
                    print field
                    setattr(atom, field[0], getattr(atoms[i], field[0]))"""
                atom.setBIso(atoms[i].BIso())
                atom.setLabel(atoms[i].label())
                atom.setOccupancy(atoms[i].occupancy())
                atom.setCoords(atoms[i].coords())
                atom.setElement(atoms[i].element())
                atom.setSfacsymb()
                atom.setMultip(atoms[i].multip())
                self[i] = atom
    def __len__(self):
        if self.magnetic:
            return self.get_matom_list_natoms()
        else:
            return self.get_atom_list_natoms()
    def __iter__(self):
        return self
    def next(self):
        self.index += 1
        if self.index == len(self):
            self.index = -1
            raise StopIteration
        return self[self.index]
    def __getitem__(self, index):
        if isinstance(index, int):
            if (index < 0): index += len(self)
            if self.magnetic:
                result = H.MagAtom()
                self.get_matom_list_element(result, index)
                return result
            else:
                result = Atom()
                self.get_atom_list_element(result, index)
                return result
        elif isinstance(index, slice):
            start, stop, step = index.indices(len(self))    # index is a slice
            L = []
            for i in range(start, stop, step):
                L.append(self.__getitem__(i))
            return L
        else:
            raise TypeError("index must be int or slice")        
    def __setitem__(self, index, value):
        if self.magnetic:
            self.set_matom_list_element(value, index)
            #print 'setting index', index, 'to', value
        else:
            self.set_atom_list_element(value, index)

"""Writes fit updates to temp file"""
class CustomMonitor(monitor.Monitor):
    FIELDS = ['step', 'time', 'value', 'point']
    
    def __init__(self, problem, key, fields=FIELDS):
        if any(f not in self.FIELDS for f in fields):
            raise ValueError("invalid monitor field")
        self.fields = fields
        self.problem = problem
	self.key = key
        self._pattern = "%%(%s)s\n" % (")s %(".join(fields))
        
    def config_history(self, history):
        history.requires(time=1, value=1, point=1, step=1)
    
    def __call__(self, history):
	print datetime.datetime.now()
	print self.problem.summarize()
	print datetime.datetime.now()
        point = " ".join("%.15g" % v for v in history.point[0])
        time = "%g" % history.time[0]
        step = "%d" % history.step[0]
        scale, _ = nllf_scale(self.problem)
        value = "%.15g" % (scale * history.value[0])
        out = self._pattern % dict(point=point, time=time,
                                    value=value, step=step)
        print("p is", self.problem.getp())
	print("chisq is", self.problem.chisq_str())
        fp = open('/tmp/bland/store_' + self.key + '/out.txt', 'w')
        fp.write("# " + ' '.join(self.fields) + '\n')
        fp.write(out)
	fp.write(str(self.problem.chisq_str()) + '\n')
	fp.write(self.problem.summarize())
	#fp.write(str(self.problem.getp()))
        fp.close()    

"""Data structure that represents command line options given to BUMPS"""
class Opts:
    def __init__(self, fit, store, args):
        self._fit = fit
        self._store = store
        self._args = args
    @property
    def fit(self):
        return self._fit
    @property
    def store(self):
        return self._store
    @property
    def args(self):
        return self._args
    @property
    def overwrite(self):
        return None
    @property
    def batch(self):
        return None

"""Calculates structure factors and intensities given crystal parameters"""
@csrf_exempt
def calc(request):
    x = demjson.decode(request.body)  
    instrument, phases = x['myReducer3'][0], x['myReducer4']['Phases']
    tt_mod = [float(s) for s in request.session['tt']]
    obs_mod = [float(l) for l in request.session['obs']]
    uvw = [float(instrument['u']), float(instrument['v']), float(instrument['w'])]
    tMin, tMax, wavelength = float(instrument['tmin']), float(instrument['tmax']), float(instrument['wavelength'])
    my_cells, real_sgs, atomLists = makeCellModel(phases)
    tts, intensities, hkls, structFacts, sfs, ints, hkl_rets, tt1s, twothetas, twothetas1, peakses, backgrounds, intensities_obs = {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
    for i in range(len(phases)):
	tts[i], tt1s[i], intensities[i], hkls[i], peakses[i], backgrounds[i] = diffPattern(wavelength=wavelength, cell=my_cells[i], uvw=uvw, ttMin=tMin, ttMax=tMax, spaceGroup=real_sgs[i], atomList=atomLists[i], info=True)
	structFacts[i] = structWrap(tMin, tMax, wavelength, real_sgs[i], my_cells[i], atomLists[i])
	try:
	    ttObs = request.session['tt']
	except:
	    ttObs = tt1s[i]
	intensities_obs[i] = H.getIntensity(peakses[i], backgrounds[i], ttObs, base=0)
	sfs[i] = []
	for j in range(len(tts[i])):
	    sfs[i].append(structFacts[i][j])
	    temp1 = tts[i][j]
	    tts[i][j] = float(temp1)
	for j in range(len(tt1s[i])):
	    
	    temp1 = tt1s[i][j]
	    tt1s[i][j] = float(temp1)
	for l in range(len(intensities_obs[i])):
	    temp = intensities_obs[i][l]
	    intensities_obs[i][l] = float(temp)	    
	ints[i] = intensities_obs[i].tolist()
	twothetas1[i] = tt1s[i].tolist()
	hkl_rets[i] = []
	for k in range(len(hkls[i][0])):
	    hkl_rets[i].append([int(hkls[i][0][k]), int(hkls[i][1][k]), int(hkls[i][2][k])])	
    ret = json.dumps([hkl_rets[0], tts[0], sfs[0], ttObs, ints[0]])
    return HttpResponse(ret)

"""Starts a fit given a crystal model and fitting parameters"""
@csrf_exempt
def fitting(request):
    x = demjson.decode(request.body)
    tt_mod, obs_mod = [float(s) for s in request.session['tt']], [float(l) for l in request.session['obs']]   
    fits, instrument, my_phases, state = x['myReducer5'][0], x['myReducer3'][0], x['myReducer4']['Phases'], str(x['myReducer4'])
    my_cells, real_sgs, atomLists = makeCellModel(my_phases)
    phases = makePhases(fits)
    if len(fits) != 0:
	backg = H.LinSpline(None)
	u, v, w, wavelength = float(instrument['u']), float(instrument['v']), float(instrument['w']), float(instrument['wavelength'])
	try:
	    steps = 'steps = ' + str(fits['steps'])
	    burn = 'burn = ' + str(fits['burn'])
	    num_burn = int(fits['burn'])
	    num_steps = int(fits['steps'])
	except:
	    burn = 'burn = 0'
	    num_burn = 0
	    steps = 'steps = 5'
	    num_steps = 5
	u_pm, v_pm, w_pm, zero_pm, eta_pm, scale_pm = tryParams(phases)
	cell_hkl = makeModelCell(my_cells[0], real_sgs, phases)
	m = makeModel(tt_mod, obs_mod, backg, u, v, w, wavelength, real_sgs, cell_hkl, atomLists, instrument, u_pm, v_pm, w_pm, zero_pm, eta_pm, scale_pm, phases)	
	key = hashlib.sha1(str(datetime.datetime.now())).hexdigest()[:5]
	if not os.path.exists('/tmp/bland/store_' + key):
		os.makedirs('/tmp/bland/store_' + key)    	
	with open('/tmp/bland/store_' + key + '/out.txt', 'w') as fp:
	    fp.write('Starting...')
	thread = threading.Thread(target=fitter, args=(m, steps, num_steps, burn, num_burn, key,))
	thread.start()
	_key, _value = 'bland.views.fitting', (state + str(datetime.datetime.now()))
	token = salted_hmac(_key, _value).hexdigest()[:10]
	cache.set(token, key)
	cache.persist(token)
	while(1):
	    with open('/tmp/bland/store_' + key + '/out.txt', 'r') as f:
		first_line = f.readline()
	    if(first_line != 'Starting...'):
		break
	    else:
		time.sleep(5)
	return HttpResponse(token)

"""Handles upload of crystal model file (.pcr, .cif, .cfl...)"""
@csrf_exempt
def upload(request):
    fp = request.FILES['file']
    handle_uploaded_file(fp)
    spaceGroup, cell, atomList = H.readInfo(os.path.join('/tmp/bland',str(fp.name)))
    request.session['sg'] = pyc.getSpaceGroup_spg_symb(spaceGroup)
    ret = [spaceGroup.number, list(cell.length()), list(cell.angle())]
    for atom in atomList:
	for el in periodictable.elements:
	    if(el.symbol == pyc.getAtom_chemsymb(atom)):
		ell = el.number
	ret.append([pyc.getAtom_lab(atom), pyc.getAtom_chemsymb(atom), atom.coords(), atom.occupancy(), atom.BIso(), ell])
    ret = json.dumps(ret)
    return HttpResponse(ret)

"""Handles upload of observed data file. Requires knowledge of mode of data"""
@csrf_exempt
def data(request):
    mode = request.POST['mode']
    try:
	fp = request.FILES['file']
    except:
	return HttpResponse('Key error')
    handle_uploaded_file(fp)
    go = True
    if mode == 'GSAS' or mode =='GSASTOF':
	go = False
	for line in fp:
	    if len(line.split()) > 0:
		if line.split()[0] == 'BANK':
		    if len(line.split()) == 10:
			go = True
    elif mode == 'XYSIGMA':
	go = False
	ln3 = False
	ln2 = False
	for line in fp:
	    if len(line.split()) >= 3:
		if ln3:
		    ln2 = True
		ln3 = True
	    elif len(line.split()) >= 2:
		ln2 = True
	if ln3 and ln2:
	    go = True
    if go == True:
	(tt, observed, error) = H.readIllData(os.path.join('/tmp/bland',str(fp.name)), str(mode), None)
    else:
	return HttpResponse('Sorry, this didn\'t work')    
    request.session['tt'], request.session['obs'] = tt, observed
    ret = json.dumps([list(tt), list(observed), list(error)])
    return HttpResponse(ret)

"""Gets the status of an ongoing fit from the file written to by the monitor"""
@csrf_exempt
def stat(request):
    x = demjson.decode(request.body)
    print x
    try:
	key = cache.get(x)
	print key
	fp = open('/tmp/bland/store_' + key + '/out.txt')
	num = 0
	for line in fp:
	    ln = line.split()
	    if(ln[0] != '#' and ln[0] != 'Starting...' and num != 0 and ln[0] != 'Complete!'):
		if len(ln) == 1:
		    print "chisq"
		    print ln
		    out['chisq'] = ln
		else:
		    if(num == 1):
			out = {'step': ln[0], 'time': ln[1], 'params': [x for x in ln[3:]]}
			out['param_list'] = []
		    else:
			if(ln[1][0] is not '.'):
			    out['param_list'].append(ln[0] + " - " + ln[1])
			else:
			    out['param_list'].append(ln[0])
	    num += 1
	if(line == 'Complete!'):
	    out['complete'] = True
	else:
	    out['complete'] = False
	fp.close()
	ret = json.dumps(out)
    except:
	ret = json.dumps('Sorry, the key doesn\'t exist')
    return HttpResponse(ret)

"""Sends .zip of images created by BUMPS at the end of the fit"""
@csrf_exempt
def files(request):
    x = demjson.decode(request.body)
    filez = open('/tmp/out.log', 'w')
    filez.write(x)
    filez.close()
    try:
	key = cache.get(x)
	files = []
	for fil in os.listdir("/tmp/bland/store_" + key):
	    if fil.endswith('.png'):
		files.append("/tmp/bland/store_" + key + "/" + fil)
	zip_subdir = "images"
	zip_filename = "%s.zip" % zip_subdir
	s = StringIO.StringIO()
	zf = zipfile.ZipFile(s, "w")
	for fpath in files:
	    fdir, fname = os.path.split(fpath)
	    zip_path = os.path.join('images', fname)
	    zf.write(fpath, zip_path)
	zf.close()
	resp = HttpResponse(s.getvalue(), content_type = "application/zip")
	resp['Content-Length'] = os.path.getsize('images.zip')
	resp['Content_Disposition'] = 'attachment; filename="images.zip"'
	return HttpResponse(resp)
    except:
	return HttpResponse("Sorry, this key doesn't exist.")

"""Handles upload of .json parameter file"""
@csrf_exempt
def passing(request):
    try:
	fp = request.FILES['file']
    except:
	return HttpResponse('Key error')
    for line in fp:
	ret = line
    return HttpResponse(ret)

"""Stores file in temporary directory"""
def handle_uploaded_file(f):
    if not os.path.exists('/tmp/bland'):
	os.makedirs('/tmp/bland')    
    with open(os.path.join('/tmp/bland',str(f.name)), 'wb+') as destination:
	for chunk in f.chunks():
	    destination.write(chunk)

"""Starts BUMPS fit. Edit this method to change how the fit runs"""
def fitter(prob, steps, num_steps, burn, num_burn, key):
    problem = FitProblem(prob)
    opts = Opts(DreamFit, '/tmp/bland/store_' + key, [burn, steps])
    setup_logging()
    problem.path = '/mnt/hgfs/Ubuntu_Shared/mysite/bland/views.py'
    mapper = SerialMapper
    monitor = CustomMonitor(problem, key)
    #monitor = StepMonitor(problem, fp)
    extra_opts = {'burn': num_burn, 'pop': 10, 'init': 'eps', 'steps': num_steps, 'thin': 1, 'samples': 10000}
    fitdriver = FitDriver(
	DreamFit, problem=problem, monitors=[monitor], abort_test=lambda: False,
	**extra_opts)	
    make_store(problem, opts, exists_handler=store_overwrite_query)
    resume_path = None    
    fitdriver.mapper = mapper.start_mapper(problem, opts.args)    
    best, fbest = fitdriver.fit(resume=resume_path)    
    save_best(fitdriver, problem, best)    
    mapper.stop_mapper(fitdriver.mapper)	      
    problem.model_update()
    #chisq = "\n" + fitdriver.problem.chisq_str()
    with open("/tmp/bland/store_" + key + "/out.txt", 'a') as txt_file:
	#txt_file.write(chisq)
	txt_file.write("\nComplete!")
    return

"""Calculate the intensities for a crystal structure. Modified version of the method in fswig_hklgen.py"""
def diffPattern(infoFile=None, backgroundFile=None, wavelength=1.5403,
                ttMin=0, ttMax=180, ttStep=0.05, exclusions=None,
                spaceGroup=None, cell=None, atomList=None,
                symmetry=None, basisSymmetry=None, magAtomList=None,
                uvw=[0,0,1], scale=1,
                magnetic=False, info=False, plot=False, saveFile=None,
                observedData=(None,None), labels=None, base=0, residuals=False, error=None, muR=None):
    background = H.LinSpline(backgroundFile)
    sMin, sMax = H.getS(ttMin, wavelength), H.getS(ttMax, wavelength)
    if magnetic:
        if (infoFile != None):
            infofile = H.readMagInfo(infoFile)
            if (spaceGroup == None): spaceGroup = infofile[0]
            if (cell == None): cell = infofile[1]
            if (magAtomList == None): magAtomList = infofile[2]
            if (symmetry == None): symmetry = infofile[3]
        if (basisSymmetry == None): basisSymmetry = symmetry
        ## magnetic peaks
        # convert magnetic symmetry to space group
        latt = H.getMagsymmK_latt(basisSymmetry)
        if basisSymmetry.get_magsymm_k_mcentred() == 1: 
            latt+= " -1" 
        else:
            latt += " 1"
        spg = _SpaceGroup()
        FortFuncs().set_spacegroup(latt, spg)
        refList = H.hklGen(spaceGroup, cell, sMin, sMax, True, xtal=False)
        refList2 = H.hklGen(spg, cell, sMin, np.sin(179.5/2)/wavelength, True, xtal=True)
        magRefList = H.satelliteGen(cell, symmetry, sMax, hkls=refList2)#satelliteGen_python(cell, sMax, None)#
        print "length of reflection list " + str(len(magRefList))
        magIntensities = H.calcIntensity(magRefList, magAtomList, basisSymmetry,
                                       wavelength, cell, True, muR=muR)
        # add in structural peaks
        if (atomList == None): atomList = H.readInfo(infoFile)[2]
        #refList = hklGen(spaceGroup, cell, sMin, sMax, True, xtal=xtal)
        intensities = H.calcIntensity(refList, atomList, spaceGroup, wavelength, muR=muR)
        reflections = magRefList[:] + refList[:]
        intensities = np.append(magIntensities, intensities)
    else:
        if (infoFile != None):
            infofile = H.readInfo(infoFile)
            if (spaceGroup == None): spaceGroup = infofile[0]
            if (cell == None): cell = infofile[1]
            if (atomList == None): atomList = infofile[2]     
        print "length of atom list is", len(atomList)
        print(spaceGroup.number)
        refList = H.hklGen(spaceGroup, cell, sMin, sMax, True, xtal=False)
        reflections = refList[:]
        intensities = H.calcIntensity(refList, atomList, spaceGroup, wavelength, muR=muR)
    peaks = H.makePeaks(reflections, uvw, intensities, scale, wavelength, base=base)
    numPoints = int(floor((ttMax-ttMin)/ttStep)) + 1
    tt = np.linspace(ttMin, ttMax, numPoints)
    intensity = H.getIntensity(peaks, background, tt, base=base)

    if info:
        if magnetic:
            H.printInfo(cell, spaceGroup, (atomList, magAtomList), (refList, magRefList),
                      wavelength, basisSymmetry, muR=muR)
        else:
            H.printInfo(cell, spaceGroup, atomList, refList, wavelength, muR=muR)
    if plot:
        H.plotPattern(peaks, background, observedData[0], observedData[1],
                    ttMin, ttMax, ttStep, exclusions, labels=labels, base=base, residuals=residuals, error=error)
        H.pylab.show()
        H.pylab.savefig(os.path.join('/tmp/bland',str('plot.jpg')), dpi=2000)
    if saveFile:
        np.savetxt(saveFile, (tt, intensity), delimiter=" ")
    tt1 = ["%.3f" % H.twoTheta(ref.s, wavelength) for ref in refList]   
    for atom in atomList:
            print atom.label(), "element:", atom.element(), "iso:", atom.BIso(), "multip:", atom.multip(), "coords:", atom.coords(), "occupancy:", atom.occupancy()    
    h, k, l = tuple([str(ref.hkl[i]) for ref in refList] for i in xrange(3))
    return (tt1, tt, intensities, [h,k,l], peaks, background)

"""Returns structure factors squared for a crystal"""
def structWrap(ttMin, ttMax, wavelength, spaceGroup, cell, atomList, muR=None):
    sMin, sMax = H.getS(ttMin, wavelength), H.getS(ttMax, wavelength)
    refList = H.hklGen(spaceGroup, cell, sMin, sMax, True, xtal=False)
    sfs2 = np.array(H.calcStructFact(refList, atomList, spaceGroup, wavelength, xtal=False))
    return sfs2

"""Makes crystal cell model from parameters received from the client"""
def makeCellModel(phases):
    cells, spaces, space_nums, my_groups, real_sgs, abcs, albegas, my_cells, atoms, atmLsts, atomLists, tts, intensities, hkls, structFacts, sfs, ints, hkl_rets, tt1s, twothetas, twothetas1, peakses, backgrounds, intensities_obs = {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
    for i in range(len(phases)):
	value = phases[i][1][0]
	spaces[i] = value['space']
	cells[i] = value
	space_nums[i] = int(spaces[i].split(' ')[2])
	my_groups[i] = GetSpaceGroup(space_nums[i])
	try:
	    sg = request.session['sg']
	    real_sgs[i] = _SpaceGroup(sg)
	except:
	    real_sgs[i] = _SpaceGroup(my_groups[i].alt_name)
	abcs[i] = [float(cells[i]['a']), float(cells[i]['b']), float(cells[i]['c'])]
	albegas[i] = [float(cells[i]['alpha']), float(cells[i]['beta']), float(cells[i]['gamma'])]
	my_cells[i] = _CrystalCell(abcs[i], albegas[i])
	atoms[i] = phases[i][0]
	atmLsts[i] = []
	for item in atoms[i]:
	    if(item['label'] != ''):
		    x = float(item['x'])
		    y = float(item['y'])
		    z = float(item['z'])
		    name = item['atom']
		    label = str(item['label'])
		    occ = float(item['occupancy'])
		    symbol = str(name.split(' ')[4])
		    mult = real_sgs[i].multip
		    atom = Atom(label, symbol, [x,y,z], mult, occ, 0.5)
		    atmLsts[i].append(atom)
	atomLists[i] = AtomList(atmLsts[i])
    return my_cells, real_sgs, atomLists


"""See what fitted parameters have been given"""
def tryParams(phases):
    try:
	u_pm = float(phases['all']['u']['pm'])
    except:
	u_pm = None
    try:
	v_pm = float(phases['all']['v']['pm'])
    except:
	v_pm = None
    try:
	w_pm = float(phases['all']['w']['pm'])
    except:
	w_pm = None 
    try:
	zero_pm = float(phases['all']['zero']['pm'])
    except:
	zero_pm = None
    try:
	eta_pm = float(phases['all']['eta']['pm'])
    except:
	eta_pm = None
    try:
	scale_pm = float(phases['all']['scale']['pm'])
    except:
	scale_pm = None
    return u_pm, v_pm, w_pm, zero_pm, eta_pm, scale_pm

"""Makes cell model compatible with BUMPS"""
def makeModelCell(cell, real_sgs, phases):
    print(real_sgs[0].number)
    cell_hkl = Mod.makeCell(cell, real_sgs[0].xtalSystem)
    try:
	cell_hkl.a.pm(float(phases[1]['a']['pm']))
    except:
	print "no a"
    try:
	cell_hkl.b.pm(float(phases[1]['b']['pm']))
    except:
	print "no b"    
    try:
	cell_hkl.c.pm(float(phases[1]['c']['pm']))
    except:
	print "no c"
    try:
	cell_hkl.alpha.pm(float(phases[1]['alpha']['pm']))
    except:
	print "no alpha"
    try:
	cell_hkl.beta.pm(float(phases[1]['beta']['pm']))
    except:
	print "no beta"
    try:
	cell_hkl.gamma.pm(float(phases[1]['gamma']['pm']))
    except:
	print "no gamma"
    return cell_hkl

"""Makes model that can be used as a fitting problem in BUMPS"""
def makeModel(tt_mod, obs_mod, backg, u, v, w, wavelength, real_sgs, cell_hkl, atomLists, instrument, u_pm, v_pm, w_pm, zero_pm, eta_pm, scale_pm, phases):
    try:
	zero = float(instrument['zero'])
    except:
	zero = 0
    try:
	eta = float(instrument['eta'])
    except:
	eta = 0
    try:
	scale = float(instrument['scale'])
    except:
	scale = 1
    m = Mod.Model(tt = tt_mod, observed = obs_mod, background = backg, u = u, v = v, w = w, wavelength = wavelength, spaceGroupName = real_sgs[0], cell = cell_hkl, atoms = atomLists[0], base = min(obs_mod), zero = zero, eta = eta, scale = scale)
    try:
	m.u.pm(u_pm)
    except:
	pass
    try:
	m.v.pm(v_pm)
    except:
	pass
    try:
	m.w.pm(w_pm)
    except:
	pass
    try:
	m.zero.pm(zero_pm)
    except:
	pass
    try:
	m.eta.pm(eta_pm)
    except:
	pass
    try:
	m.scale.pm(scale_pm)
    except:
	pass
    for i in range(len(m.atomListModel.atomModels)):
	try:
	    for item in phases[1]['x']:
		if int(item['row']) == i:
		    x_pm = float(item['pm'])
	except:
	    pass
	try:
	    for item in phases[1]['y']:
		if int(item['row']) == i:
		    y_pm = float(item['pm'])
	except:
	    pass
	try:
	    for item in phases[1]['z']:
		if int(item['row']) == i:
		    z_pm = float(item['pm'])
	except:
	    pass
	try:
	    for item in phases[1]['occupancy']:
		if int(item['row']) == i:
		    occ_pm = float(item['pm'])
	except:
	    pass
	try:
	    for item in phases[1]['thermal']:
		if int(item['row']) == i:
		    therm_pm = float(item['pm'])
	except:
	    pass
	try:
	    m.atomListModel.atomModels[i].x.pm(x_pm)
	except:
	    pass
	try:
	    m.atomListModel.atomModels[i].y.pm(y_pm)
	except:
	    pass
	try:
	    m.atomListModel.atomModels[i].z.pm(z_pm)
	except:
	    pass
	try:
	    m.atomListModel.atomModels[i].occ.pm(occ_pm)
	except:
	    pass
	try:
	    m.atomListModel.atomModels[i].B.pm(therm_pm)
	except:
	    pass
    return m

"""Makes data structure for phases from the parameters received from client"""
def makePhases(fits):
    phases = {}
    print "fits are",  fits
    if len(fits) != 0:
	for item in fits:
	    if item != 'steps' and item != 'burn':
		if fits[item]:
		    try:
			phase_num = int(fits[item]['phase'])
		    except: 
			phase_num = 'all'
		    if phase_num not in phases:
			phases[phase_num] = {}
		    els = fits[item].keys()
		    if str(fits[item]['row']) != '':
			if str(fits[item]['name']) not in phases[phase_num]:
			    phases[phase_num][str(fits[item]['name'])] = [{}]
			    num = 0
			else:
			    phases[phase_num][str(fits[item]['name'])].append({})
			    num = len(phases[phase_num][str(fits[item]['name'])]) - 1
		    else:
			phases[phase_num][str(fits[item]['name'])] = {}
		    for el in els:
			if str(fits[item]['row']) != '':
			    phases[phase_num][str(fits[item]['name'])][num][str(el)] = str(fits[item][el])
			else:
			    phases[phase_num][str(fits[item]['name'])][str(el)] = str(fits[item][el])
    return phases