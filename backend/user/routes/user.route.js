// Donde estarán mis rutas del modulo usuarios 

// Aquí se llama al controlador, SIEMPRE no al servicio.

import { Router } from 'express'

const userController = require('../controller/user.controller')

const userRoutes = Router()

userRoutes.get('/users', userController.getUsers)

userRoutes.post('/user', userController.saveUsers)

userRoutes.put('/user/:id', userController.updateUser(req.params.id))

userRoutes.delete('/delete-user/:id', userController.deleteUser(req.params.id))

export default userRoutes