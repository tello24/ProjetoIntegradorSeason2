import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())


let user = [
    {
        "login": "teste",
        "psw": "teste"
    }
]
// teste

app.get('/login', (req, res) => {
    res.json(user)
})

app.post('/login', (req, res) => {
    const login = req.body.login
    const senha = req.body.senha

    const novo_login = {
        login: login,
        senha: senha
    }

    user.push(novo_login)

    res.json(user)
})

app.listen(3002, () => {
    console.log("server up and running")
})