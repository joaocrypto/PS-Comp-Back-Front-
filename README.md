# 🎬 Cinerate - API e Frontend

## 📌 Sobre o Projeto

O Cinerate é uma aplicação fullstack para gerenciamento e avaliação de filmes. O sistema permite que usuários realizem cadastro, autenticação, recuperação de senha, visualização de filmes e criação de avaliações.

O projeto é dividido em:

* **Backend:** API REST desenvolvida em Node.js utilizando Express e Sequelize.
* **Frontend:** Interface desenvolvida em React com Vite.
* **Banco de dados:** MySQL.
* **Upload de imagens:** Cloudinary.
* **Autenticação:** JWT.

---

# 🛠️ Tecnologias Utilizadas

## Backend

### Principais bibliotecas

* Node.js
* Express
* Sequelize
* MySQL2
* JWT (jsonwebtoken)
* bcryptjs
* Multer
* Cloudinary
* Nodemailer
* AJV (validação de schemas)
* Crypto
* dotenv

## Frontend

### Principais bibliotecas

* React
* React Router DOM
* React Redux
* Vite
* CSS Modules

---

# 📁 Estrutura do Projeto

```bash
PS-Comp-Back-Front-
│
├── back/
│   ├── src/
│   │   ├── apps/
│   │   │   ├── controllers/
│   │   │   ├── middlewares/
│   │   │   └── models/
│   │   ├── configs/
│   │   ├── database/
│   │   ├── schemas/
│   │   ├── utils/
│   │   ├── routes.js
│   │   └── server.js
│
├── front/
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
├── docker-compose.yml
├── .env
```

---

# ⚙️ Como Executar o Projeto

## Pré-requisitos

Antes de iniciar, é necessário possuir instalado:

* Node.js
* MySQL
* Yarn ou npm
* Docker (opcional)

---

# 🚀 Executando o Backend

## 1. Acesse a pasta backend

```bash
cd back
```

## 2. Instale as dependências

```bash
npm install
```

ou

```bash
yarn
```

---

## 3. Configure o arquivo `.env`

Exemplo:

```env
PORT=3000

DIALECT=mysql
HOST=db
DB_USERNAME=joao
DB_PASSWORD=joao
DB_ROOT_PASS=root
DB_NAME=cinerate
DB_PORT=3306

HASH_BCRYPT=942c2cf81000b7bf295a51b3d8c0a4bb

SECRET_CRYPTO=942c2cf81000b7bf295a51b3d8c0a4bb

MAIL_HOST=SEU_MAIL_HOST
MAIL_PORT=SEU_MAIL_PORT
MAIL_USER=SEU_MAIL_USER
MAIL_PASS=SEU_MAIL_PASS

CLOUDINARY_CLOUD_NAME=SEU_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=SEU_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=SEU_CLOUDINARY_API_SECRET

```

---

## 4. Execute as migrations

```bash
npx sequelize-cli db:migrate
```

---

## 5. Execute o seed do administrador

```bash
npx sequelize-cli db:seed:all
```

---

## 6. Inicie o servidor

```bash
npm run dev
```

ou

```bash
yarn dev
```

Servidor padrão:

```bash
http://localhost:3000
```

---

# 💻 Executando o Frontend

## 1. Acesse a pasta front

```bash
cd front
```

## 2. Instale as dependências

```bash
npm install
```

---

## 3. Inicie o projeto

```bash
npm run dev
```

Aplicação disponível em:

```bash
http://localhost:5173
```

---

# 🐳 Docker

O projeto possui:

* Dockerfile para backend.
* Dockerfile para frontend.
* docker-compose.yml.

## Executar com Docker

```bash
docker compose up --build
```

É provavel que encontre um erro deste tipo:

```bash
cinerate_db     | 2026-05-24T23:27:54.538719Z 0 [System] [MY-010931] [Server] 
/usr/sbin/mysqld: ready for connections. Version: '8.4.8'  socket: 
'/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
```
onde o backend não roda por ter que esperar o banco de dados rodar,
neste caso, rode o seguinte comando novamente sem dar docker compose down:

```bash
docker compose up
```

---


# 🔐 Autenticação

A API utiliza JWT para autenticação.

Após o login, o token deve ser enviado no header:

```http
Authorization: Bearer TOKEN
```

---

# 📚 Endpoints da API

# 👤 Usuários

## 📌 Criar usuário

### Endpoint

```http
POST /register
```

### Descrição

Realiza o cadastro de um novo usuário.

### Body

```json
{
  "user": "joao",
  "email": "joao@email.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

### Regras

* O email deve ser único.
* As senhas devem coincidir.
* Apenas administradores podem criar usuários administradores.

### Resposta

```json
{
  "user": "joao",
  "email": "joao@email.com",
  "is_admin": false
}
```

---

## 📌 Atualizar usuário

### Endpoint

```http
PUT /user/update
```

### Autenticação

Necessária.

### Descrição

Atualiza dados do usuário autenticado.

### Body

```json
{
  "user": "novo_nome",
  "email": "novo@email.com",
  "password": "senha_atual",
  "newPassword": "nova_senha",
  "confirmPassword": "nova_senha"
}
```

### Funcionalidades

* Atualização de nome.
* Atualização de email.
* Alteração de senha.
* Validação da senha atual.

### Regras

* O novo email não pode existir.
* A senha atual deve estar correta.
* A nova senha deve coincidir com a confirmação.

---

## 📌 Deletar usuário

### Endpoint

```http
DELETE /user/delete
```

### Autenticação

Necessária.

### Descrição

Remove o usuário autenticado do sistema.

### Resposta

```json
{
  "message": "Usuário deletado!"
}
```

---

# 🔑 Autenticação

## 📌 Login

### Endpoint

```http
POST /login
```

### Descrição

Autentica um usuário e retorna um token JWT.

### Body

```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

### Resposta

```json
{
  "user": {
    "id": 1,
    "user": "joao",
    "is_admin": false
  },
  "token": "jwt_token"
}
```

### Funcionalidades

* Verificação de senha criptografada.
* Geração de JWT.
* Criptografia do ID do usuário.

---

## 📌 Solicitar recuperação de senha

### Endpoint

```http
POST /login/recuperar_senha
```

### Descrição

Envia um código de recuperação para o email do usuário.

### Body

```json
{
  "email": "joao@email.com"
}
```

### Funcionalidades

* Geração de código aleatório.
* Expiração do código em 15 minutos.
* Envio de email via Nodemailer.
* Limitação de múltiplos envios em curto período.

### Resposta

```json
{
  "message": "Email enviado com sucesso!"
}
```

---

## 📌 Resetar senha

### Endpoint

```http
PUT /login/recuperar_senha/confirmar
```

### Descrição

Permite redefinir a senha utilizando o código recebido por email.

### Body

```json
{
  "email": "joao@email.com",
  "codigo": "123456",
  "password": "novaSenha",
  "confirmPassword": "novaSenha"
}
```

### Regras

* O código deve ser válido.
* O código não pode estar expirado.
* As senhas devem coincidir.

---

# 🎬 Filmes

# 🔍 Endpoints públicos autenticados

## 📌 Listar todos os filmes

### Endpoint

```http
GET /filmes/list-all-filmes
```

### Autenticação

Necessária.

### Descrição

Retorna todos os filmes cadastrados.

### Resposta

```json
{
  "data": [
    {
      "id": 1,
      "titulo": "Interestelar",
      "genero": "Ficção",
      "sinopse": "...",
      "ano": 2014,
      "capa": "url"
    }
  ]
}
```

---

## 📌 Buscar filme por ID

### Endpoint

```http
GET /filmes/list-filme/:id
```

### Autenticação

Necessária.

### Descrição

Retorna os dados de um filme específico.

### Parâmetros

| Parâmetro | Tipo   | Descrição   |
| --------- | ------ | ----------- |
| id        | number | ID do filme |

---

# 👑 Endpoints administrativos

## 📌 Criar filme

### Endpoint

```http
POST /filmes/create-filme
```

### Autenticação

Necessária + administrador.

### Content-Type

```http
multipart/form-data
```

### Campos

| Campo   | Tipo   |
| ------- | ------ |
| capa    | file   |
| titulo  | string |
| genero  | string |
| sinopse | string |
| ano     | number |

### Funcionalidades

* Upload de imagem utilizando Multer.
* Upload da capa para Cloudinary.
* Validação do ano do filme.

### Regras

* A capa é obrigatória.
* O ano não pode ser maior que o ano atual.

### Resposta

```json
{
  "titulo": "Interestelar",
  "genero": "Ficção",
  "sinopse": "...",
  "ano": 2014,
  "capa": "url"
}
```

---

## 📌 Atualizar filme

### Endpoint

```http
PUT /filmes/update-filme/:id
```

### Autenticação

Necessária + administrador.

### Descrição

Atualiza os dados de um filme.

### Funcionalidades

* Atualização parcial.
* Troca de capa.
* Alteração de título.
* Alteração de gênero.
* Alteração de sinopse.
* Alteração do ano.

### Regras

* O filme deve existir.
* O ano deve ser válido.

---

## 📌 Deletar filme

### Endpoint

```http
DELETE /filmes/delete-filme/:id
```

### Autenticação

Necessária + administrador.

### Descrição

Remove um filme do sistema.

---

# ⭐ Avaliações

## 📌 Criar avaliação

### Endpoint

```http
POST /filmes/list-filme/:id/create-avaliacao
```

### Autenticação

Necessária.

### Descrição

Cria uma avaliação para um filme.

### Body

```json
{
  "nota": 9,
  "comentario": "Excelente filme"
}
```

### Regras

* Nota deve estar entre 1 e 10.
* O usuário só pode avaliar um filme uma vez.

### Resposta

```json
{
  "nota": 9,
  "comentario": "Excelente filme",
  "filme_id": 1
}
```

---

## 📌 Atualizar avaliação

### Endpoint

```http
PUT /filmes/list-filme/:id/update-avaliacao
```

### Autenticação

Necessária.

### Descrição

Atualiza a avaliação do usuário autenticado.

### Funcionalidades

* Alteração da nota.
* Alteração do comentário.

### Regras

* A avaliação deve existir.
* Nota deve estar entre 1 e 10.

---

## 📌 Deletar avaliação

### Endpoint

```http
DELETE /filmes/list-filme/:id/delete-avaliacao
```

### Autenticação

Necessária.

### Descrição

Remove a avaliação do usuário autenticado.

---

## 📌 Listar avaliações de um filme

### Endpoint

```http
GET /filmes/list-filme/:id/list-avaliacao
```

### Autenticação

Necessária.

### Descrição

Retorna todas as avaliações do filme.

### Funcionalidades

* Retorna dados do usuário autor da avaliação.
* Ordena priorizando a avaliação do usuário autenticado.
* Ordena avaliações mais recentes primeiro.

### Resposta

```json
{
  "data": [
    {
      "id": 1,
      "filme_id": 1,
      "nota": 10,
      "comentario": "Ótimo filme",
      "usuario": {
        "id": 2,
        "user": "joao"
      }
    }
  ]
}
```

---

# 🧩 Middlewares

## 🔐 autentificador.js

Responsável por:

* Validar JWT.
* Descriptografar ID do usuário.
* Inserir dados do usuário na requisição.

---

## 👑 isAdmin.js

Responsável por:

* Validar se o usuário autenticado possui permissão administrativa.

---

## ✅ schemaValidator.js

Responsável por:

* Validar os dados recebidos.
* Utiliza schemas JSON.
* Retorna erros de validação.

---

# 🗄️ Banco de Dados

## Tabelas principais

### usuarios

Armazena:

* Usuários
* Emails
* Senhas criptografadas
* Permissões administrativas
* Código de recuperação

---

### filmes

Armazena:

* Filmes
* Capas
* Gêneros
* Sinopses
* Ano de lançamento

---

### avaliacoes

Armazena:

* Avaliações
* Nota
* Comentários
* Relação usuário-filme



