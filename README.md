# Mapa Fiscal Rafael

Painéis Mapa de Provas e Dificuldades por Matéria, biblioteca de estudo e arquivos originais.

## Projeto Vercel existente

- Projeto: `mapa-fiscal-rafael`
- ID: `prj_q7NGHozosJYLhohTIEj5jch9VL8u`
- Workspace: `rafainhajf-cmyks-projects`
- Endereço: https://mapa-fiscal-rafael.vercel.app

Vincular este repositório ao projeto existente em **Settings → Git → Connect Git Repository**. Usar a branch `main`, diretório raiz vazio, Framework **Other**, instalação `npm ci`, build `npm run build` e saída `public`.

## Acesso com senha compartilhada

Configurar diretamente na Vercel, para Production, antes da publicação:

- `STUDY_ACCESS_PASSWORD`: senha compartilhada com pelo menos 16 caracteres.
- `STUDY_SESSION_SECRET`: segredo aleatório com pelo menos 32 caracteres. Não compartilhar com visitantes.

Não colocar os valores no GitHub. Sem essas variáveis, o aplicativo apresenta “Acesso em preparação” e mantém os conteúdos bloqueados. A senha é verificada no servidor. Os arquivos HTML, dados, imagens e PDFs passam pela mesma verificação. A sessão expira em 24 horas; trocar a senha invalida as sessões.

O repositório é público: seu conteúdo pode ser consultado no GitHub independentemente da senha do site. Para restringir também o código e os materiais, alterar a visibilidade do repositório para privado nas configurações do GitHub. O site original e cópias publicadas anteriormente têm permissões próprias.

## Desenvolvimento

Requer Node.js 22 ou superior.

```sh
npm ci
npm run build
npm test
```

Os conteúdos ficam em `source-content/`. O build gera `private-content/` e um diretório `public/` vazio; a função `api/gateway.mjs` entrega somente arquivos permitidos após autenticação.

Snapshot importado do site em 23/10/2026, origem `c5c580cc8d620044cc8b9a08a608ace04847f951`.
