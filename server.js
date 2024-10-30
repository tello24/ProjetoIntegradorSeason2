import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
async function conectarAoMongo() {
    try {
        await mongoose.connect('mongodb+srv://projetoseason2:12345@projetoseason2.arthu.mongodb.net/projetoseason2?retryWrites=true&w=majority&appName=projetoseason2', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conexão com MongoDB estabelecida");
    } catch (error) {
        console.error('Erro de conexão com o MongoDB:', error);
    }
}

// Modelo do Usuário
const userSchema = new mongoose.Schema({
    login: { type: String, required: true },
    senha: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Rotas
app.get('/login', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários', details: error });
    }
});

app.post('/login', async (req, res) => {
    const { login, senha } = req.body;

    try {
        const novoUsuario = new User({ login, senha });
        await novoUsuario.save();
        res.json(novoUsuario);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar usuário', details: error });
    }
});

// Iniciar o servidor e conectar ao MongoDB
app.listen(8000, async () => {
    await conectarAoMongo();
    console.log("Servidor rodando na porta 8000");
});
