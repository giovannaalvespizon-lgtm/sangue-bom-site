# Sangue Bom: Home

Abra index.html para visualizar. Estrutura pronta para hospedagem estatica.

## Arquivos
- index.html: nova Home, criada a partir das capturas (o HTML original da Home nao foi enviado).
- css/home.css: estilos exclusivos da Home, mobile-first.
- js/home.js: menu responsivo, Escape e ano do rodape.
- assets/img/hero-imagem.png: imagem original enviada, sem alteracao.
- locais.html: copia reparada do HTML enviado, com caminhos relativos a raiz.
- css/locais.css: CSS original preservado.
- js/locais.js: logica original preservada; horarios fixos substituidos por aviso para confirmar.
- js/locais-config.js: configuracao opcional do mapa.

## Integracao
A Home aponta para locais.html, que carrega seus proprios CSS e JS. Nao carregue locais.js na Home.
A Home nao depende de components/layout.css ou components/layout.js, que nao foram enviados.
A marca no cabecalho e tipografica, nao uma reproducao do logotipo das capturas.
Nao foram inventados patrocinadores, contatos, depoimentos ou paginas inexistentes.

## Antes de publicar
- Validar enderecos, coordenadas e atendimento da base de locais com cada unidade.
- O mapa precisa de chave Google Maps configurada e restrita ao dominio. Sem chave, a lista e filtros funcionam, mas clicar numa unidade nao abre mapa.
- A pagina de locais ainda precisa de auditoria propria: modal sem contenimento/restauracao de foco e uso de marcadores legados foram preservados para nao ampliar a refatoracao da Home.
- Revisar orientacoes de saude com o servico de hemoterapia responsavel.
- Validar com leitores de tela, navegadores e dispositivos reais; nao representa certificacao WCAG.
- Adicionar contatos reais, politicas e autorizacoes de uso de marca/imagem conforme a publicacao.

## Fontes dos textos
https://www.gov.br/saude/pt-br/composicao/saes/doacao-de-sangue
https://www.gov.br/saude/pt-br/composicao/saes/doacao-de-sangue/faq-sangue/perguntas-e-respostas-sobre-doacao-de-sangue/quanto-tempo-dura-a-doacao
https://saudedigital.saude.sp.gov.br/servicos/poupatempo-da-saude/saude-para-todos/consultar-hemocentros

Ajustes editoriais: minimo de 50 kg, em vez de mais de 50 kg; cerca de 40 minutos para o procedimento completo, em vez de prometer 30 minutos. A triagem define aptidao. O numero de quatro vidas expressa possibilidade, nao garantia.


## Pagina Beneficios integrada
Abra index.html e clique em Beneficios. A segunda pagina fica em pages/beneficios.html, com CSS proprio em css/beneficios.css. Ambas usam css/home.css e js/home.js, preservando menu, rodape e identidade visual. Locais continua incluido.
A pagina foi reconstruida das imagens, pois nao foi enviado HTML de beneficios. Foram mantidos cinco cards, com grade 3+2 no desktop e layout mobile-first. Textos foram revisados: folga vinculada a CLT, prioridade com comprovante de 120 dias, meia-entrada e concursos sujeitos a normas locais, e triagem em vez de promessa de check-up. Fontes oficiais estao nos cards. Nao foram criados contatos ficticios nem paginas institucionais vazias.


## Locais harmonizado
Pagina canonica: pages/locais.html. O arquivo locais.html na raiz redireciona links antigos. Menu e rodape iguais aos da Home e Beneficios. CSS de Locais foi reescrito com classes isoladas; dados separados em js/locais-dados.js; logica em js/locais.js.
Mapa substituido por Leaflet 1.9.4 + OpenStreetMap, carregado somente ao clicar em Carregar mapa. Nao exige chave Google. A biblioteca e as imagens do mapa precisam de internet; lista, filtros, detalhes e modal continuam disponiveis sem mapa. Links de rota abrem Google Maps em outra aba.
Nao ha busca nacional, geocodificacao ou consulta de CEP. Sem permissao de localizacao, lista alfabetica; com permissao, distancias em linha reta calculadas no navegador. Nao ha armazenamento da localizacao pelo site. O mapa externo recebe requisicoes do navegador; revisar privacidade antes de publicar.
Base de seis unidades preservada, sem validacao de coordenadas/endereco. Confirmar dados antes de publicar. Horarios fixos e falsas indicacoes de aberto removidos.
Modal nativo com Escape, bloqueio do fundo e restauracao de foco.
Hospedar via HTTPS para geolocalizacao. Para producao com trafego significativo, contratar provedor de tiles adequado; servidores publicos OSM nao oferecem SLA. Nao fazer prefetch nem download em massa. Manter atribuicao visivel. O provedor pode ser trocado por window.SANGUE_BOM_MAP_CONFIG={tileUrl:...,attribution:...} antes de locais.js.
Documentacao:
https://leafletjs.com/examples/quick-start/
https://operations.osmfoundation.org/policies/tiles/
https://developers.google.com/maps/documentation/javascript/error-messages
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog

## Validacao desta entrega
Testes Chromium em seis larguras (320 a 1440 px) nas tres paginas, busca, filtros, modal, Escape, foco, links e fallback sem rede aprovados. Geolocalizacao testada com resposta simulada apenas no teste, nao na aplicacao. Carregamento externo de Leaflet/tiles nao validado neste ambiente; requer teste online no dominio de publicacao.


## Cinco paginas integradas
Inicio: index.html; criterios: pages/criterios.html; beneficios: pages/beneficios.html; locais: pages/locais.html; historias: pages/historia.html.
A quinta pagina foi reconstruida das referencias visuais; nao foi enviado HTML original. Os quatro relatos sao exemplos editoriais explicitamente identificados. Nao foram associados nomes ou fotografias de pessoas a depoimentos. Os paineis visuais sao placeholders; substitua por assets autorizados.
O e-mail foi reproduzido da captura e precisa de confirmacao. mailto abre o cliente de e-mail; nao ha backend de recebimento/publicacao. Favoritos usam localStorage sem contagens publicas.


## Patrocinio: penultima pagina
pages/patrocinadores.html e css/patrocinadores.css adicionados. As seis paginas anteriores/atuais compartilham navegacao. Contato ainda nao foi criado; nao ha link quebrado para pagina futura.
Nomes de empresas reproduzidos das capturas, sem confirmar vinculo. Nomes tipograficos provisórios, sem logos oficiais. Hero usa composicao CSS com simbolo de solidariedade; foto hospitalar original nao foi enviada separadamente. Substitua por asset autorizado antes da publicacao. Canal comercial nao informado: CTA leva a aviso explicito, sem envio ficticio.

Contato integrado: menu e rodape das seis paginas apontam para pages/patrocinadores.html#canal-patrocinio (com caminhos relativos). contato.html na raiz e em pages redirecionam para a mesma interface. Nenhum formulario, e-mail ou envio foi inventado; canal comercial ainda pendente conforme pagina original.
