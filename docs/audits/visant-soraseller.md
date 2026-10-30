# Revisão Visant — SoraSeller

**Resultado: 76/100, revisão parcial com limites de automação.** Gate: 0/20 (um detector indisponível); julgamento: 40/40 nos defeitos confirmados do escopo; interrogação: 36/40 (performance de dispositivo e navegação assistiva não aferidas). Não equivale a certificação Visant completa.

Escopo: T2, shell e cinco rotas de demonstração. Custos é região C com gravação local; nenhuma transação financeira real.

## Surfaces

| File | Surface (A/B/C) | Business variable it moves | Notes |
|---|---|---|---|
| app.js#dashboard | B | Tempo para identificar lucro e margem | Indicadores e comparação por período |
| app.js#sales | B | Tempo para localizar um pedido | Busca, filtro, exportação |
| app.js#marketplaces | B | Clareza sobre canais demonstrativos | Sem conexão real |
| app.js#costs | C | Precisão do custo usado no lucro | Persistência local explícita |
| app.js#calculator | B | Margem estimada por venda | Simulação sem gravação |

## Screen seen

| Route | Width | Data state | Result |
|---|---|---|---|
| #dashboard | 1440px | Dados fictícios preenchidos | DOM 415 nós, overflow 0px, sem erro JS |
| #sales | 1440px | Dados fictícios preenchidos | DOM 245 nós, overflow 0px, sem erro JS |
| #marketplaces | 1440px | Dados fictícios preenchidos | DOM 141 nós, overflow 0px, sem erro JS |
| #costs | 1440px | Dados fictícios preenchidos | DOM 150 nós, overflow 0px, sem erro JS |
| #calculator | 1440px | Dados fictícios preenchidos | DOM 113 nós, overflow 0px, sem erro JS |
| #dashboard | 390px | Dados fictícios preenchidos | DOM 415 nós, overflow 0px, sem erro JS |
| #sales | 390px | Dados fictícios preenchidos | DOM 245 nós, overflow 0px, sem erro JS |
| #marketplaces | 390px | Dados fictícios preenchidos | DOM 141 nós, overflow 0px, sem erro JS |
| #costs | 390px | Dados fictícios preenchidos | DOM 150 nós, overflow 0px, sem erro JS |
| #calculator | 390px | Dados fictícios preenchidos | DOM 113 nós, overflow 0px, sem erro JS |

Aplicação estática servida sem compilador. Espera por h1 gerado por JavaScript e dois frames; largura confirmada no DOM. Capturas desktop e móvel abertas. Estados adicionais: busca vazia, lucro negativo, persistência após reload, preço zero. Não há backend de negócios para desligar.

## Findings

- style.css:2: fontes de 9–11 px na tabela, filtros e rodapé dificultam leitura dos dados financeiros. Aumentar para 12–14 px.
- index.html:1: bloco promocional na navegação ocupa espaço sem ação; remover.
- app.js:19 e app.js:20: receita e lucro aparecem nos cartões e novamente abaixo do gráfico. Remover duplicação, mantendo contagem de pedidos.
- app.js:3: ícones desenhados manualmente; substituir por ativos Lucide locais.
- style.css:2: animações sem tratamento de movimento reduzido e cores sem tokens unificados; centralizar.
- app.js:20: legenda e eixo do gráfico com valores negativos de lucro precisam compartilhar escala; corrigir para custos acima da receita.

## Reuso

| Necessidade | Existe em |
|---|---|
| Cartões, botão, tabela, formulário, diálogo | app.js e style.css; reutilizar |
| Gráfico e composição de custos | chartPanel e costPanel; reutilizar |
| Ícones consistentes | Instalar ativos Lucide fora do projeto e copiar somente os utilizados com licença |
| Tokens e movimento reduzido | Consolidar em style.css |

## Limites

Sem backend ou autenticação. Não carregar revenue-centric-design: esta interface de trabalho não vende planos. Não adicionar React, shadcn ou novos componentes para mudar a aparência de primitivas existentes.


## Correções executadas

- Legibilidade: tabela passou de 10 para 12 px; navegação de 12 para 13 px; descrições de 10 para 12 px. Sem fonte remota obrigatória.
- Shell: removido bloco promocional sem ação; identidade da loja e indicação de demonstração preservadas.
- Métricas: preservada a ordem solicitada faturamento / ticket / lucro / margem. Removidos os totais repetidos sob o gráfico. Prejuízo recebe classe `negative`, incluindo a margem.
- Ícones: nós SVG originais de Lucide 0.468.0, licença ISC incluída. SVG do gráfico é visualização de dados, não ícone desenhado manualmente.
- Gráfico: pontos correspondem ao período selecionado, eixo inclui prejuízo e referência de zero. Lucro tracejado também distingue as séries sem depender apenas de cor.
- Calculadora: preço zero informa margem indisponível; descrição separada do resultado por espaço e divisor.
- Movimento: duração centralizada; `prefers-reduced-motion` elimina deslocamento. Menu informa estado com `aria-expanded`, períodos com `aria-pressed`.

## Gate e verificações

| Detector | Antes | Depois |
|---|---|---|
| killer-scan | 2/4 executados, relatório sem telas | 3/4 executados; telas registradas |
| token fallback | zero | zero; não prova uniformidade visual |
| noise | zero | zero; extrator não cobre templates HTML em JavaScript |
| impeccable | indisponível na primeira execução | executado: zero achados; não substitui inspeção visual |
| copy | caminho de instalação ausente | não executado |
| refine-scan | não executado | zero arquivos elegíveis; sem cobertura para esta aplicação JS |
| Sintaxe Node | aprovada | aprovada |
| Browser funcional | versão anterior | cinco rotas × 1440 e 390 px, sem erro JS |
| corta-scan | não medido | zero candidatos nas dez combinações |
| ritmo-scan | não medido | candidatos revisados abaixo |

Não há tsc, lint, build ou gates próprios em package.json: aplicação JavaScript estática sem bundler. A validação funcional cobre exportação, filtros, estado vazio, margem, custos, reload, calculadora, menu e movimento reduzido.

## Candidatos de espaçamento revisados

`ritmo-scan` identifica 24 px entre cabeçalho e filtros contra 20 px entre painéis: grupos diferentes, separação intencional. Padding superior de 18 px no cartão de margem compensa borda superior de 3 px: alinhamento dos valores preservado. Espaço de 12 px antes do total da calculadora é fechamento de grupo, não um campo irmão. Proximidade entre resultado e descrição no celular foi confirmada e corrigida com 24 px e divisor. Sem alteração ou supressão nos detectores.

## Interrogação T2

Referências aos símbolos em app.js, linhas 19 em diante; shell em index.html:1; regras da revisão em style.css:201 em diante.

| Questão | Resposta e consequência |
|---|---|
| Q1 Quem sente falta? | Vendedor que consulta sua margem. Preservar os quatro indicadores em dashboard, app.js:20. |
| Q2 Existe por necessidade? | Sim: margem foi solicitada explicitamente. Não adicionar métricas disponíveis sem decisão associada. app.js:20. |
| Q3 Uma frase bastaria? | Não para comparar períodos e consultar pedido. Reusar períodos e tabela, app.js:18 e tablePanel. |
| Q5 Qual decisão? | Identificar produto de baixa margem e revisar seu custo/preço. costsPage e calculator. |
| Q6 Qual número decide? | Margem, após faturamento/ticket/lucro na ordem pedida. Borda e valor da última stat em style.css. |
| Q7 Resposta ou matéria-prima? | Lucro e margem já calculados; remover repetição de totais no gráfico. chartPanel. |
| Q8 Padrão escolhido? | Sete dias para suavizar volume diário; seleção e intervalo visíveis em periods. Datas demonstrativas fixas, não dados atuais. |
| Q11 Quando mente? | Preço zero ou prejuízo fora do eixo. Corrigidos em calculator e chartPanel. |
| Q12 Backend cai? | Não há backend financeiro. Dados locais explícitos; indisponibilidade do servidor de arquivos não é convertida em vendas zero. server.mjs:6. |
| Q13 Promessa sem prova? | Conexões reais seriam promessa falsa; marketplaces continua marcado como demonstração. |
| Q16 Pixels até dado? | Captura 1440px: primeiro bloco financeiro inicia aproximadamente em y=238. Removida promoção do shell; cabeçalho mede 64 px. |
| Q17 Pior registro? | Teste com custo R$ 9.999,00 e margem negativa; gráfico, cartões e tabela renderizam. Busca sem resultado também verificada. |

### Bloco fixo

- F1 Reuso: stat, button, tablePanel, diálogo nativo, funções de moeda e formulário existentes. Nenhuma nova camada de componentes ou framework.
- F2 Consistência: tokens de superfície/texto/borda/marca e família Lucide; fonte local comum. Legado de cores retido em tokens para evitar alterar regiões fora dos defeitos confirmados.
- F3 Responsividade: 10 combinações, zero overflow do documento e zero candidatos de corte; tabela com rolagem interna intencional. Sem medição de INP em dispositivo real.
- F4 Fluxo do vendedor: 1 abrir visão geral; 2 localizar margem; 3 consultar venda; 4 corrigir custo ou simular preço. Valor aparece antes de qualquer formulário.
- F5 Ocultar: promoção removida da sidebar. Compactar: totais duplicados removidos do gráfico. Não ocultar: lucro, margem, rótulos de navegação e estado demonstrativo. Nenhuma ação passa a depender de hover.
- F6 Próximas lacunas de produto: integrações reais e tratamento de falha de sincronização (alto esforço/alto impacto), autenticação e isolamento de lojas (alto/alto), testes de navegação assistiva e performance em aparelhos reais (médio/médio). Não inventar dados reais para compensar.

## Detectores alterados

Nenhum. Não modificar regras externas para obter um resultado limpo. Os limites de cobertura para HTML em strings foram registrados, sem equiparar zero arquivos a aprovação.

## Propostas de gosto

Nenhuma aplicada além das correções acima. Tema escuro e mudanças de identidade visual ficam para uma solicitação específica.

## Não verificado

- Publicação GitHub Pages e estado remoto após deploy.
- copy-lint e análise automática de componentes React: indisponíveis ou incompatíveis com esta base.
- Leitor de tela, Safari/iOS e performance em dispositivo real.
- Integrações, autenticação e backend: não existem nesta demonstração.
