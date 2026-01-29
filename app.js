require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');

// ==================
// Middlewares
// ==================

// CORS – libera acesso do front (GitHub Pages)
app.use(cors({
  origin: '*', // pode trocar depois por https://vitoriafamilia.github.io
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Permitir JSON no body
app.use(express.json());

// ==================
// Rotas
// ==================
app.use('/tasks', taskRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('🚀 API To-Do List está rodando!');
});

const PORT = process.env.PORT || 3000;

console.log('🔄 Iniciando servidor...');
console.log('📊 Porta:', PORT);

// ==================
// Iniciar servidor
// ==================
const startServer = async () => {
  try {
    // Testar banco de dados
    await sequelize.authenticate();
    console.log('✅ Conexão com SQLite estabelecida');

    // Sincronizar modelos
    await sequelize.sync();
    console.log('✅ Tabelas sincronizadas');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📋 API: http://localhost:${PORT}/tasks`);
    });

  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error.message);
    process.exit(1);
  }
};

// Iniciar aplicação
startServer();
