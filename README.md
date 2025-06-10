# Componentes Da Equipe
Arthur Andrade Silva - RA: 12724119792

Antônio Roberto Garrido Rodrigues Filho - RA: 1272419745

Eduardo de Andrade do Bomfim Júnior - RA: 12724142791

Mari Alessandra Santana De Sousa - RA: 1272418409

Valentin Eduardo Carvalho Bispo dos Santos - RA: 1272415745




# 🍽️ API de Reservas - Projeto Xavier

API para gerenciamento de **reservas de mesas** em um restaurante, utilizando **Node.js**, **Express** e **PostgreSQL**.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL

---

## 📦 Requisitos

Antes de rodar o projeto, certifique-se de que:

- **Node.js** está instalado (v18+ recomendado)
- **PostgreSQL** está instalado e o comando `psql` disponível no terminal
- A variável de ambiente `PASSWORD_DB` está definida corretamente(Coloque sua senha definida no postgress) no arquivo `.env` (que deve ser criado e ficar na raiz do projeto), desta maneira:

```
PASSWORD_DB=COLOQUE_SUA_SENHA_DO_PG4_AQUI
```

> **Atenção:** o banco `mydb` será criado automaticamente ao rodar o script de desenvolvimento, se não existir.

---

## 🧪 Rodando o Projeto

1. **Clone o repositório**:

```bash
git clone https://github.com/AlphaLab2025/SmartMesa.git
```

```bash
cd SmartMesa
```

2. **Instale as dependencias**:
```
npm install
```

3.   **Crie o arquivo .env na raiz do projeto e coloque essa variável:**
```
PASSWORD_DB=SUA_SENHA_AQUI
```
**COLOQUE A SUA SENHA CRIADA NO MOMENTO DA INSTALAÇÃO DO POSTGRESS**

4. **Crie o Banco de dados:**

### SQL
```
npm run initDb
```
Este comando irá:

- Criar o banco mydb (se não existir)

- Criar as tabelas do banco

- Popular com 12 mesas

- Popular com 3 funcionários

### **Inicie a api do projeto:**:

```
npm start
```


## 🧪 Estrutura do Projeto
```
SMARTMESA/
├── controller/
│   ├── garcomController.js
│   ├── gerenteController.js
│   ├── mesaController.js
│   ├── reservaController.js
│   └── usuariosController.js
├── model/
│   ├── db.js
│   └── mydb.sql
├── node_modules/
├── routes/
│   ├── atendente.js
│   ├── garcom.js
│   ├── gerente.js
│   ├── mesa.js
│   └── usuarios.js
├── scripts/
│   ├── createDb.js
│   └── createPg.js
├── .env
├── .gitignore
├── api.js
├── comentario.txt
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

## 🛠 Scripts Úteis
| Comando              | Descrição                                                 |
| -------------------- | --------------------------------------------------------- |
| `npm run initDb`     | Cria o banco PostgreSQL `mydb`                            |
| `npm start`          | Execute a api do projeto e abre as telas                  |

- Sim, basta editar a variável PASSWORD_DB no .env.

## 👥 Perfis de Usuário

- Atendente: Visualiza mesas e reservas

- Garçom: Registra pedidos por mesa

- Gerente: Gerencia reservas e usuários

## 💬 Comunicação entre Componentes

A comunicação entre frontend e backend é realizada via requisições HTTP (REST), escolhida por:

- 📦 Simplicidade e escalabilidade: REST é amplamente suportado e bem documentado

- ⚙️ Separação de responsabilidades: permite desacoplar o frontend do backend

- 🔌 Fácil integração: compatível com web, mobile e sistemas administrativos

## ❓ Dúvidas Frequentes

### 💡 O banco não está sendo criado. O que pode ser?

Verifique se o psql está instalado e configurado no PATH

Teste com o comando: psql --version

### 💡 Posso mudar a senha do PostgreSQL?

Sim, basta editar o valor da variável PASSWORD_DB no arquivo .env

### 📄 Licença

Este projeto está licenciado sob a MIT License. Consulte o arquivo LICENSE para mais informações.

### 🔗 Links

Repositório no GitHub: github.com/AlphaLab2025/SmartMesa
