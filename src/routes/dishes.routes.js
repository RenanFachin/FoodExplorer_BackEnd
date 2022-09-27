// Importando
const { Router } = require('express');

// Importando e Instanciando o controller
const DishesController = require('../controllers/DishesController');

// Inicializando
const dishesRoutes = Router();

const dishesController = new DishesController();

// Rotas
// Não é preciso usar mais o '/users' só a '/' já funciona
// Não é preciso passar (request, response) só o método que tem dentro da controller
dishesRoutes.post('/', dishesController.create);
dishesRoutes.get('/:id', dishesController.show);
dishesRoutes.delete('/:id', dishesController.delete)

// Exportando
module.exports = dishesRoutes;