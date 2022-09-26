exports.up = knex => knex.schema.createTable("favoriteDishes", table => {

    table.increments("fav_id");

    table.integer("user_id").references("id").inTable("users"); // Id do usuário
    table.integer("dish_id").references("id").inTable("dishes"); // Id do prato

});


exports.down = knex => knex.schema.dropTable("favoriteDishes");