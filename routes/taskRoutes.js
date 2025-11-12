const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/taskController');

function validar(req, res, next) {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return res.status(422).json({ erros: erros.array() });
  next();
}

router.post('/',
  body('title').notEmpty().withMessage('Título é obrigatório'),
  validar,
  controller.criar
);

router.get('/', controller.listar);
router.get('/:id', param('id').isInt(), validar, controller.buscar);
router.put('/:id', param('id').isInt(), validar, controller.atualizar);
router.patch('/:id/status', param('id').isInt(), body('status').notEmpty(), validar, controller.atualizarStatus);
router.delete('/:id', param('id').isInt(), validar, controller.deletar);

module.exports = router;