# Restaurante em Micro Frontends

Aplicação web dividida em três micro frontends independentes, integrados por **Webpack Module Federation**. O projeto foi desenvolvido para praticar arquitetura distribuída em React, simulando um cenário real onde diferentes partes da aplicação podem ser desenvolvidas de forma separada.

## Objetivo

Aplicar os conceitos de **Micro Frontends** utilizando:

- React
- Webpack Module Federation
- Comunicação entre micros
- Estrutura escalável e desacoplada
- Organização por responsabilidade

O sistema foi separado em aplicações independentes que se conectam através de um container principal.

## Visão geral da aplicação

O projeto é composto por três aplicações:

| Aplicação | Função | Porta |
|---|---|---|
| **Container** | Aplicação principal responsável por carregar os micros | `3000` |
| **Cardápio** | Lista os pratos disponíveis para pedido | `3001` |
| **Pedido** | Exibe os itens adicionados ao pedido | `3002` |

Cada micro pode ser executado individualmente para desenvolvimento e testes.

## Funcionalidades

### Micro Cardápio

- Exibe lista de pratos
- Mostra nome, descrição e preço
- Possui botão de “Adicionar ao pedido”

### Micro Pedido

- Exibe os itens selecionados
- Atualiza automaticamente quando novos itens são adicionados
- Agrupa itens por quantidade
- Exibe total do pedido
- Permite limpar o pedido

### Container

- Importa os micros utilizando Module Federation
- Exibe os micros na mesma interface
- Atualiza informações do pedido em tempo real

## Comunicação entre os micros

A comunicação entre os micros acontece através de um barramento global de eventos utilizando:

```js
window.dispatchEvent
```

O arquivo responsável por essa comunicação fica em:

```bash
shared/orderBus.js
```

Fluxo:

1. O micro Cardápio adiciona um item ao pedido.
2. O barramento atualiza os dados globais.
3. Um evento chamado `restaurant:order-updated` é disparado.
4. O micro Pedido e o Container escutam esse evento.
5. A interface é atualizada automaticamente.

Essa abordagem mantém os micros desacoplados, já que eles não dependem diretamente uns dos outros.

## Estrutura do projeto

```bash
.
├── apps/
│   ├── container/
│   ├── cardapio/
│   └── pedido/
├── shared/
│   ├── orderBus.js
│   └── formatCurrency.js
├── doc.md
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Organização aplicada

O projeto foi estruturado para manter separação clara de responsabilidades:

- Cada micro possui sua própria configuração
- Componentes reutilizáveis foram separados por função
- Existe compartilhamento apenas do necessário
- O código foi organizado para facilitar manutenção e escalabilidade

Também foram utilizados:

- `bootstrap.js` assíncrono
- Alias `@shared`
- Hooks customizados
- Componentes reutilizáveis

## Tecnologias utilizadas

- React 18
- Webpack 5
- Module Federation Plugin
- JavaScript
- Tailwind CSS
- npm workspaces
- concurrently

## Como rodar o projeto

### 1. Instalar as dependências

```bash
npm install
```

Esse comando instala as dependências da raiz e dos workspaces.

## 2. Rodar todos os micros

```bash
npm run dev
```

Após iniciar:

- Container: http://localhost:3000
- Cardápio: http://localhost:3001
- Pedido: http://localhost:3002

O container depende dos micros remotos ativos para funcionar corretamente.

## 3. Rodar micros separadamente

```bash
npm run start:container
npm run start:cardapio
npm run start:pedido
```

## 4. Build de produção

```bash
npm run build
```

O build gera a pasta `dist/` em cada aplicação.

## Fluxo de uso

1. Abra o Container em `http://localhost:3000`
2. Adicione pratos no micro Cardápio
3. O micro Pedido será atualizado automaticamente
4. O cabeçalho do Container também atualiza o total e quantidade de itens
5. Utilize “Limpar pedido” para resetar os dados

## Conceitos praticados

Durante o desenvolvimento foram praticados:

- Arquitetura de Micro Frontends
- Module Federation
- Comunicação entre aplicações independentes
- Organização de projetos React
- Componentização
- Compartilhamento de estado entre micros
- Estruturação de monorepo
- Boas práticas de organização

## Observações

O projeto foi desenvolvido utilizando um monorepo com múltiplos micros independentes, conforme permitido pelo enunciado da atividade.

Cada aplicação possui sua própria configuração de desenvolvimento e pode ser executada separadamente para testes isolados.