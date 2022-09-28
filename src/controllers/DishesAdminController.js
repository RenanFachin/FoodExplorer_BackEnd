const knex = require ('../database/knex');
const AppError = require('../utils/AppError');

class DishesAdminController{
    async create(request, response) {
        // Parâmetros enviados pelo body
            const {title, description, category, image, price, ingredients} = request.body;
        
    
        // Conferência se o prato já existe no banco de dados
            const checkDishAlreadyExistInDatabase = await knex("dishes").where({title}).first();
    
            if(checkDishAlreadyExistInDatabase){
                throw new AppError("Este prato já existe em nossa database")
            }
    
            
        // Inserindo o prato e todos os seus dados
            const dish_id = await knex("dishes").insert({
                title,
                description,
                category,
                image,
                price
            });
            
        // Inserindo os ingredients passado no dish na tabela de ingredients
            const ingredientsInsert = ingredients.map(ingredient => {
                return{
                    name: ingredient,
                    dish_id
                }
            });
    
        await knex("ingredients").insert(ingredientsInsert)
    
        return response.status(201).json()
    
    }

    async delete(request, response){
        const { id } = request.params;

        await knex("dishes").where({ id }).delete();

        return response.status(204).json();
    }

    async update(request, response){
        // Capturando as informações passadas peloo body e por params
        const { title, description, category, image, price, ingredients } = request.body;
        const { id } = request.params;

        // Adicionando na constante dish o primeiro dado encontrado par ao id passado como params
        const dish = await knex("dishes").where({ id }).first();

        if(!dish){
            throw new AppError("O prato que você está tentando atualizar não existe")
        }

        // Verificação
        dish.title = title ?? dish.title;
        dish.description = description ?? dish.description;
        dish.category = category ?? dish.category;
        dish.image = image ?? dish.image;
        dish.price = price ?? dish.price;

        await knex("dishes").where({ id }).update(dish)
        await knex("dishes").where({ id }).update("updated_at", knex.fn.now())


        return response.status(202).json('Prato atualizado com sucesso')
    }
}

module.exports = DishesAdminController;