# Adaptação dos gráficos Mebius

Os arquivos `Charts_v1.0.zip` e `Charts_v1.0 (1).zip` enviados são idênticos (SHA-256 `95a61d045ee067fd5051fdf12aca009d85ddc59c1c27be9139f09cdfa3cd6eec`). Contêm um arquivo Figma com canvas binário Kiwi e uma miniatura, sem arquivos React/TypeScript, instruções do registry ou anime.js.

O canvas foi decodificado em diretório temporário usando kiwi-schema e as rotinas de descompressão do Node, localizando os frames:

- `Portfolio Allocation Chart`, nó `1:6345`: cartão de 600×554, anel com segmentos em diferentes raios, relevo, percentuais e legenda.
- `Overview Chart`, nó `1:9687`: cartão de 960×594, título e resumo em blocos, controle segmentado, barras neutras com destaque e detalhes da seleção.

A implementação em `charts.js` e `charts.css` adapta esses elementos ao projeto JavaScript estático e à paleta verde do SoraSeller. Não instala nem declara usar os componentes do registry Mebius; não usa React 19, Tailwind ou anime.js. O arquivo Figma original não é publicado no repositório.

## Comportamento

- Evolução: alternância Faturamento/Lucro, agrupamento por hora para Hoje/Ontem e por dia nos demais períodos. Barras selecionáveis por clique, Tab e Enter/Espaço. Detalhes mostram data/hora, número de pedidos e valor. Valores negativos têm escala e cor próprias; sem pedidos não são criadas barras com alturas fictícias.
- Custos: segmentos calculados pelos valores reais dos pedidos demonstrativos, com produtos, tarifas, impostos e frete; percentuais sobre o total de custos. Clique na legenda ou segmento alterna a seleção; “Ver total” restaura a soma. Custos zerados permanecem na legenda, sem segmento fictício.
- Os dados são os mesmos do painel, incluindo vendas simuladas. Todos os cálculos financeiros por pedido usam agora a mesma decomposição em centavos (`saleBreakdown`), incluindo arredondamento de impostos por pedido. Isso corrige diferenças de alguns centavos entre o resumo antigo (frações de centavo acumuladas) e a soma dos pedidos/relatórios.
- Temas Branco e Modo escuro; animações curtas em CSS com suporte a movimento reduzido; sem biblioteca adicional no navegador.

## Verificação

Chromium: valores e percentuais; receita menos custos igual a lucro; lucro do gráfico igual ao destaque do painel e ao relatório semanal; seleção de categoria, retorno ao total, seleção de barra por teclado; período e indicador; dois temas em 1440/900/390/360 px sem overflow do documento; prejuízo e ausência de dados sem NaN/Infinity; capturas inspecionadas. `npm run check` e `git diff --check` aprovados.

Limites: adaptação visual a partir do Figma, não instalação dos componentes React originais. Dados continuam fictícios de outubro/2026; não há integração de marketplaces adicionada nesta mudança. Não validado em Safari/iOS ou leitores de tela.
