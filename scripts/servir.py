"""Servidor apenas para desenvolvimento local; usa a biblioteca padrao."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
import webbrowser

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument("--port", type=int, default=5500)
parser.add_argument("--no-browser", action="store_true")
args = parser.parse_args()
handler = partial(SimpleHTTPRequestHandler, directory=str(root))
try:
    with ThreadingHTTPServer(("127.0.0.1", args.port), handler) as server:
        url = f"http://127.0.0.1:{args.port}/index.html"
        print(f"Site local: {url} | Para encerrar: Ctrl+C", flush=True)
        if not args.no_browser:
            webbrowser.open(url)
        server.serve_forever()
except KeyboardInterrupt:
    print("\nServidor encerrado.")
except OSError as error:
    raise SystemExit(f"Nao foi possivel iniciar: {error}. Tente --port 5501.")
