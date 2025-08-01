# Desafio Seleção Node + React - Stefanini Group

## 🎯 Objetivo do Desafio

O objetivo deste desafio é avaliar conhecimentos em **Node.js** e **React**, por meio do desenvolvimento de um **sistema de gerenciamento de pessoas**.

---

## ✅ Requisitos

Antes de iniciar o projeto, certifique-se de ter instalado:

- **[Node.js](https://nodejs.org/)** `v22+`  
  Recomendamos usar a versão LTS mais recente para garantir compatibilidade.

- **[pnpm](https://pnpm.io/)** `v9+`  
  Este projeto utiliza **pnpm** como gerenciador de pacotes para melhor performance e gerenciamento de workspaces.

- **[Docker](https://www.docker.com/)** _(opcional)_  
  Necessário apenas se você optar por rodar os serviços de banco de dados em containers.

---

## 📦 Estrutura do Projeto

Este projeto utiliza a abordagem **monorepo**, construída com a ferramenta [Turborepo](https://turborepo.com/), permitindo gerenciar múltiplas aplicações de forma eficiente dentro de um único repositório.

### 🛠 Aplicações

O monorepo está dividido em três aplicações principais:

- **web** → Interface web da aplicação.
- **mobile** → Aplicação mobile para Android e iOS.
- **api** → Backend responsável pela lógica de negócio e integração com banco de dados.

---

## Tecnologias Utilizadas

### Backend (api)

- **[NestJS](https://nestjs.com/)**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Vitest + Supertest** para testes unitários e E2E

### Frontend (web)

- **[React.js](https://react.dev/)**
- **TypeScript**
- **TailwindCSS**
- **React Query** para chamadas à API

### Mobile (mobile)

- **[React Native](https://reactnative.dev/)** com **[Expo Go](https://expo.dev/)**
- **TypeScript**
- **TailwindCSS**
- **React Query** para chamadas à API

---

## ▶️ Como Rodar o Projeto

Este projeto utiliza um **monorepo com [Turborepo](https://turborepo.com/)**, contendo três aplicações: `web`, `mobile` e `api`.  
Siga os passos abaixo para configurar e executar o projeto localmente:

### 📥 Clonar o Repositório

```bash
git clone https://github.com/JoaoTrajano/challange_stefanini
cd challange_stefanini
```

## 📦 Instalar Dependências

Na raiz do projeto, execute:

```bash
pnpm install
```

## ⚙️ Executar as Aplicações

Para rodar todas as aplicações em modo desenvolvimento de forma simultânea:

```bash
pnpm dev
```

## ▶️ Rodar Individualmente

Caso queira iniciar apenas uma aplicação específica:

- **Backend (api)**:

```bash
cd apps/api
pnpm dev
```

- **Frontend Web (web)**:

```bash
cd apps/web
pnpm dev
```

- **Aplicação Mobile (mobile)**:

```bash
cd apps/mobile
pnpm start
```
