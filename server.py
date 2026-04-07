#!/usr/bin/env python3
"""
Servidor web simple para el CV
Ejecuta: python3 server.py
Visita: http://localhost:8000
"""

import http.server
import socketserver
import os

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CVHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Agregar headers para evitar cache durante desarrollo
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Custom logging con colores
        print(f"\033[94m[SERVIDOR]\033[0m {self.address_string()} - {format % args}")

def run_server():
    os.chdir(DIRECTORY)
    
    with socketserver.TCPServer(("", PORT), CVHandler) as httpd:
        print("\n" + "="*60)
        print("  🚀 SERVIDOR CV WEB INICIADO")
        print("="*60)
        print(f"\n  📍 URL: http://localhost:{PORT}")
        print(f"  📁 Directorio: {DIRECTORY}")
        print(f"  🌐 Presiona Ctrl+C para detener")
        print("\n" + "="*60 + "\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n  👋 Servidor detenido. ¡Hasta luego!\n")
            httpd.shutdown()

if __name__ == "__main__":
    run_server()
