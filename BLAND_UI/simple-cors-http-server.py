#! /usr/bin/env python2
from SimpleHTTPServer import SimpleHTTPRequestHandler
import BaseHTTPServer
import cgi

class CORSRequestHandler (SimpleHTTPRequestHandler):
	def end_headers (self):
		self.send_header('Access-Control-Allow-Origin', '*')
		self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
		self.send_header('Access-Control-Allow-Headers', 'Content-Type')
		SimpleHTTPRequestHandler.end_headers(self)
	def do_POST (self):
		print "hello world"
		self.data_string = self.rfile.read(int(self.headers['Content-Length']))
		self.send_response(200)
		self.end_headers()
		
		data = simplejson.loads(self.data_string)
		print data
		return

if __name__ == '__main__':
	print 'Starting server...'
	#BaseHTTPServer.test(CORSRequestHandler, BaseHTTPServer.HTTPServer)
	try:
		port = 8080
		server = BaseHTTPServer.HTTPServer(('', port), CORSRequestHandler)
		print "Web Server running on port 8080"
		server.serve_forever()
	except KeyboardInterrupt:
		print "^C entered, stopping web server..."
		server.socket.close()