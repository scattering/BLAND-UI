from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.shortcuts import render, get_object_or_404
from django.views import generic
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.utils.crypto import salted_hmac
from wsgiref.util import FileWrapper
import json
import demjson
import sys, os
sys.path.append("/mnt/hgfs/Ubuntu_Shared/pycrysfml/hklgen")
from decimal import *
import periodictable
import fswig_hklgen as H
import hkl_model as Mod
import StringIO
import zipfile, tarfile
from PIL import Image
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
import numpy as np
from django.template import RequestContext
import hashlib
#from multiprocessing import Process, Pipe
import threading
import threading
import datetime, time
from django.conf import settings
from django.core.cache import cache
#settings.configure()
import inspect

class IndexView(generic.ListView):
    template_name = 'bland/index.html'
    
    def get_queryset(self):
	pass

def status(request, token):
    context = {'token': token}
    return render(request, 'bland/status.html', context)

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
        fp = open('/tmp/bland/store_' + self.key + '/out.txt', 'w')
        fp.write("# " + ' '.join(self.fields) + '\n')
        fp.write(out)
	fp.write(self.problem.summarize())
	#fp.write(str(self.problem.getp()))
        fp.close()    

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
    
@csrf_exempt
def calc(request):
    x = demjson.decode(request.body)
    print x
    print
    
    fits = x['myReducer5'][0]
    instrument = x['myReducer3'][0]
    if 'tt' in request.session:
	tt_ = request.session['tt']
	tt_mod = [float(s) for s in tt_]
    if 'obs' in request.session:
	obs_ = request.session['obs']
	obs_mod = [float(l) for l in obs_]
    uvw = [float(instrument['u']), float(instrument['v']), float(instrument['w'])]
    F = 0.0
    tMin = float(instrument['tmin'])
    tMax = float(instrument['tmax'])
    wavelength = float(instrument['wavelength'])    
    
    cells = {}
    spaces = {}
    space_nums = {}
    my_groups = {}
    real_sgs = {}
    abcs = {}
    albegas = {}
    my_cells = {}
    atoms = {}
    atmLsts = {}
    atomLists = {}
    tts = {}
    intensities = {}
    hkls = {}
    structFacts = {}
    sfs = {}
    ints = {}
    hkl_rets = {}
    tt1s = {}
    twothetas = {}
    twothetas1 = {}
    for i in range(len(x['myReducer4']['Phases'])):
	value = x['myReducer4']['Phases'][i][1][0]
	print "value is "
	print value
	spaces[i] = value['space']
	cells[i] = value
	space_nums[i] = int(spaces[i].split(' ')[2])
	my_groups[i] = GetSpaceGroup(space_nums[i])
	real_sgs[i] = H.SpaceGroup(my_groups[i].alt_name)
	abcs[i] = [float(cells[i]['a']), float(cells[i]['b']), float(cells[i]['c'])]
	albegas[i] = [float(cells[i]['alpha']), float(cells[i]['beta']), float(cells[i]['gamma'])]
	my_cells[i] = H.CrystalCell(abcs[i], albegas[i])
	atoms[i] = x['myReducer4']['Phases'][i][0]
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
		    print "mult is", mult
		    atom = H.Atom(label, symbol, [x,y,z], mult, occ, 0.5)
		    atmLsts[i].append(atom)
	atomLists[i] = H.AtomList(atmLsts[i])
	tts[i], tt1s[i], intensities[i], hkls[i] = H.diffPattern(wavelength=wavelength, cell=my_cells[i], uvw=uvw, ttMin=tMin, ttMax=tMax, spaceGroup=real_sgs[i], atomList=atomLists[i], info=True)
	structFacts[i] = H.structWrap(tMin, tMax, wavelength, real_sgs[i], my_cells[i], atomLists[i])
	sfs[i] = []
	for j in range(len(tts[i])):
	    sfs[i].append(np.sqrt(structFacts[i][j]))
	    temp1 = tts[i][j]
	    tts[i][j] = float(temp1)
	for j in range(len(tt1s[i])):
	    temp = intensities[i][j]
	    intensities[i][j] = float(temp)
	    temp1 = tt1s[i][j]
	    tt1s[i][j] = float(temp1)
	ints[i] = intensities[i].tolist()
	twothetas1[i] = tt1s[i].tolist()
	print "ints is"
	print ints
	hkl_rets[i] = []
	for k in range(len(hkls[i][0])):
	    hkl_rets[i].append([int(hkls[i][0][k]), int(hkls[i][1][k]), int(hkls[i][2][k])])	
    print cells
    print spaces
    print "Space group number is", space_nums
    print
    print len(hkl_rets[0]), len(tt1s[0]), len(sfs[0]), len(twothetas1[0]), len(ints[0])
    ret = json.dumps([hkl_rets[0], tts[0], sfs[0], twothetas1[0], ints[0]])
    context = RequestContext(request)
    print context, "hehe"
    print len(fits)
    print fits
    phases = {}
    print type(obs_mod[0]), type(tt_mod[0])
    return HttpResponse(ret)


@csrf_exempt
def fitting(request):
    x = demjson.decode(request.body)
    if 'tt' in request.session:
	tt_ = request.session['tt']
	tt_mod = [float(s) for s in tt_]
    if 'obs' in request.session:
	obs_ = request.session['obs']
	obs_mod = [float(l) for l in obs_]   
    state = str(x['myReducer4'])
    fits = x['myReducer5'][0]
    instrument = x['myReducer3'][0]
    phases = {}
    
    if 'my_cells' in request.session and 'real_sgs' in request.session and 'atomLists' in request.session:
	my_cells = request.session['my_cells']
	real_sgs = request.session['real_sgs']
	atomLists = request.session['atomLists']
    else:
	spaces = {}
	cells = {}
	space_nums = {}
	my_groups = {}
	atoms = {}
	atmLsts = {}
	my_cells = {}
	abcs = {}
	albegas = {}
	real_sgs = {}
	atomLists = {}
	for i in range(len(x['myReducer4']['Phases'])):
	    value = x['myReducer4']['Phases'][i][1][0]
	    print "value is "
	    print value
	    spaces[i] = value['space']
	    cells[i] = value
	    space_nums[i] = int(spaces[i].split(' ')[2])
	    my_groups[i] = GetSpaceGroup(space_nums[i])
	    real_sgs[i] = H.SpaceGroup(my_groups[i].alt_name)
	    abcs[i] = [float(cells[i]['a']), float(cells[i]['b']), float(cells[i]['c'])]
	    albegas[i] = [float(cells[i]['alpha']), float(cells[i]['beta']), float(cells[i]['gamma'])]
	    my_cells[i] = H.CrystalCell(abcs[i], albegas[i])
	    atoms[i] = x['myReducer4']['Phases'][i][0]
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
			print "mult is", mult
			atom = H.Atom(label, symbol, [x,y,z], mult, occ, 0.5)
			atmLsts[i].append(atom)
	    atomLists[i] = H.AtomList(atmLsts[i])	
    print "hello"
    if len(fits) != 0:
	print "time to fit"
	for item in fits:
	    print item
	    print fits[item]
	    if item != 'steps':
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
			    
	backg = H.LinSpline(None)
	u = float(instrument['u'])
	v = float(instrument['v'])
	w = float(instrument['w'])
	wavelength = float(instrument['wavelength'])
	try:
	    steps = 'steps = ' + str(fits['steps'])
	    num_steps = int(fits['steps'])
	except:
	    steps = 'steps = 5'
	    num_steps = 5
	try:
	    u_pm = float(phases['all']['u']['pm'])
	except:
	    pass
	try:
	    v_pm = float(phases['all']['v']['pm'])
	except:
	    pass
	try:
	    w_pm = float(phases['all']['w']['pm'])
	except:
	    pass    
	try:
	    zero_pm = float(phases['all']['zero']['pm'])
	except:
	    pass
	try:
	    eta_pm = float(phases['all']['eta']['pm'])
	except:
	    pass
	try:
	    scale_pm = float(phases['all']['scale']['pm'])
	    print scale_pm
	except:
	    pass
	for inst in phases:
	    print "Phase", inst
	    print phases[inst]
	cell = my_cells[0]
	print real_sgs[0].xtalSystem, real_sgs[0].number
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
	m = Mod.Model(tt = tt_mod, observed = obs_mod, background = backg, u = u, v = v, w = w, wavelength = wavelength, spaceGroupName = real_sgs[0], cell = cell_hkl, atoms = atomLists[0], base = min(obs_mod), zero = float(instrument['zero']), eta = float(instrument['zero']), scale = float(instrument['scale']))
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
	print "length is ", len(m.atomListModel.atomModels)
	for i in range(len(m.atomListModel.atomModels)):
	    print m.atomListModel.atomModels[i].atom.label()
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
		
	print steps
	
	key = hashlib.sha1(str(datetime.datetime.now())).hexdigest()[:5]
	if not os.path.exists('/tmp/bland/store_' + key):
		os.makedirs('/tmp/bland/store_' + key)    	
	fp = open('/tmp/bland/store_' + key + '/out.txt', 'w')
	fp.write('Starting...')
	fp.close()
	thread = threading.Thread(target=fitter, args=(m, steps, num_steps, key,))
	thread.start()
	"""M = FitProblem(m)
	key = hashlib.sha1(datetime.datetime.now()).hexdigest()[:5]
	opts = Opts(DreamFit, '/tmp/bland/store_' + key, ['burn=0', steps])
	setup_logging()
	problem = M
	problem.path = '/mnt/hgfs/Ubuntu_Shared/mysite/bland/views.py'
	mapper = SerialMapper
	#fp = open('/tmp/bland/out.txt', 'w')
	monitor = CustomMonitor(problem, key)
	#monitor = StepMonitor(problem, fp)
	extra_opts = {'burn': 0, 'pop': 1, 'init': 'eps', 'steps': num_steps, 'thin': 1, 'samples': 10000}
	fitdriver = FitDriver(
	    DreamFit, problem=problem, monitors=[monitor], abort_test=lambda: False,
	    **extra_opts)	
	make_store(problem, opts, exists_handler=store_overwrite_query)
	resume_path = None
	
	fitdriver.mapper = mapper.start_mapper(problem, opts.args)
	
	best, fbest = fitdriver.fit(resume=resume_path)
	
	save_best(fitdriver, problem, best)
	
	#mapper.stop_mapper(fitdriver.mapper)	  
	
	beep()
	#import pylab
	#pylab.show()
	M.model_update()
	#fp.close()
	print M.getp()
	print M.show()
	print M.summarize()
	files = []
	for fil in os.listdir("/tmp/bland/store_" + key):
	    if fil.endswith('.png'):
		files.append("/tmp/bland/store_" + key + "/" + fil)
	print files
	zip_subdir = "images"
	zip_filename = "%s.zip" % zip_subdir
	s = StringIO.StringIO()
	zf = zipfile.ZipFile(s, "w")
	#output = tarfile.open('images.tar.gz', mode='w')
	for fpath in files:
	    fdir, fname = os.path.split(fpath)
	    zip_path = os.path.join('images', fname)
	    zf.write(fpath, zip_path)
	    try:
		print fpath
		output.add(fpath)
	    except Exception, e:
		print "uh oh, world"
		#logger.warning("Unable to write to tar")
		raise OCPCAError("Unable to write to tar")
		
	output.list(True)
	output.close()
	zf.close()
	#wrapper = FileWrapper(file('images.zip'))
	#wrapper = FileWrapper(file('images.tar.gz'))
	resp = HttpResponse(s.getvalue(), content_type = "application/zip")
	#resp = HttpResponse(wrapper, content_type = 'application/x-gzip')
	resp['Content-Length'] = os.path.getsize('images.zip')
	#resp['Content-Length'] = os.path.getsize('images.tar.gz')
	resp['Content_Disposition'] = 'attachment; filename="images.zip"'
	#resp['Content_Disposition'] = 'attachment; filename="images.tar.gz"'"""
	_key = 'bland.views.fitting'
	_value = (state + str(datetime.datetime.now()))
	token = salted_hmac(_key, _value).hexdigest()[:10]
	cache.set(token, key)
	cache.persist(token)
	print "going to status"
	print token
	time.sleep(0.4 * len(fits))
	return HttpResponse(token)    

@csrf_exempt
def upload(request):
    print "Hi"
    print request.FILES['file']
    fp = request.FILES['file']
    for line in fp:
	print line
    handle_uploaded_file(fp)
    spaceGroup, cell, atomList = H.readInfo(os.path.join('/tmp/bland',str(fp.name)))
    ret = [spaceGroup.number, cell.lengthList(), cell.angleList()]
    for atom in atomList:
	for el in periodictable.elements:
	    if(el.symbol == atom.element()):
		ell = el.number
	ret.append([atom.label(), atom.element(), atom.coords(), atom.occupancy(), atom.BIso(), ell])
    ret = json.dumps(ret)
    return HttpResponse(ret)

def handle_uploaded_file(f):
    if not os.path.exists('/tmp/bland'):
	os.makedirs('/tmp/bland')    
    with open(os.path.join('/tmp/bland',str(f.name)), 'wb+') as destination:
	for chunk in f.chunks():
	    destination.write(chunk)

@csrf_exempt
def data(request):
    print "Hello, sir/ma'am"
    mode = request.POST['mode']
    print type(str(mode))
    print request.FILES['file']
    fp = request.FILES['file']
    handle_uploaded_file(fp)
    print mode
    go = True
    if mode == 'GSAS':
	go = False
	for line in fp:
	    if len(line.split()) > 0:
		if line.split()[0] == 'BANK':
		    if len(line.split()) == 10:
			go = True
    elif mode == 'XYSIGMA':
	go = False
    if go == True:
	(tt, observed, error) = H.readIllData(os.path.join('/tmp/bland',str(fp.name)), str(mode), None)
    else:
	return HttpResponse('Sorry, this didn\'t work')    
    request.session['tt'] = tt
    request.session['obs'] = observed
    ret = [list(tt), list(observed), list(error)]
    ret = json.dumps(ret)
    print go
    return HttpResponse(ret)

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
	print out
	fp.close()
	ret = json.dumps(out)
    except:
	ret = json.dumps('Sorry, the key doesn\'t exist')
    return HttpResponse(ret)

@csrf_exempt
def files(request):
    x = demjson.decode(request.body)
    print "HELLO WORLD OMG"
    filez = open('/tmp/out.log', 'w')
    filez.write(x)
    filez.close()
    try:
	key = cache.get(x)
	print key
	files = []
	for fil in os.listdir("/tmp/bland/store_" + key):
	    if fil.endswith('.png'):
		files.append("/tmp/bland/store_" + key + "/" + fil)
	print files
	zip_subdir = "images"
	zip_filename = "%s.zip" % zip_subdir
	s = StringIO.StringIO()
	zf = zipfile.ZipFile(s, "w")
	#output = tarfile.open('images.tar.gz', mode='w')
	for fpath in files:
	    fdir, fname = os.path.split(fpath)
	    zip_path = os.path.join('images', fname)
	    zf.write(fpath, zip_path)
	    """try:
		print fpath
		output.add(fpath)
	    except Exception, e:
		print "uh oh, world"
		#logger.warning("Unable to write to tar")
		raise OCPCAError("Unable to write to tar")
			
	    output.list(True)
	    output.close()"""
	zf.close()
	#wrapper = FileWrapper(file('images.zip'))
	#wrapper = FileWrapper(file('images.tar.gz'))
	resp = HttpResponse(s.getvalue(), content_type = "application/zip")
	#resp = HttpResponse(wrapper, content_type = 'application/x-gzip')
	resp['Content-Length'] = os.path.getsize('images.zip')
	#resp['Content-Length'] = os.path.getsize('images.tar.gz')
	resp['Content_Disposition'] = 'attachment; filename="images.zip"'
	#resp['Content_Disposition'] = 'attachment; filename="images.tar.gz"'
	return HttpResponse(resp)
    except:
	return HttpResponse("Sorry, this key doesn't exist.")

def fitter(prob, steps, num_steps, key):
    M = FitProblem(prob)
    opts = Opts(DreamFit, '/tmp/bland/store_' + key, ['burn=0', steps])
    setup_logging()
    problem = M
    problem.path = '/mnt/hgfs/Ubuntu_Shared/mysite/bland/views.py'
    mapper = SerialMapper
    #fp = open('/tmp/bland/out.txt', 'w')
    monitor = CustomMonitor(problem, key)
    #monitor = StepMonitor(problem, fp)
    extra_opts = {'burn': 0, 'pop': 10, 'init': 'eps', 'steps': num_steps, 'thin': 1, 'samples': 10000}
    fitdriver = FitDriver(
	DreamFit, problem=problem, monitors=[monitor], abort_test=lambda: False,
	**extra_opts)	
    make_store(problem, opts, exists_handler=store_overwrite_query)
    resume_path = None
    
    fitdriver.mapper = mapper.start_mapper(problem, opts.args)
    
    best, fbest = fitdriver.fit(resume=resume_path)
    
    save_best(fitdriver, problem, best)
    
    #mapper.stop_mapper(fitdriver.mapper)	  
    
    beep()
    #import pylab
    #pylab.show()
    M.model_update()
    with open("/tmp/bland/store_" + key + "/out.txt", 'a') as txt_file:
	txt_file.write("\nComplete!")
    return