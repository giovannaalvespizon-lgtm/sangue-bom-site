"""Valida caminhos locais, ancoras, IDs e JSON. Nao acessa a internet."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
class Document(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.duplicates = []
        self.links = []
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        ident = attrs.get("id")
        if ident:
            if ident in self.ids:
                self.duplicates.append(ident)
            self.ids.add(ident)
        for key in ("href", "src"):
            if attrs.get(key):
                self.links.append(attrs[key])
        if tag == "meta" and attrs.get("http-equiv", "").lower() == "refresh":
            content = attrs.get("content", "")
            if "url=" in content.lower():
                self.links.append(content.split("=", 1)[1])

docs = {p.resolve(): Document(p.read_text(encoding="utf-8")) for p in ROOT.rglob("*.html")}
errors = []
for file, doc in docs.items():
    errors.extend(f"ID duplicado: {file.name}: {x}" for x in doc.duplicates)
    for link in doc.links:
        parsed = urlsplit(link)
        if parsed.scheme or parsed.netloc:
            continue
        target = (file.parent / unquote(parsed.path)).resolve() if parsed.path else file
        if not target.is_relative_to(ROOT):
            errors.append(f"Caminho fora do projeto: {file.name}: {link}")
        elif not target.exists():
            errors.append(f"Arquivo ausente: {file.name}: {link}")
        elif parsed.fragment and target in docs and unquote(parsed.fragment) not in docs[target].ids:
            errors.append(f"Ancora ausente: {file.name}: {link}")
for file in ROOT.rglob("*.json"):
    try:
        json.loads(file.read_text(encoding="utf-8"))
    except ValueError as error:
        errors.append(f"JSON invalido: {file}: {error}")
if errors:
    print("\n".join(errors))
    sys.exit(1)
print(f"OK: {len(docs)} HTMLs, caminhos, ancoras, IDs e arquivos JSON verificados.")
