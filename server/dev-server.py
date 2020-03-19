from http.server import BaseHTTPRequestHandler
from socketserver import TCPServer
import os
# import ssl

# web_dir = os.path.join(os.path.dirname(__file__), 'web')
web_dir = '/home/dp/deven/dpgit/react-js-python/UI'

PORT = 8000
Handler = BaseHTTPRequestHandler
httpd = TCPServer(("", PORT), Handler)
print("serving at port", PORT)
# Handler.extensions_map.update({
#     '.webapp': 'application/x-web-app-manifest+json',
# });
# httpd = BaseHTTPServer.HTTPServer(('localhost', 4443), SimpleHTTPServer.SimpleHTTPRequestHandler)
# httpd.socket = ssl.wrap_socket (httpd.socket, certfile='./server.pem', server_side=True)
os.chdir(web_dir)
httpd.serve_forever()
