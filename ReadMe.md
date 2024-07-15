# Projeto CRUD com Node.js, Prisma e MongoDB

Este é um projeto de CRUD (Create, Read, Update, Delete) para gerenciamento de usuários, desenvolvido com Node.js, Prisma e MongoDB. O projeto inclui autenticação de usuário utilizando JWT .

obs: a parte do pdf nao ficou 100% mas o restante do projeto está funcionando

## Configuração

### Pré-requisitos

- Node.js instalado (versão 14 ou superior)
- Conta no MongoDB Atlas ou servidor MongoDB configurado

### Instalar as Dependencias 
npm install

### Config Prisma
npx prisma generate

### Executar

npm start

O servidor estará rodando na porta 3000

### Rotas Disponiveis 

    Autenticação
### POST /auth/login: 

Autentica um usuário e retorna um token JWT.

Corpo da requisição:
json
Copiar código
{
  "email": "user@example.com",
  "password": "password123"
}

CRUD de Usuários

### POST /users: 
Cria um novo usuário.

Corpo da requisição:

json
Copiar código
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "level": 1
}
### GET /users: 
Lista todos os usuários.

### GET /users/:id: 
Detalhes de um usuário específico.

### PUT /users/:id: 
Atualiza um usuário específico.

### Corpo da requisição:
json
Copiar código
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "newpassword123",
  "level": 2
}
### DELETE /users/:id: 
Exclui um usuário específico.


