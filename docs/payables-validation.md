# Contas a pagar — validação

Verificado no Chromium sobre o servidor estático do projeto:

- Cadastro simples e divisão de R$ 100,01 em três parcelas de R$ 33,34 / R$ 33,34 / R$ 33,33.
- Primeiro vencimento em 31/01: parcelas seguintes em 28/02 e 31/03; fevereiro bissexto em 29/02; semana atravessando dezembro/janeiro.
- Edição somente da parcela escolhida, pagamento, reabertura disponível e persistência após recarregar.
- Seleção de mês/dia, pesquisa, status, lista vazia e totais de vencidas.
- Download CSV do mês e filtros selecionados; textos de usuário escapados na interface e células protegidas contra interpretação como fórmula.
- Exclusão de um vencimento com confirmação/cancelamento, preservando outras parcelas.
- Falha de quota mantém os campos do formulário; JSON inválido é preservado com gravação bloqueada; conflito com alteração em outra aba bloqueia sobrescrita.
- Larguras de 1440, 768, 390 e 360 px sem overflow do documento. Calendário e formulário conferidos no navegador.
- Navegação das seis rotas e calculadora anterior funcionando; sem exceções JavaScript.
- `npm run check` e `git diff --check` aprovados.

Limites: armazenamento local, sem sincronização ou importação de CSV; não foram testados Safari, leitores de tela ou publicação no GitHub Pages. Esta versão não executa pagamentos nem mistura os compromissos com o lucro dos pedidos demonstrativos.
