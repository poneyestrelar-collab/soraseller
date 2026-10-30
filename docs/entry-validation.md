# Página inicial / prévia de login

Implementação original a partir da direção visual do HTML de referência: ambiente escuro, iluminação diagonal e cartão translúcido, adaptados a verde-floresta e menta. O HTML enviado é uma página de apresentação de template com recursos locais ausentes. Seus scripts e rastreadores não foram executados nem incorporados. A capa remota não pôde ser carregada (403); a direção visual foi inferida da descrição e metadados presentes no arquivo.

Validação no Chromium:

- Início em `#home`, prévia em `#login`, links para painel, contas a pagar e calculadora.
- Larguras 1440, 800, 620, 390 e 360 px sem overflow horizontal do documento; capturas desktop e móvel inspecionadas.
- E-mail opcional com validação HTML; entrada vazia permitida na demonstração, endereço inválido bloqueado, endereço válido não armazenado e não enviado.
- Nenhuma senha solicitada, sessão criada ou autenticação simulada como real.
- Entrada no painel e retorno à página inicial; e-mail descartado ao sair da tela pública.
- Navegação por teclado e tratamento de movimento reduzido.
- Conta a pagar cadastrada continua disponível ao navegar pelo início e retornar.
- Nenhuma exceção JavaScript, requisição externa ou POST durante os fluxos verificados.
- `npm run check` e `git diff --check` aprovados.

Não verificado: Safari/iOS, leitor de tela e implantação GitHub Pages. Autenticação real e sincronização de dados não fazem parte desta etapa.
