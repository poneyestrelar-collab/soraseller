# soraseller

# SoraSeller

Protótipo navegável de gestão de vendas e rentabilidade para marketplaces, em português e com dados fictícios. Inclui dashboard por período, filtros e paginação de vendas, exportação CSV, cadastro local de custos e calculadora de lucro.

## Executar

Requisito: Node.js 22 ou superior. Sem dependências externas de execução.

```sh
npm run dev
```

O servidor escuta na porta 3000 (ou na variável `PORT`). Para verificar a sintaxe: `npm run check`.

Os custos ficam no localStorage do navegador. Não há autenticação, backend de negócios, sincronização ou integração real com marketplaces. Os pedidos demonstrativos têm datas fixas de outubro de 2026. A tipografia remota é opcional e possui fontes locais de fallback.

## Abrir pelo GitHub Pages

Em Settings → Pages, selecione Deploy from a branch, branch main e pasta / (root). Salve e aguarde a publicação.

Endereço esperado após a publicação: https://poneyestrelar-collab.github.io/soraseller/
