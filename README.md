# ✅ To-Do List API

API REST construída em **Node.js** com **Express** e **Sequelize**, para gerenciar tarefas (CRUD completo + atualização de status).

## 🚀 Tecnologias
- Node.js  
- Express  
- Sequelize (SQLite)  
- Dotenv  
- Express Validator

## 📦 Instalação
```bash
npm install
npm run dev
```

## ⚙️ Endpoints
| Método | Rota | Descrição |
|--------|------|------------|
| POST | `/tasks` | Cria nova tarefa |
| GET | `/tasks` | Lista todas as tarefas |
| GET | `/tasks/:id` | Busca tarefa por ID |
| PUT | `/tasks/:id` | Atualiza título/descrição/data |
| PATCH | `/tasks/:id/status` | Atualiza status |
| DELETE | `/tasks/:id` | Exclui tarefa |

## 🧠 Status possíveis
- pendente  
- em_andamento  
- concluida
