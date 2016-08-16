# BLAND-UI
User interface for the BLAND software library

Compiled with Ubuntu 16.04, so I'd recommend using with Linux right now. 

Requires recompiling pycrysfml.

Requires Django, Numpy, Demjson, Django-Redis,
Also requires d3-science, pycrysfml, periodictable from the scattering github. Edit mysite/bland/views.py to include the folder containing periodictable to the path, or move periodictable into mysite/bland/

Changes to pycrysfml needed. File fswig_hklgen.py - line 86:
  change from this - funcs.set_spacegroup(groupName, self, None, None, None, None)
  to this - funcs.set_spacegroup(groupName, self, None, None, None)

1: cd BLAND_UI

2: python3 -m http.server 8080

3: cd ..

4: cd mysite

5: python manage.py runserver 8001

6: Go to http://localhost:8001/bland

These instructions are for the django development server only. The files in the folder BLAND_UI do need to be served though. Edit the URLs in mysite/bland/templates/bland/index.html from http://localhost:8080/ to whatever host you use.