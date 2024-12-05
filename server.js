import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(cors());


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


const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true }
});


const TextoSchema = new mongoose.Schema({
    texto: { type: String, required: true },
    criadoEm: { type: Date, default: Date.now }
});

const Texto = mongoose.model('Texto', TextoSchema);

const User = mongoose.model('User', userSchema);


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

app.get('/logins', async (req, res) => {
    try {
        const usuarios = await User.find({}, 'nome email');
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
});


app.delete('/usuario', async (req, res) => {
    const { email } = req.body;  

    if (!email) {
        return res.status(400).json({ error: 'O e-mail é obrigatório.' });
    }

    try {
        const usuarioDeletado = await User.findOneAndDelete({ email });
        if (!usuarioDeletado) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.status(200).json({ mensagem: 'Usuário excluído com sucesso.' });
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
});



app.listen(8000, async () => {
    await conectarAoMongo();
    console.log("Servidor rodando na porta 8000");
});


app.put('/editar-texto', async (req, res) => {
    const { texto } = req.body;
  
    if (!texto) {
      return res.status(400).json({ error: 'Texto não pode estar vazio.' });
    }
  
    try {
      
      const textoExistente = await Texto.findOne();
      if (textoExistente) {
        textoExistente.texto = texto;  
        await textoExistente.save();  
        res.status(200).json({ mensagem: 'Texto atualizado com sucesso!' });
      } else {
        
        const novoTexto = new Texto({ texto });
        const textoSalvo = await novoTexto.save();
        res.status(201).json({ mensagem: 'Texto salvo com sucesso!', texto: textoSalvo });
      }
    } catch (error) {
      console.error('Erro ao salvar texto:', error);
      res.status(500).json({ error: 'Erro ao salvar texto.' });
    }
  });
  

app.get('/buscar-texto', async (req, res) => {
    try {
        const texto = await Texto.findOne(); 
        
        if (texto) {
            return res.status(200).json({ texto: texto.texto });
        } else {
            return res.status(404).json({ error: 'Texto não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao obter texto:', error);
        return res.status(500).json({ error: 'Erro ao buscar o texto.' });
    }
});

