Objetivo
Aplicar os conceitos aprendidos sobre Micro Frontends, dividindo uma aplicação web em múltiplos micros independentes e integrando-os por meio de uma aplicação container. O objetivo é praticar o uso do Webpack Module Federation para simular um cenário real de desenvolvimento distribuído e escalável.

Requisitos
1. Estrutura da Aplicação

O sistema deve ser dividido em três aplicações distintas:

Container App: Aplicação principal, que importa os micros.

Micro Cardápio: Lista de pratos disponíveis para pedido.

Micro Pedido: Mostra os itens adicionados ao pedido.

2. Funcionalidades

O micro Cardápio deve exibir uma lista de pratos com nome, descrição e botão de “Adicionar ao pedido”.

O micro Pedido deve exibir os itens selecionados.

A comunicação entre os micros pode ser feita com eventos globais simples (ex: window.dispatchEvent) ou contextos externos.

3. Integração com Module Federation

Cada micro deve ser criado em um repositório ou pasta separada.

O projeto container deve importar os outros projetos via Module Federation.

4. Tecnologias obrigatórias

React

Webpack Module Federation

JavaScript (sem necessidade de TypeScript neste projeto)

5. Organização

Utilize componentes reaproveitáveis em cada micro.

Estruture bem os diretórios para manter organização por responsabilidade.

O código precisa estar comentado e limpo.

Entrega
Crie um repositório no GitHub com as três aplicações (pode ser um monorepo).

No README.md, explique: 

Como rodar cada micro

Como funciona a comunicação entre eles

Compartilhar o link do repositório conforme instruções na plataforma.

Dicas
Comece criando o micro do cardápio com lista de produtos estáticos.

Use React.lazy + Suspense para importar micros no container.

Teste cada micro individualmente antes de integrá-los.

Evite dependências externas desnecessárias.

Aplique o que aprendeu sobre organização de componentes, props, estado e boas práticas do React.