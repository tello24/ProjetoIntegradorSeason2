import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

mongoose.connection.on('connected', () => {
    console.log('Conectado ao MongoDB com sucesso');
});

mongoose.connection.on('error', (err) => {
    console.error('Erro na conexão com o MongoDB:', err.message);
});


// Modelo do Usuário
const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Rotas
app.get('/login', async (req, res) => {
    try {
        // Busca todos os usuários, mas omite o campo senha
        const users = await User.find({}, { senha: 0 });
        res.json(users); // Retorna a lista de usuários
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários', details: error });
    }
});


app.post('/cadastrar', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const novoUsuario = new User({ nome, email, senha });
        const resultado = await novoUsuario.save();
        console.log("Usuário criado com sucesso:", resultado);
        res.json(resultado);
    } catch (error) {
        console.error("Erro ao salvar o usuário:", error.message);
        res.status(400).json({ error: 'Erro ao criar usuário', details: error.message });
    }
});


// Iniciar o servidor e conectar ao MongoDB
app.listen(8000, async () => {
    await conectarAoMongo();
    console.log("Servidor rodando na porta 8000");
});
