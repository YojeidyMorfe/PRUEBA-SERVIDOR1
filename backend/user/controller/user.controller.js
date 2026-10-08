import userService from '../service/user.service'

class userController {
    async getUsers(req, res) {
        try {
            const getUsers = await userService.findByAll()
            return res.status(200).json({
                success: true,
                data: getUsers
            })
        } catch (error) {
            console.log(error)
        }
    }
    async saveUsers(req, res) {
        try {
            const user = await userService.save(req.body)
            return res.status(201).json({
                success: true,
                data: user
            })
        } catch (error) {
            console.log(error)
        }
    }
    async updateUser(req, res) {
        try {
            //desestructuración de objetos
            const { id,
                name,
                edad,
                telefono } = req.params;
            const user = await userService.update(id, req.body)
            return res.status(200).json({
                success: true,
                data: user
            })
        } catch (error) {
            console.log(error)
        }
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.delete(id)
            return res.status(200).json({
                success: true,
                data: user
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default userController
