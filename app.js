require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/tasks', taskRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('🚀 API To-Do List está rodando!');
});

const PORT = process.env.PORT || 3000;

console.log('🔄 Iniciando servidor...');
console.log('📊 Porta:', PORT);

// Iniciar servidor
const startServer = async () => {
  try {
    // Testar banco de dados
    await sequelize.authenticate();
    console.log('✅ Conexão com SQLite estabelecida');
    
    // Sincronizar modelos
    await sequelize.sync();
    console.log('✅ Tabelas sincronizadas');
    
    // Iniciar servidor HTTP - MUDANÇA AQUI: usando '0.0.0.0'
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📍 Local: http://localhost:${PORT}`);
      console.log(`🌐 Network: http://127.0.0.1:${PORT}`);
      console.log(`📋 API: http://localhost:${PORT}/tasks`);
    });
    
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error.message);
    process.exit(1);
  }
};

// Iniciar aplicação
startServer();