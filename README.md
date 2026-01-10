![Angular](https://img.shields.io/badge/Angular-v19-red)
![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)
# 🚀 ByteBank - Shell (Angular Host)

## 🎯 Sobre o Projeto

Este repositório contém o **Projeto Host (Shell)** da aplicação ByteBank, desenvolvido com **Angular v19**. Seu principal objetivo é atuar como a espinha dorsal da arquitetura de **Micro Frontends**, orquestrando a integração e navegação entre os diferentes módulos da aplicação (Home e Dashboard).

O Shell é responsável por prover a estrutura base, gerenciar o roteamento dinâmico e garantir que os micro frontends sejam carregados de forma eficiente utilizando **Native Federation**.

### Responsabilidades Chave do Shell:

* **Estrutura da Interface:** Gerencia o layout principal da aplicação (contendo `Header`, `Footer` e componentes de UI base), servindo como o contêiner onde as páginas dos micro frontends são renderizadas.
* **Orquestração de Micro Frontends:** Utiliza o `@angular-architects/native-federation` para carregar módulos remotos (`bytebank-home-angular` e `bytebank-dashboard-angular`) sob demanda.
* **Gerenciamento de Rotas:** Define a navegação principal, redirecionando o usuário para os módulos corretos e tratando rotas inexistentes com uma página de "Não Encontrado" (404).
* **Intercepção de Requisições:** Implementa um `AuthInterceptor` para gerenciar a injeção de tokens de autenticação (JWT) em requisições HTTP, garantindo a comunicação segura entre o front-end e os serviços de back-end.

## 🏛️ Arquitetura e Tecnologias

A arquitetura do projeto adota o padrão de **Micro Frontends** com **Native Federation**, permitindo que diferentes partes da aplicação sejam desenvolvidas, testadas e implantadas de forma independente, enquanto o Shell as unifica em tempo de execução.

### Tecnologias Principais Utilizadas:

* **Angular v19.0.0:** A versão mais recente do framework, trazendo melhorias de performance (como Signals e nova reatividade) e uma experiência de desenvolvimento moderna.
* **Native Federation:** Uma implementação leve e padronizada de Module Federation que utiliza padrões nativos do navegador (ES Modules e Import Maps), eliminando a dependência de bundlers específicos como Webpack.
* **TypeScript:** Garante tipagem estática e segurança no desenvolvimento, facilitando a manutenção e escalabilidade do código.
* **CSS Design System:** Utilização de variáveis CSS (`variables.css`) e folhas de estilo modulares (`colors.css`, `typography.css`, `breakpoints.css`) para garantir consistência visual em toda a aplicação.
* **Angular CLI:** Ferramenta padrão para construção e gerenciamento do projeto.

### Configuração dos Micro Frontends

O Shell é configurado para carregar dinamicamente os seguintes Micro Frontends, definidos no arquivo `public/federation.manifest.json`:

1.  **Home (`bytebank-home-angular`):** Acessível através da rota `/home`.
2.  **Dashboard (`bytebank-dashboard-angular`):** Acessível através da rota `/dashboard`.

O arquivo `federation.config.js` gerencia o compartilhamento de dependências (como `@angular/core`, `rxjs`) para evitar duplicação de bibliotecas no navegador.

## 📁 Estrutura de Arquivos

Abaixo, uma visão geral da estrutura de diretórios do projeto Shell, refletindo sua organização modular:

```plaintext
.
├── federation.config.js      # Configuração do Native Federation (dependências compartilhadas)
├── angular.json              # Configuração do workspace Angular
├── package.json              # Dependências (Angular 19, Native Federation, etc.)
└── src/
    ├── app/
    │   ├── app.component.ts  # Componente raiz (RouterOutlet)
    │   ├── app.routes.ts     # Definição das rotas (Lazy loading dos MFEs)
    │   ├── components/       # Componentes visuais reutilizáveis
    │   │   ├── button/
    │   │   ├── footer/
    │   │   └── header/
    │   ├── core/
    │   │   └── auth-interceptor/
    │   │       └── auth.interceptor.ts # Interceptor para Token JWT
    │   ├── pages/
    │   │   └── not-found/    # Página de erro 404
    │   └── shared/
    │       └── design-system/ # Arquivos CSS globais (Cores, Tipografia)
    ├── assets/               # Ícones e imagens (SVGs)
    ├── environments/         # Variáveis de ambiente
    └── main.ts               # Ponto de entrada da aplicação
```

### Detalhamento dos Arquivos e Diretórios

* **`package.json`**: Lista as dependências do projeto (como `native-federation`, Angular 19) e define os scripts para construção e execução (`start`, `build`, `test`).
* **`federation.config.js`**: Arquivo de configuração central do Native Federation. Controla quais bibliotecas são compartilhadas com os micro frontends para otimizar o desempenho.
* **`public/federation.manifest.json`**: Mapeia os nomes dos micro frontends remotos para suas URLs de execução (`bytebank-home-angular` na porta 4201 e `bytebank-dashboard-angular` na 4202), permitindo que o Shell os localize dinamicamente.
* **`src/app/core/auth-interceptor/`**: Contém o `AuthInterceptor`, responsável por interceptar todas as requisições HTTP e adicionar o cabeçalho de autorização (Bearer Token) se o usuário estiver autenticado.
* **`src/app/shared/design-system/`**: Centraliza os arquivos CSS globais do projeto, definindo variáveis de cores, tipografia, espaçamentos e breakpoints para garantir a identidade visual da marca ByteBank.
* **`src/app/components/`**: Abriga componentes de UI reutilizáveis e "burros" (dumb components) como `Header`, `Footer` e `Button`, que compõem a estrutura visual fixa do Shell.
* **`src/app/pages/not-found/`**: Contém o componente exibido quando o usuário tenta acessar uma rota inexistente, garantindo uma boa experiência de erro.

## ✨ Funcionalidades do Projeto Host

O Shell do ByteBank foi projetado para ser leve e focado na integração, oferecendo:

* **Layout Unificado:** Provê o "esqueleto" da aplicação com Cabeçalho e Rodapé persistentes, mantendo a consistência visual enquanto o usuário navega entre diferentes micro frontends.
* **Roteamento Dinâmico:** Gerencia a navegação entre a **Home** (pública) e o **Dashboard** (área logada), carregando os módulos correspondentes apenas quando necessário.
* **Tratamento de Rotas Inexistentes:** Redireciona acessos a URLs inválidas para uma página amigável de "Página não encontrada" (404), ilustrada com componentes visuais dedicados.
* **Segurança na Comunicação:** Através do `AuthInterceptor`, garante que a comunicação com o Back-end (`http://localhost:3000`) seja segura, injetando automaticamente tokens de autenticação nas chamadas de API.
* **Design System Global:** Implementa a base de estilos CSS que pode ser consumida e seguida pelos micro frontends para manter a uniformidade visual.

## 💻 Como Rodar o Projeto

Siga as instruções abaixo para executar o Shell localmente.

### Pré-requisitos

Certifique-se de ter o **Node.js** (versão LTS recomendada) instalado em seu ambiente.

### Executando Localmente

1.  **Instalar Dependências:**
    Na raiz do projeto, execute o comando para baixar todas as bibliotecas necessárias:

    ```bash
    npm install
    ```

2.  **Iniciar os Micro Frontends (Obrigatório):**
    Para que o Shell funcione corretamente e carregue o conteúdo, os projetos remotos devem estar rodando em paralelo nas portas configuradas no manifesto:
    * **Home:** Deve estar rodando em `http://localhost:4201`
    * **Dashboard:** Deve estar rodando em `http://localhost:4202`

3.  **Iniciar o Shell:**
    Inicie o servidor de desenvolvimento do Angular:

    ```bash
    npm start
    ```

    A aplicação estará acessível em seu navegador através do endereço: `http://localhost:4200`.

## ⚙️ API (Back-end)

O projeto está configurado (via `environment.ts`) para se comunicar com uma API local rodando em `http://localhost:3000`. Certifique-se de que o serviço de back-end esteja ativo para funcionalidades que dependem de dados dinâmicos ou autenticação.