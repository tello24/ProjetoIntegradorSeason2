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
        await mongoose.connect('mongodb+srv://projetoseason2:12345@projetoseason2.arthu.mongodb.net/projetoseason2?retryWrites=true&w=majority', {
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
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Endpoint para cadastro
app.post('/cadastrar', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const hashedSenha = await bcrypt.hash(senha, 10);
        const novoUsuario = new User({ nome, email, senha: hashedSenha });
        const usuarioSalvo = await novoUsuario.save();

        res.status(201).json({ nome: usuarioSalvo.nome, email: usuarioSalvo.email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao salvar o usuário.' });
    }
});

// Endpoint para login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    const usuarioExiste = await User.findOne({ email });
    if (!usuarioExiste) {
        return res.status(401).json({ mensagem: "Email inválido" });
    }

    const senhaValida = await bcrypt.compare(senha, usuarioExiste.senha);
    if (!senhaValida) {
        return res.status(401).json({ mensagem: "Senha inválida" });
    }

    const token = jwt.sign(
        { email: usuarioExiste.email },
        "1234",
        { expiresIn: "1h" }
    );

    res.status(200).json({ token });
});

// Endpoint para buscar usuários
app.get('/logins', async (req, res) => {
    try {
        // Exclui o campo senha dos resultados usando '-senha'
        const usuarios = await User.find({}, 'nome email'); // 'nome email' inclui apenas os campos nome e email
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
});



// Iniciar o servidor e conectar ao MongoDB
app.listen(8000, async () => {
    await conectarAoMongo();
    console.log("Servidor rodando na porta 8000");
});
