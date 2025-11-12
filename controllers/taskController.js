const Task = require('../models/task');

module.exports = {
  async criar(req, res) {
    try {
      const { title, description, dueDate } = req.body;
      const tarefa = await Task.create({ title, description, dueDate });
      return res.status(201).json(tarefa);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
  },

  async listar(req, res) {
    try {
      const tarefas = await Task.findAll({ order: [['createdAt', 'DESC']] });
      res.json(tarefas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar tarefas' });
    }
  },

  async buscar(req, res) {
    try {
      const tarefa = await Task.findByPk(req.params.id);
      if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });
      res.json(tarefa);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar tarefa' });
    }
  },

  async atualizar(req, res) {
    try {
      const { title, description, dueDate } = req.body;
      const tarefa = await Task.findByPk(req.params.id);
      if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });

      tarefa.title = title ?? tarefa.title;
      tarefa.description = description ?? tarefa.description;
      tarefa.dueDate = dueDate ?? tarefa.dueDate;
      await tarefa.save();

      res.json(tarefa);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
  },

  async atualizarStatus(req, res) {
    try {
      const { status } = req.body;
      const tarefa = await Task.findByPk(req.params.id);
      if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });

      tarefa.status = status;
      await tarefa.save();

      res.json(tarefa);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar status' });
    }
  },

  async deletar(req, res) {
    try {
      const tarefa = await Task.findByPk(req.params.id);
      if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });

      await tarefa.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
  }
};