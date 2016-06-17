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
#from .calculations.vtkModel.AtomClass import Atom as myAtom
from .calculations.vtkModel.CellClass import Cell
from .calculations.vtkModel.SpaceGroups import *
from .models import Question, Choice, Atom
from .read_cif import *
import numpy as np

class IndexView(generic.ListView):
    template_name = 'polls/index.html'
    context_object_name = 'latest_question_list'
    
    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.filter(pub_date__lte=timezone.now()).order_by('-pub_date')[:5]
    
class DetailView(generic.DetailView):
    model = Question
    template_name = 'polls/detail.html'
    
    def get_queryset(self):
        """Excludes any questions that aren't published yet."""
        return Question.objects.filter(pub_date__lte=timezone.now())
    
class ResultsView(generic.DetailView):
    model = Question
    template_name = 'polls/results.html'
    
"""
def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context = {'latest_question_list': latest_question_list}
    return render(request, 'polls/index.html', context)

def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/detail.html', {'question': question})

def results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/results.html', {'question': question})
"""

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question votin form.
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a 
        # user hits the Back button.
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))
    
@csrf_exempt
def calc(request):
    x = demjson.decode(request.body)
    #x = json.loads(string1)
    print x
    print
    cell = x['myReducer2'][0]
    instrument = x['myReducer3'][0]
    print cell
    space = cell['space']
    print space
    space_num = int(space.split(' ')[2])
    print "Space group number is", space_num
    print
    my_group = GetSpaceGroup(space_num)
    #print GetSpaceGroup(62).alt_name
    #print my_group.short_name
    real_sg = H.SpaceGroup(my_group.alt_name)
    #print(real_sg.number)
    abc = [float(cell['a']), float(cell['b']), float(cell['c'])]
    albega = [float(cell['alpha']), float(cell['beta']), float(cell['gamma'])]
    #print abc, albega
    my_cell = H.CrystalCell(abc, albega)
    uvw = [float(instrument['u']), float(instrument['v']), float(instrument['w'])]
    #my_group = H.SpaceGroup(space_num)
    #my_cell = Cell(my_group)
    #print(my_cell)
    F = 0.0
    tMin = float(instrument['tmin'])
    tMax = float(instrument['tmax'])
    #print tMin, tMax
    wavelength = float(instrument['wavelength'])
    #print wavelength
    atoms = x['myReducer']
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
    structFact = H.structWrap(tMin, tMax, wavelength, real_sg, my_cell, atomList)
    print "There are %d reflections" % len(tt)
    for i in range(len(tt)):
	print "2T:", tt[i], "\tIntensity:", intensity[i], "\tStruct factor is:", np.sqrt(structFact[i]), "\tHKL:", hkl[0][i], hkl[1][i], hkl[2][i]
    #print "2 theta is",tt, "Intensity is", intensity
   # for key, value in my_cell.atoms.items():                   
          #  d=value.getPosition()
         #   print d
          #  sym=value.getElementSymbol()
	  #  print sym
    #print instrument
    inst = json.dumps(instrument)
    hkl_ret = []
    for i in range(len(hkl[0])):
	hkl_ret.append([hkl[0][i], hkl[1][i], hkl[2][i]])
    return HttpResponse([hkl_ret, tt, structFact])
