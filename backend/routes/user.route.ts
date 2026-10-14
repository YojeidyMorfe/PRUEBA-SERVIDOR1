import { Router } from 'express';
import userController from '../user/controller/user.controller';

const router = Router();

router.get('/', userController.getUsers);
router.post('/', userController.saveUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;