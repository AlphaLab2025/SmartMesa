# 🍽️ API de Reservas - Projeto Xavier

API para gerenciamento de **reservas de mesas** em um restaurante, utilizando **Node.js**, **Express**, **PostgreSQL** e **Prisma ORM**.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- Prisma ORM

---

## 📦 Requisitos

Antes de rodar o projeto, certifique-se de que:

- **Node.js** está instalado (v18+ recomendado)
- **PostgreSQL** está instalado e o comando `psql` disponível no terminal
- A variável de ambiente `DATABASE_URL` está definida corretamente(Coloque sua senha definida no postgress) no arquivo `.env`, por exemplo:


DATABASE_URL="postgresql://postgres:"SUA-SENHA-DO-POSTGRESS"@localhost:5432/mydb" 

- Coloque também a sua senha definida no postgress no arquivo createDb.js, dentro da pasta scripts:

const config = {
  user: 'postgres',
  host: 'localhost',
  password: 'SUA-SENHA-DO-POSTGRESS', // Substitua pela sua senha real sua_senha_aqui
  port: 5432,
  database: 'postgres'
};

> **Atenção:** o banco `mydb` será criado automaticamente ao rodar o script de desenvolvimento, se não existir.

---

## 🧪 Rodando o Projeto

1. **Clone o repositório**:

```bash
git clone https://github.com/seu-usuario/projeto-xavier-api.git
cd projeto-xavier-api
```

2. **Instale as dependencias**:

npm install

3. **Inicie o projeto em modo desenvolvimento:**:
npm run dev

Este comando irá:

-Criar o banco mydb (se não existir)

-Gerar o client Prisma

-Aplicar o schema no banco

-Popular com 12 mesas via seed

-Abrir o Prisma Studio (interface visual para o banco)

 **Após rodar esse comando ele te mostrará as tabelas do banco e seus dados em uma tela, partindo deste ponto se quiser continuar utilizando essa interface visual e não a do próprio postgress crie um outro terminal e continue o passo a passo, caso contrário aperte ctrl + c para parar a execuão do comando anterior e dar prosseguimento ao passo a passo :**

3. **Inicie a api do projeto:**:
npm start


## 🧪 Estrutura do Projeto
.
├── prisma/
│   ├── schema.prisma     # Definição das tabelas e enums
│   └── seed.js           # Script de seed para gerar mesas
├── scripts/
│   └── createDb.js       # Criação automática do banco PostgreSQL
├── controller/
│   └── reservaController.js
├── generated/
│   └── prisma/           # Client Prisma gerado automaticamente
├── api.js                # Ponto de entrada da API
└── package.json


## 🛠 Scripts Úteis
| Comando              | Descrição                                                 |
| -------------------- | --------------------------------------------------------- |
| `npm run dev`        | Cria o banco, aplica o schema, roda o seed e inicia a API |
| `npm run create-db`  | Cria o banco PostgreSQL `mydb`                            |
| `npx prisma studio`  | Abre o Prisma Studio (visualização do banco)              |
| `npx prisma db push` | Aplica o schema do Prisma ao banco                        |
| `npx prisma db seed` | Executa o script de seed                                  |


## ❓ Dúvidas 
💡 O banco não está sendo criado. O que pode ser?

Verifique se o psql está instalado e configurado no PATH. Rode psql --version no terminal para testar se ele está instalado corretamente.

💡 Posso mudar o nome do banco ou a senha do PostgreSQL?

Sim, basta editar a variável DATABASE_URL no .env.