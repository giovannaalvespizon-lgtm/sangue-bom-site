# Arquitetura e manutencao

HTMLs completos mantidos para funcionar sem fetch de componentes e sem etapa de build. Cabecalho e rodape possuem a mesma estrutura, mas sao repetidos nos HTMLs: ao editar um item global de navegacao, atualize as seis paginas. CSS e JS compartilhados sao carregados antes dos arquivos exclusivos.

Ordem de scripts de Locais: main.js, data/unidades.js, pages/locais.js, todos com defer. A base deve existir antes da logica de busca. Beneficios, Criterios e Patrocinio nao precisam de JS exclusivo.

Arquivos locais.html e contato.html na raiz sao redirecionamentos de compatibilidade. A pagina canonica de Locais e pages/locais.html. pages/contato.html tambem aponta para Patrocinio.

Nao ha backend, banco de dados, envio de formulario, geocodificacao nem busca nacional por CEP. Favoritos de Historias usam armazenamento local. Localizacao de Locais e usada em memoria, sem persistencia pelo site.
