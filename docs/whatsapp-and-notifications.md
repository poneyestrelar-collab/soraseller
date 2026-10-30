# Relatórios e notificações — estado da implementação

## Implementado no frontend

- Tema interno verde-floresta/menta, seguindo a família visual da página pública. Superfícies de trabalho translúcidas por composição de cores, sem filtros de blur em cada tabela ou cartão.
- Rota `#whatsapp`: número com DDI, preferências diárias/semanais/mensais/margem diária e horário/fuso de São Paulo. São rascunhos locais, sem prometer agendamento ativo.
- Prévia baseada nos mesmos pedidos e função de lucro do painel. Margem ponderada = lucro total / faturamento total; soma em centavos. Sem receita, informar que não há faturamento, sem apresentar percentual indefinido como zero.
- Relatório diário usa a data escolhida; semanal usa os sete dias até a data, incluindo-a; mensal usa o mês completo. Todas as mensagens são identificadas como demonstração de outubro/2026.
- Copiar mensagem ou abrir `wa.me` com texto preenchido. A pessoa precisa confirmar o envio no WhatsApp. Nenhum envio automático ou credencial no frontend.
- Central `#notifications`, sino com contador, filtro de não lidas, marcar lida/todas lidas, aviso dentro do app e avisos nativos opcionais (solicitados somente ao clicar em permitir).
- “Simular venda” gera identificador único, inclui pedido no painel de demonstração e registra valor, lucro e margem no momento do evento. Últimas 50 simulações e respectivos pedidos persistem localmente e são reidratados uma vez por ID. Não são pedidos reais.
- Preferências e eventos usam `soraseller-messaging-v1` no localStorage. Dados inválidos não são sobrescritos; falha de quota ou alteração em outra aba não confirma gravação.
- Avisos nativos dependem do navegador e do site aberto. Não há service worker/push em segundo plano.

## Bloqueios para automação real

O usuário informou que ainda não tem API/provedor de WhatsApp. A configuração do ambiente e os nomes das variáveis foram consultados: nenhuma credencial Meta/WhatsApp/Twilio/Evolution, segredo ou identidade de serviço disponível. O projeto continua sendo um site estático no GitHub Pages, sem backend de identidade, banco de negócios, webhook ou agendador. Nenhuma declaração de segredo foi criada sem uma integração escolhida e validada.

Caminho recomendado: WhatsApp Business Platform / Cloud API oficial da Meta. A integração externa ainda NÃO foi implementada ou testada.

## Próxima implementação, quando as contas e a hospedagem estiverem disponíveis

1. Configurar conta de negócio/número remetente no WhatsApp Business e acesso ao app da Meta, com modelos de mensagem aprovados quando aplicável. Guardar credenciais somente no serviço de backend; jamais em localStorage, HTML ou repositório público.
2. Disponibilizar backend autenticado com isolamento por loja, banco persistente e armazenamento seguro dos destinatários/preferências. O frontend demonstrativo sem autenticação não pode acessar essas operações em produção.
3. Conectar APIs/webhooks dos marketplaces. Validar assinatura/autorização, loja, ID do evento, moeda e valores; chave única por marketplace/loja/pedido/evento. Persistir pedido e notificação em transação para evitar duplicatas.
4. Calcular lucro com custos e tarifas reais e estados de pedidos definidos (pagamento, cancelamento, devolução e liquidação). Indicar estimado/definitivo quando houver tarifas não confirmadas. Notificações de alterações/cancelamentos precisam corrigir o estado, sem contar venda nova.
5. Criar agendador no servidor usando America/Sao_Paulo, intervalos fechados [início, fim), e chave única loja/tipo/período/destinatário. Não usar `setInterval` do navegador ou GitHub Pages como agendador. Definir se o resumo diário é parcial no horário ou do dia anterior fechado antes de ativá-lo.
6. Criar outbox para pedidos e relatórios: pendente / em envio / aceito pela API / entregue / falhou. ID único e estratégia de reconciliação para timeouts, retentativas limitadas com backoff e limites por destinatário. Não confundir HTTP 200 com mensagem entregue; receber comprovantes por webhook.
7. Ativar notificações de venda reais no app a partir dos eventos persistidos, por assinatura autenticada ou consulta incremental. Push quando o site estiver fechado requer suporte adicional.
8. Enviar primeiro um teste explicitamente solicitado para o destinatário escolhido; conferir entrega, fuso, totais, duplicatas e restauração após falha antes de habilitar recorrência.

## Validação executada

Chromium: tema escuro; simulação com lucro e margem; contador/leitura; persistência e reidratação sem duplicação; número inválido; preferências após reload; quatro relatórios; cálculo ponderado; período vazio; cópia; URL manual de WhatsApp interceptada sem abrir destinatário real; oito rotas em 1440, 768, 390 e 360px sem overflow do documento; regressão da calculadora e início. Sem exceções JavaScript.

Limites: nenhum envio de WhatsApp real, backend, webhook, agendamento ou push em segundo plano validado. Os dados de vendas continuam fictícios. Safari/iOS e leitores de tela não foram verificados.
