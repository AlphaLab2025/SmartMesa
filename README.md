# SmartMesa

Sistema distribuído para gerenciamento de reservas de mesas em restaurantes, com suporte a múltiplos papéis: atendente, garçom e gerente.

---

# Tecnológias Utilizadas

Backend (API de Reservas)

•	Node.js 

•	npm 

•	PostgreSQL 

•	Bibliotecas Node.js utilizadas:

    o	express – Framework para API REST
    o	@prisma/client – Cliente ORM Prisma
    o	sqlite3, mysql2, pg – Adaptadores de banco de dados
    o	prisma – ORM para gerenciamento de schema e migrations
     
Frontend

• HTML5

• CSS3

---

##  Requisitos de Software Necessários

Antes de rodar o projeto, certifique-se de que:

- **Node.js** está instalado (v18+ recomendado)
- **PostgreSQL** está instalado e o comando `psql` disponível no terminal
- A variável de ambiente `DATABASE_URL` está definida corretamente(Coloque sua senha definida no postgress) no arquivo `.env` (que deve ser criado e ficar na raiz do projeto), desta maneira:

```
DATABASE_URL="postgresql://postgres:SUA-SENHA-DO-POSTGRESS@localhost:5432/mydb" 
```
- Coloque também a sua senha definida no postgress no arquivo createDb.js e no createPg.js, dentro da pasta scripts:
```
const config = {
  user: 'postgres',
  host: 'localhost',
  password: 'SUA-SENHA-DO-POSTGRESS',  Substitua pela sua senha real sua_senha_aqui
  port: 5432,
  database: 'postgres'
};
```
> **Atenção:** o banco `mydb` será criado automaticamente ao rodar o script de desenvolvimento, se não existir.

---

##  Rodando o Projeto

1. **Clone o repositório**:

```bash
git clone https://github.com/seu-usuario/projeto-xavier-api.git
cd projeto-xavier-api
```

2. **Instale as dependencias**:
```
npm install
```

3.   **Crie o arquivo .env na raiz do projeto e coloque essa url:**
```
DATABASE_URL="postgresql://postgres:"SUA-SENHA-DO-POSTGRESS"@localhost:5432/mydb" 
```
**SUBSTITUINDO SUA-SENHA-DO-POSTGRESS PELA SUA SENHA CRIADA NO MOMENTO DA INSTALAÇÃO DO POSTGRESS**

4. **Crie o Banco de dados:**
**Atenção: é possível criar o banco utilizando sql que é o padrão(porém o usuário só poderá visualizar as tabelas por meio do pgAdmin4) Ou utilizando o prisma para gerar as tabelas**

### SQL
```
npm run initdb
```
Este comando irá:

-criar o banco mydb (se não existir)

-Criar as tabelas do banco

-Popular com 12 mesas

-Popular com 3 funcionários

### Prisma
```
npm run initPrisma
```

Este comando irá:

-Criar o banco mydb (se não existir)

-Gerar o client Prisma

-Aplicar o schema no banco

-Popular com 12 mesas via seed

-Popular com 3 funcionarios

-Abrir o Prisma Studio (interface visual para o banco)

 **Após rodar esse comando ele te mostrará as tabelas do banco e seus dados em uma tela, partindo deste ponto se quiser continuar utilizando essa interface visual e não a do próprio postgress crie um outro terminal e continue o passo a passo, caso contrário aperte ctrl + c para parar a execuão do comando anterior e dar prosseguimento ao passo a passo :**

3. **Inicie a api do projeto:**:
npm start


##  Estrutura do Projeto

```
SMARTMESA/
├── controller/
│   ├── garcomController.js
│   ├── gerenteController.js
│   ├── mesaController.js
│   ├── reservaController.js
│   └── usuariosController.js
├── generated/
├── model/
│   ├── db.js
│   └── mydb.sql
├── node_modules/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
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


##  Scripts Úteis

| Comando              | Descrição                                                 |
| -------------------- | --------------------------------------------------------- |
| `npm run initDb`     | Cria o banco PostgreSQL `mydb`                            |
| `npx prisma studio`  | Abre o Prisma Studio (visualização do banco)              |
| `npx prisma db push` | Aplica o schema do Prisma ao banco                        |
| `npx prisma db seed` | Executa o script de seed                                  |


##  Dúvidas 

 O banco não está sendo criado. O que pode ser?

Verifique se o psql está instalado e configurado no PATH. Rode psql --version no terminal para testar se ele está instalado corretamente.

 Posso mudar o nome do banco ou a senha do PostgreSQL?

Sim, basta editar a variável DATABASE_URL no .env.

---

# Perfis de Usuário

•	Atendente: Visualização geral de mesas e reservas

•	Garçom: Registro de pedidos por mesa

•	Gerente: Controle e gerenciamento das reservas e dos usuários

# Justificativa para a Comunicação Escolhida

Comunicação entre Componentes
A comunicação entre frontend e backend é feita via requisições HTTP REST. Essa abordagem foi escolhida por:

•	Simplicidade e escalabilidade: REST é amplamente utilizado e bem suportado.

•	Separação de responsabilidades: permite desacoplar completamente o frontend do backend.

•	Fácil integração: com outras interfaces, como mobile ou dashboards administrativos.

# Licença
Este projeto está licenciado sob a MIT License. Consulte o arquivo LICENSE para mais detalhes.

# Links
Repositório no GitHub: github.com/AlphaLab2025/SmartMesa





