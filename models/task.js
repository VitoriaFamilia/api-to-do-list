const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('pendente', 'em_andamento', 'concluida'),
    defaultValue: 'pendente'
  },
  dueDate: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'tasks'
});

module.exports = Task;