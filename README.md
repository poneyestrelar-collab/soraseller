# soraseller

# SoraSeller

Protótipo navegável de gestão de vendas e rentabilidade para marketplaces, em português e com dados fictícios. Inclui dashboard por período, filtros e paginação de vendas, exportação CSV, cadastro local de custos e calculadora de lucro.

## Executar

Requisito: Node.js 22 ou superior. Sem dependências externas de execução.

```sh
npm run dev
```

O servidor escuta na porta 3000 (ou na variável `PORT`). Para verificar a sintaxe: `npm run check`.

Os custos ficam no localStorage do navegador. Não há autenticação, backend de negócios, sincronização ou integração real com marketplaces. Os pedidos demonstrativos têm datas fixas de outubro de 2026. A tipografia usa fontes locais, sem requisições externas.

## Abrir pelo GitHub Pages

Em Settings → Pages, selecione Deploy from a branch, branch main e pasta / (root). Salve e aguarde a publicação.

Endereço esperado após a publicação: https://poneyestrelar-collab.github.io/soraseller/

## Revisão de interface

A revisão baseada na skill Visant Killer está documentada em `docs/audits/visant-soraseller.md`, com alterações, verificações e limites de cobertura. Ícones Lucide 0.468.0 (ISC), licença em `assets/lucide-LICENSE`.

## Contas a pagar

Acesse a aba **Contas a pagar** para cadastrar descrição, valor total, primeiro vencimento, parcelas e status. Categoria, fornecedor, forma de pagamento e observações ficam disponíveis no formulário. O calendário começa no mês atual, usa a data de São Paulo e permite filtrar a lista por dia. Parcelas mensais preservam o dia original e se ajustam ao último dia de meses menores; o valor total é dividido em centavos, sem diferenças na soma.

É possível editar ou excluir um vencimento individual, marcar como pago ou reabrir e exportar a lista filtrada em CSV. Os resumos consideram o mês de vencimento selecionado, inclusive o resumo de próximos sete dias (hoje mais seis dias). Marcar como pago é apenas controle: não executa pagamentos, não se conecta ao banco e não altera a margem das vendas.

Os dados usam a chave `soraseller-payables-v1` no localStorage deste navegador. Não há sincronização, importação do CSV ou backup em servidor. Guarde os CSVs de cada mês; limpar dados do navegador remove os registros. Falhas de leitura não sobrescrevem dados existentes; falhas de gravação mantêm o formulário; alterações em outra aba bloqueiam uma gravação desatualizada.

## Página inicial e entrada

A raiz abre a página pública (`#home`). `#login` mostra a prévia visual de acesso, com cartão translúcido, iluminação em verde e entrada na demonstração. A identidade visual é uma composição original inspirada na referência HTML enviada, sem depender dos scripts, imagens, rastreadores ou arquivos remotos dela.

**Não existe autenticação nesta etapa.** O e-mail da prévia é opcional, validado somente pelo navegador e não é enviado nem armazenado. O botão “Explorar demonstração” leva ao painel sem criar sessão, conta ou proteção de acesso. As rotas `#dashboard` e `#payables` seguem acessíveis diretamente. Para login real serão necessários provedor de identidade, sessões e autorização no backend; esconder o painel no frontend não protege dados.

No painel, “Voltar ao início” retorna à página pública sem apagar os dados locais. Os estilos públicos estão isolados em `entry.css` e o comportamento em `entry.js`.

## WhatsApp, relatórios e notificações

O painel agora usa o tema escuro verde-floresta/menta da página inicial. Em **WhatsApp e relatórios**, prepare as preferências locais e visualize faturamento diário, semanal, mensal e margem diária. É possível copiar o texto ou abrir o WhatsApp para enviar manualmente; preferências salvas não ativam automação.

A aba **Notificações** tem sino com contador, leitura e simulação de venda com valor, lucro e margem. Até 50 pedidos simulados e seus alertas são preservados no navegador e somados aos dados demonstrativos de 29/10/2026. Avisos do navegador são opcionais e dependem de permissão e do site aberto.

**Automação real pendente:** ainda não há API de WhatsApp, backend/agendador nem fonte de vendas reais. O usuário informou não ter provedor. O caminho recomendado e as dependências estão em `docs/whatsapp-and-notifications.md`. Nenhum token deve ser colocado no frontend ou no repositório público.

## Aparência do painel

O painel abre em **Branco** por padrão. O seletor **Aparência**, no topo, alterna entre Branco e Modo escuro sem recarregar a página nem descartar formulários. A preferência usa `soraseller-theme` no navegador e é sincronizada entre abas. A página inicial e a prévia de login mantêm sua identidade visual original.
