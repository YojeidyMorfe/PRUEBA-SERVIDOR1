import { AppDataSource } from '../../config/db.config'
import User from '../model/user.model'

class userService {
    getRepository() {
        return AppDataSource.getRepository(User)
    }

    async create(data) {
        const repository = this.getRepository(User)
        const user = await repository.save(data)
        return user
    }

    async update(id, data) {
        const repository = this.getRepository(User)
        const updatedUser = await repository.update(id, data)
        return updatedUser
    }

    async getAll() {
        const getUsers = await repository.findAll(User)
        return getUsers
    }

    async delete(id) {
        const deletedUser = await repository.delete(id)
        return deletedUser
    }
}

export default userService