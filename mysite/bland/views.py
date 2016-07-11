from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.shortcuts import render, get_object_or_404
from django.views import generic
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
import json
import demjson
import sys
sys.path.append("/mnt/hgfs/Ubuntu_Shared/pycrysfml/hklgen")
from decimal import *
import periodictable
import fswig_hklgen as H
import hkl_model as Mod
from bumps.fitters import FitDriver, DreamFit
from bumps.mapper import SerialMapper
from bumps.fitproblem import FitProblem
from bumps.options import BumpsOpts
from bumps.cli import setup_logging, make_store, store_overwrite_query, save_best, beep
#from .calculations.vtkModel.AtomClass import Atom as myAtom
from .calculations.vtkModel.CellClass import Cell
from .calculations.vtkModel.SpaceGroups import *
from .models import Question, Choice, Atom
from .read_cif import *
import numpy as np
from django.template import RequestContext
import hashlib


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

class IndexView(generic.ListView):
    template_name = 'bland/index.html'
    context_object_name = 'latest_question_list'
    
    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.filter(pub_date__lte=timezone.now()).order_by('-pub_date')[:5]
    
class DetailView(generic.DetailView):
    model = Question
    template_name = 'bland/detail.html'
    
    def get_queryset(self):
        """Excludes any questions that aren't published yet."""
        return Question.objects.filter(pub_date__lte=timezone.now())
    
class ResultsView(generic.DetailView):
    model = Question
    template_name = 'bland/results.html'
    
"""
def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context = {'latest_question_list': latest_question_list}
    return render(request, 'bland/index.html', context)

def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'bland/detail.html', {'question': question})

def results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'bland/results.html', {'question': question})
"""

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question votin form.
        return render(request, 'bland/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a 
        # user hits the Back button.
        return HttpResponseRedirect(reverse('bland:results', args=(question.id,)))
    
@csrf_exempt
def calc(request):
    x = demjson.decode(request.body)
    #x = json.loads(string1)
    print x
    print
    
    fits = x['myReducer5'][0]
    instrument = x['myReducer3'][0]
    tt_ = x['tt']
    obs_ = x['obs']
    tt_mod = [float(s) for s in tt_]
    obs_mod = [float(l) for l in obs_]
    map(float, tt_mod)
    map(float, obs_mod)
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
		    #print "multiplicity is", mult
		    #print type(symbol),x,y,z, type(label)
		    #my_cell.generateAtoms(symbol, (x,y,z))
		    #atmLst = my_cell.getAtoms()
		    atom = H.Atom(label, symbol, [x,y,z], mult, occ, 0.5)
		    atmLsts[i].append(atom)
	atomLists[i] = H.AtomList(atmLsts[i])
	tts[i], tt1s[i], intensities[i], hkls[i] = H.diffPattern(wavelength=wavelength, cell=my_cells[i], uvw=uvw, ttMin=tMin, ttMax=tMax, spaceGroup=real_sgs[i], atomList=atomLists[i], info=True)
	structFacts[i] = H.structWrap(tMin, tMax, wavelength, real_sgs[i], my_cells[i], atomLists[i])
	sfs[i] = []
	for j in range(len(tts[i])):
	    sfs[i].append(np.sqrt(structFacts[i][j]))
	    temp1 = tts[i][j]
	    #temp2 = intensities[i][j]
	    tts[i][j] = float(temp1)
	    #intensities[i][j] = float(temp2)
	for j in range(len(tt1s[i])):
	    temp = intensities[i][j]
	    intensities[i][j] = float(temp)
	    temp1 = tt1s[i][j]
	    tt1s[i][j] = float(temp1)
	ints[i] = intensities[i].tolist()
	#twothetas[i] = tts[i].tolist()
	twothetas1[i] = tt1s[i].tolist()
	print "ints is"
	print ints
	hkl_rets[i] = []
	for k in range(len(hkls[i][0])):
	    hkl_rets[i].append([int(hkls[i][0][k]), int(hkls[i][1][k]), int(hkls[i][2][k])])	
    print cells
    #space = cell['space']
    print spaces
    #space_num = int(space.split(' ')[2])
    print "Space group number is", space_nums
    print
    #my_group = GetSpaceGroup(space_num)
    #print GetSpaceGroup(62).alt_name
    #print my_group.short_name
    #real_sg = H.SpaceGroup(my_group.alt_name)
    #print(real_sg.number)
    #abc = [float(cell['a']), float(cell['b']), float(cell['c'])]
    #albega = [float(cell['alpha']), float(cell['beta']), float(cell['gamma'])]
    #print abc, albega
    #my_cell = H.CrystalCell(abc, albega)
    
    #print wavelength
    """atoms = x['myReducer']
    atmLst = []
    for item in atoms:
	if(item['label'] != ''):
		x = float(item['x'])
		y = float(item['y'])
		z = float(item['z'])
		name = item['atom']
		label = str(item['label'])
		occ = float(item['occupancy'])
		symbol = str(name.split(' ')[4])
		mult = real_sg.multip
		print "mult is", mult
		#print "multiplicity is", mult
		#print type(symbol),x,y,z, type(label)
		#my_cell.generateAtoms(symbol, (x,y,z))
		#atmLst = my_cell.getAtoms()
		atom = H.Atom(label, symbol, [x,y,z], mult, occ, 0.5)
		atmLst.append(atom)
    #print atmLst
    atomList = H.AtomList(atmLst)
    tt, intensity, hkl = H.diffPattern(wavelength=wavelength, cell=my_cell, uvw=uvw, ttMin=tMin, ttMax=tMax, spaceGroup=real_sg, atomList=atomList, info=True)
    structFact = H.structWrap(tMin, tMax, wavelength, real_sg, my_cell, atomList)"""
    #print "There are %d reflections" % len(tt)
    """sf = []
    for i in range(len(tt)):
	sf.append(np.sqrt(structFact[i]))
	temp1 = tt[i]
	temp2 = intensity[i]
	tt[i] = float(temp1)
	intensity[i] = float(temp2)
	#print "2T:", tt[i], "\tIntensity:", intensity[i], "\tStruct factor is:", sf[i], "\tHKL:", hkl[0][i], hkl[1][i], hkl[2][i]
   # print type(tt[0]), type(hkl[0][i]), type(intensity)
    print "intensity from views is ", intensity
    ints = intensity.tolist()"""
    #print type(ints)
    #print "2 theta is",tt, "Intensity is", intensity
   # for key, value in my_cell.atoms.items():                   
          #  d=value.getPosition()
         #   print d
          #  sym=value.getElementSymbol()
	  #  print sym
    #print instrument
    inst = json.dumps(instrument)
    """hkl_ret = []
    for i in range(len(hkl[0])):
	hkl_ret.append([int(hkl[0][i]), int(hkl[1][i]), int(hkl[2][i])])"""
    print len(hkl_rets[0]), len(tt1s[0]), len(sfs[0]), len(twothetas1[0]), len(ints[0])
    ret = json.dumps([hkl_rets[0], tts[0], sfs[0], twothetas1[0], ints[0]])
    context = RequestContext(request)
    print context, "hehe"
    print len(fits)
    print fits
    phases = {}
    if len(fits) != 0:
	print "time to fit"
	for item in fits:
	    #print item
	    #print fits[item]
	    try:
		phase_num = int(fits[item]['phase'])
	    except: 
		phase_num = 'all'
	    if phase_num not in phases:
		phases[phase_num] = {}
	    els = fits[item].keys()
	    #print "els is", els
	    if str(fits[item]['row']) != '':
		if str(fits[item]['name']) not in phases[phase_num]:
		    phases[phase_num][str(fits[item]['name'])] = [{}]
		    num = 0
		else:
		    phases[phase_num][str(fits[item]['name'])].append({})
		    num = len(phases[phase_num][str(fits[item]['name'])]) - 1
	    else:
		phases[phase_num][str(fits[item]['name'])] = {}
	    #print "Phase is currently", phases[phase_num]	    
	    for el in els:
		#phases[phase_num].append(dict(item, dict(el, fits[item][el])))
		if str(fits[item]['row']) != '':
		    phases[phase_num][str(fits[item]['name'])][num][str(el)] = str(fits[item][el])
		else:
		    phases[phase_num][str(fits[item]['name'])][str(el)] = str(fits[item][el])
		
	    """if "gamma" in item:
		phase = int(item[5])
		pm = float(fits[item][0])
	    if "beta" in item:
		phase = int(item[4])
		pm = float(fits[item][0])
	    if "alpha" in item:
		phase = int(item[5])
		pm = float(fits[item][0])
	    if "a" in item and "alpha" not in item and "gamma" not in item and "beta" not in item:
		phase = int(item[1])
		pm = float(fits[item][0])
	    if "b" in item and "beta" not in item:
		phase = int(item[1])
		pm = float(fits[item][0])
	    if "c" in item:
		phase = int(item[1])
		pm = float(fits[item][0])
	    cell = my_cells[phase - 1]
	    cell_hkl = Mod.makeCell(cell, real_sgs[phase - 1].xtalSystem)"""
    

	backg = H.LinSpline(None)
	u = uvw[0]
	v = uvw[1]
	w = uvw[2]
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
	except:
	    pass
	for inst in phases:
	    print "Phase", inst
	    print phases[inst]
	    #if inst != 'all':
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
	    print atomLists[0][i].label()
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
	    
	M = FitProblem(m)
	opts = Opts(DreamFit, '/tmp/bland/M1', ['burn=0', 'steps=5'])
	setup_logging()
	problem = M
	problem.path = '/mnt/hgfs/Ubuntu_Shared/mysite/bland/views.py'
	mapper = SerialMapper
	extra_opts = {'burn': 0, 'pop': 10, 'init': 'eps', 'steps': 5, 'thin': 1, 'samples': 10000}
	fitdriver = FitDriver(
		DreamFit, problem=problem, abort_test=lambda: False,
		**extra_opts)	
	make_store(problem, opts, exists_handler=store_overwrite_query)
	resume_path = None
	fitdriver.mapper = mapper.start_mapper(problem, opts.args)
	best, fbest = fitdriver.fit(resume=resume_path)
	save_best(fitdriver, problem, best)
	mapper.stop_mapper(fitdriver.mapper)	    
	beep()
	import pylab
	pylab.show()
	M.model_update()	
	return HttpResponse("Fitting")
    print type(obs_mod[0]), type(tt_mod[0])
    return HttpResponse(ret)

@csrf_exempt
def upload(request):
    print "Hi"
    print request.FILES['file']
    fp = request.FILES['file']
    for line in fp:
	print line
	
    handle_uploaded_file(fp)
    spaceGroup, cell, atomList = H.readInfo(os.path.join('/tmp/bland',str(fp.name)))
    #print spaceGroup.number
    #print cell.volume
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
    
    #for line in fp:
	#print line
	
    handle_uploaded_file(fp)
    print mode
    go = True
    if mode == 'GSAS':
	go = False
	for line in fp:
	    #print line
	    if len(line.split()) > 0:
		if line.split()[0] == 'BANK':
		    #print len(line.split())
		    if len(line.split()) == 10:
			go = True
    elif mode == 'XYSIGMA':
	go = False
    #print "tt   observed    error"
    if go == True:
	(tt, observed, error) = H.readIllData(os.path.join('/tmp/bland',str(fp.name)), str(mode), None)
    else:
	return HttpResponse('Sorry, this didn\'t work')    
    #print list(tt), list(observed), list(error)
    ret = [list(tt), list(observed), list(error)]
    ret = json.dumps(ret)
    print go
    return HttpResponse(ret)

@csrf_exempt
def route(request):
    print "hello world"
    x = demjson.decode(request.body)
    print x
    print "ok"
    return render(request, 'bland/results.html', {'results': x})