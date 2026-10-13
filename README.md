# Sangue Bom | Projeto organizado para VS Code

Site estatico em HTML, CSS e JavaScript. Nao precisa de npm, framework ou compilacao.

## Comecar
1. Extraia o ZIP mantendo as pastas.
2. No VS Code, use Arquivo > Abrir Pasta e selecione a raiz que contem index.html. Ou abra sangue-bom.code-workspace.
3. Com Python 3.10+ instalado, execute iniciar.bat no Windows. Alternativa no terminal: python scripts/servir.py (Windows: py scripts/servir.py).
4. O navegador abre http://127.0.0.1:5500/index.html. Encerre com Ctrl+C. Se a porta estiver ocupada: python scripts/servir.py --port 5501.
5. No VS Code tambem existem tarefas em Terminal > Executar Tarefa: iniciar servidor local e verificar arquivos e links.

O servidor Python e apenas para desenvolvimento, nunca para producao. A aplicacao em si nao depende de Python: publique os arquivos estaticos em hospedagem HTTPS.

## Organizacao
- index.html: pagina inicial.
- pages/: beneficios, criterios, historia, locais, patrocinadores e redirecionamento de contato.
- css/global.css: tokens de cor, reset, tipografia, menu, rodape, componentes e estilos da Home.
- css/pages/: estilos exclusivos de cada pagina.
- js/main.js: menu responsivo e ano do rodape.
- js/pages/: comportamento de Historias e Locais.
- js/data/unidades.js: base original das seis unidades.
- assets/img/: imagens utilizadas.
- scripts/: servidor local e verificador, sem bibliotecas extras.
- .vscode/: configuracoes e tarefas do editor.
- docs/: arquitetura, revisao e historico das entregas.

## Caminhos relativos
Na Home: css/global.css, js/main.js, pages/beneficios.html.
Dentro de pages: ../css/global.css, ../js/main.js, ../assets/img/hero-imagem.png.
Entre paginas na mesma pasta: locais.html ou patrocinadores.html#canal-patrocinio.
Contato aponta para a interface existente em Patrocinio. Nao foi criado envio de mensagens.

## Verificar apos editar
Execute python scripts/verificar.py (ou py scripts/verificar.py).
Se Node estiver instalado, node --check js/main.js verifica sintaxe JavaScript; nao e requisito para visualizar o site.
O verificador nao testa links externos nem certifica acessibilidade ou conformidade legal.

## Pendencias antes da publicacao
- Validar enderecos, coordenadas, horarios e orientacoes com as unidades.
- Definir canal de contato real: atualmente a secao apenas informa que o canal nao foi fornecido.
- Validar patrocinadores e relatos antes de apresenta-los como fatos reais.
- Revisar direitos de uso das imagens e marcas e textos juridicos/medicos.
- Testar o mapa online: Leaflet/CDN e tiles OSM precisam de internet; a lista funciona sem mapa.
- Definir provedor de mapas adequado ao trafego e politica de privacidade.
- Validar leitores de tela e dispositivos reais. Os testes nao equivalem a certificacao WCAG.

## Referencias tecnicas
https://code.visualstudio.com/docs/editor/workspaces
https://docs.python.org/3/library/http.server.html
