const app = require("../server")
const UserService = require("../services/UserService")

const userService = new UserService()

app.post('/api/user/createUser', async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body)
        
        res.send(newUser)
    }
    catch(e) {
        console.error(e)
    }
})

app.get('/api/user/getUsers', async (req, res) => {
    try {
        const users = await userService.getUsers()
        res.send(users)
    }
    catch(e) {
        console.error(e)
    }
})

app.get('/api/user/getUserById', async (req, res) => {
    try {
        const user = await userService.getUserById({id: req.query.id})

        res.send({user})
    }
    catch(e) {
        console.error(e)
    }
})

app.delete('/api/user/delete', async (req, res) => {
    try {
        if(await userService.isExist({id: req.query.id})) {
            await userService.deleteUser({id: req.query.id})
            res.send({answer: `User ${req.query.id} was deleted`})
        }
        else res.send({answer: `User ${req.query.id} not found`})
    }
    catch(e) {
        console.error(e)
    }
})