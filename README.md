# 🎬 PS-Comp Back & Front

Projeto full stack desenvolvido para gerenciamento de filmes, utilizando um back-end em Node.js com banco de dados relacional e um front-end em React para consumo da API.

O sistema permite autenticação de usuários, gerenciamento de filmes e integração com upload de imagens utilizando Cloudinary.

---

# 📚 Tecnologias Utilizadas

## Back-end

* Node.js
* Express.js
* Sequelize
* MySQL
* JWT (JSON Web Token)
* Multer
* Cloudinary
* Nodemailer
* bcryptjs
* Docker

## Front-end

* React
* Vite
* React Router DOM
* Redux Toolkit
* React Redux
* React Icons
* ESLint

---

# 📁 Estrutura do Projeto

```bash
PS-Comp-Back-Front-
├── back/                 # API e regras de negócio
├── front/                # Interface web em React
├── docker-compose.yml    # Configuração Docker
└── README.md
```

---

# ⚙️ Pré-requisitos

Antes de executar o projeto, é necessário possuir instalado:

* Node.js 16 ou superior
* NPM
* MySQL
* Docker e Docker Compose (opcional)
* Git

---

# 🚀 Como Executar o Projeto

## 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd PS-Comp-Back-Front-
```

---

# 🔧 Configuração do Back-end

## 📦 Instalando dependências

Entre na pasta do back-end:

```bash
cd back
npm install
```

---

## 🛠️ Variáveis de Ambiente

Crie um arquivo `.env` dentro da pasta `back/` contendo:

```env
PORT=3001
DIALECT=mysql
HOST=localhost
DB_USERNAME=root
PASSWORD=root
DATABASE=ps_comp
DB_PORT=3306
SECRET=seu_secret_jwt
HASH_BCRYPT=sua_hash

CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=seu_email
EMAIL_PASS=sua_senha_email
```

---

## ▶️ Executando o Back-end

Ainda dentro da pasta `back/`, execute:

```bash
npm start
```

O servidor será iniciado em:

```bash
http://localhost:3001
```

---

# 🖥️ Configuração do Front-end

## 📦 Instalando dependências

Abra outro terminal e entre na pasta do front-end:

```bash
cd front
npm install
```

---

## ▶️ Executando o Front-end

Dentro da pasta `front/`, execute:

```bash
npm run dev
```

O front-end será iniciado em:

```bash
http://localhost:5173
```

---

# 🐳 Executando com Docker (Recomendado)

Na raiz do projeto execute:

```bash
docker-compose up --build
```
É provavel que ocorra um problema semelhante a este:

```bash
cinerate_db     | 2026-05-24T23:27:54.538719Z 0 [System] [MY-010931] [Server] 
/usr/sbin/mysqld: ready for connections. Version: '8.4.8'  socket: 
'/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
```

onde o back roda antes do banco de dados (mesmo colocando como dependente do banco),
neste caso rode este comando novamente:

```bash
docker-compose up
```

---

# 📦 Dependências Utilizadas

# 🔙 Back-end

## Frameworks e Bibliotecas

* Express.js → Criação da API REST
* Sequelize → ORM para banco de dados
* MySQL2 → Driver do MySQL
* JWT → Autenticação por token
* bcryptjs → Criptografia de senhas
* Multer → Upload de arquivos
* Cloudinary → Armazenamento de imagens
* multer-storage-cloudinary → Integração Multer + Cloudinary
* Nodemailer → Envio de emails
* dotenv → Gerenciamento de variáveis de ambiente
* cors → Comunicação entre front-end e back-end
* jsonschema → Validação de schemas JSON
* nodemon → Reinicialização automática do servidor durante desenvolvimento

---

# 🎨 Front-end

## Frameworks e Bibliotecas

* React → Biblioteca principal da interface
* Vite → Ferramenta de build e desenvolvimento
* React Router DOM → Gerenciamento de rotas
* Redux Toolkit → Gerenciamento global de estado
* React Redux → Integração Redux com React
* React Icons → Biblioteca de ícones
* ESLint → Padronização e análise de código

---

# 🔐 Funcionalidades

## Autenticação

* Registro de usuários
* Login de usuários
* Validação de token JWT
* Criptografia de senhas

## Filmes

* Cadastro de filmes
* Atualização de filmes
* Remoção de filmes
* Listagem de filmes
* Upload de capa utilizando Cloudinary

## Avaliações

* Cadastro de avaliações
* Atualização de avaliações
* Remoção de avaliações
* Listagem de avaliações

---

# ⚠️ Possíveis Problemas

## Erro relacionado ao Docker e CRLF

Caso apareça um erro semelhante a:

```bash
/usr/bin/env: 'bash\r': No such file or directory
```

Altere o formato de quebra de linha do arquivo no VSCode:

```bash
CRLF → LF
```

Isso ocorre porque o Docker utiliza ambiente Linux.

---

# 👨‍💻 Desenvolvido com

* Node.js
* React
* MySQL
* Docker
