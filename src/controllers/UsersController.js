class UserController{
    create(request, response) {
        const {name, email, password} = request.body

        response.status(201).json({name, email, password})
    }
};

// Exportando
module.exports = UserController;