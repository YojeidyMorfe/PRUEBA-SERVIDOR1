import express from 'express';
import 'dotenv/config';
import { AppDataSource } from './config/db.config.js';
import User from './user/model/user.model.js';
import { validateCreateUserDto } from './user/dto/create-user.dto.js';
import { createUserInterface } from './user/interfaces/user.interface.js';
import { validateUpdateUserDto } from './user/dto/update-user.dto.js';


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        const repo = AppDataSource.getRepository(User);
        const usuarios = await repo.find();
        const respuesta = usuarios.map(u => createUserInterface(u));
        res.json(respuesta);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

app.post('/users', async (req, res) => {
    try {
        const { isValid, errors, data } = validateCreateUserDto(req.body);

        if (!isValid) {
            return res.status(400).json({ mensaje: "Error de validación", errores: errors });
        }

        const repo = AppDataSource.getRepository(User);
        const nuevoUsuario = repo.create(data);
        await repo.save(nuevoUsuario);

        res.status(201).json({
            mensaje: "Usuario creado exitosamente",
            usuario: createUserInterface(nuevoUsuario)
        });
    } catch (error) {
        console.error("❌ ERROR DETALLADO AL CREAR:", error);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
});


app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        
        const { isValid, errors, data } = validateUpdateUserDto(req.body);

        if (!isValid) {
            return res.status(400).json({ mensaje: "Error de validación", errores: errors });
        }

        const repo = AppDataSource.getRepository(User);

        
        const usuario = await repo.findOneBy({ id: parseInt(id) });
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

       
        repo.merge(usuario, data);
        const usuarioActualizado = await repo.save(usuario);

      
        res.json({
            mensaje: "Usuario actualizado exitosamente",
            usuario: createUserInterface(usuarioActualizado)
        });
    } catch (error) {
        console.error("❌ Error al actualizar:", error);
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
});


app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(User);

        
        const usuario = await repo.findOneBy({ id: parseInt(id) });
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

       
        await repo.remove(usuario);

        res.json({
            mensaje: `Usuario con ID ${id} eliminado exitosamente`
        });
    } catch (error) {
        console.error("❌ Error al eliminar:", error);
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
});

AppDataSource.initialize()
    .then(() => {
        console.log("⚡ Conectado a Neon");
        app.listen(PORT, () => {
            console.log(`🚀 Servidor en http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.error("❌ Error de conexión:", err));