
import os,sys;sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

DATAPATH = os.path.dirname(os.path.abspath(__file__))
backgFile = os.path.join(DATAPATH,"pbso4.bac")

with open(backgFile) as fp:
	content = fp.readlines()

total = 0
for i in range(len(content)):
	if i > 0:
		temp = content[i].split()
		j = len(temp)
		print sum(map(int,temp))
		total += sum(map(int, temp))
num = float((i-1)*j)
print total
print num

print 634601/2900.0

