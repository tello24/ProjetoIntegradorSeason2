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
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Rotas
// app.get('/login', async (req, res) => {
//     try {
//         // Busca todos os usuários, mas omite o campo senha
//         const users = await User.find({});
//         const { email, senha } = req.body
//         res.json( users, email, senha ); // Retorna a lista de usuários
//     } catch (error) {
//         res.status(500).json({ error: 'Erro ao buscar usuários', details: error });
//     }
// });


// app.post('/login', async (req, res) => {
//     const { email, senha } = req.body;

//     if (!email || !senha) {
//         return res.status(400).json({ mensagem: "Email e senha são obrigatórios!" });
//     }

//     try {
//         const usuarioExiste = await User.findOne({ email });
//         if (!usuarioExiste) {
//             return res.status(401).json({ mensagem: "Email não encontrado." });
//         }

//         const senhaValida = await bcrypt.compare(senha, usuarioExiste.senha);
//         if (!senhaValida) {
//             return res.status(401).json({ mensagem: "Senha inválida!" });
//         }

//         res.status(200).json({
//             mensagem: "Login realizado com sucesso!",
//             nome: usuarioExiste.nome,
//             email: usuarioExiste.email,
//         });
//     } catch (error) {
//         console.error('Erro no login:', error);
//         res.status(500).json({ mensagem: "Erro no servidor.", details: error.message });
//     }
// });

app.post('/Login', async (req, res) => {

    const email = req.body.email
    const senha = req.body.senha

    const usuarioExiste = await User.findOne({ email: email })
    if (!usuarioExiste) {
        return res.status(401).json({ mensagem: "Email inválido" })
    }

    const senhaValida = await bcrypt.compare (senha, usuarioExiste.senha)
    if (!senhaValida) {
        return res.status(401).json({ mensagem: "Senha inválida" })
    }

    const token = jwt.sign (
        { email: usuarioExiste.email },
        "1234",
        { expiresIn: "1h" }
    )
    res.status(200).json({ token: token })

})


// Iniciar o servidor e conectar ao MongoDB
app.listen(8000, async () => {
    await conectarAoMongo();
    console.log("Servidor rodando na porta 8000");
});
