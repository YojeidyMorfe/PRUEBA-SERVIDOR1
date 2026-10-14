import { Request, Response } from 'express';
import userService from '../service/user.service';

class UserController {
    getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await userService.findAll();
        return res.status(200).json({ success: true, data: users });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

    saveUsers = async (req: Request, res: Response): Promise<Response> => {
        try {
            const userDto = await userService.save(req.body);
            return res.status(201).json({ 
                mensaje: "Usuario creado exitosamente", 
                usuario: userDto 
            });
        } catch (error: any) {
            return res.status(400).json({ success: false, error: error.message });
        }
    }

    updateUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const user = await userService.update(String(req.params.id), req.body);
            return res.status(200).json({ success: true, data: user });
        } catch (error: any) {
            return res.status(400).json({ success: false, error: error.message });
        }
    }

    deleteUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const result = await userService.delete(String(req.params.id));
            return res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            return res.status(404).json({ success: false, error: error.message });
        }
    }
}

export default new UserController();