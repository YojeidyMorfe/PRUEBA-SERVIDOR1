import { AppDataSource } from '../../config/db.config';
import User from '../model/user.model';
import { UserDto } from '../../persona/user.dto';

class UserService {
    private repo() {
        return AppDataSource.getRepository(User);
    }

    async findAll(): Promise<UserDto[]> {
        console.log("🔍 [SERVICE] Entró a findAll, buscando usuarios en la BD...");
        const users = await this.repo().find();
        console.log("🔍 [SERVICE] Usuarios encontrados crudos:", users);
        
        
        const mappedUsers = users.map(user => new UserDto(user));
        console.log("[SERVICE] Usuarios ya mapeados por DTO:", mappedUsers);
        
        return mappedUsers;
    }

    async save(data: any): Promise<UserDto> {
        const repository = this.repo();
        const newUser = repository.create(data);
        const savedUser = await repository.save(newUser);
        return new UserDto(savedUser);
    }

    async update(id: string | number, data: any): Promise<UserDto> {
        const repository = this.repo();
        const user = await repository.findOneBy({ id: Number(id) });
        if (!user) throw new Error("Usuario no encontrado");

        repository.merge(user, data);
        const updatedUser = await repository.save(user);
        return new UserDto(updatedUser);
    }

    async delete(id: string | number): Promise<{ message: string }> {
        const repository = this.repo();
        const user = await repository.findOneBy({ id: Number(id) });
        if (!user) throw new Error("Usuario no encontrado");

        await repository.remove(user);
        return { message: `Usuario con ID ${id} eliminado` };
    }
}

export default new UserService();