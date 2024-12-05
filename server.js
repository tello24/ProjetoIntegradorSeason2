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

// Modelo para armazenar textos
const TextoSchema = new mongoose.Schema({
    texto: { type: String, required: true }
});

const Texto = mongoose.model('Texto', TextoSchema);

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
        const usuarios = await User.find({}, 'nome email');
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
});

// Endpoint para excluir usuários pelo e-mail
app.delete('/usuario', async (req, res) => {
    const { email } = req.body;  // Recebe o e-mail no corpo da requisição

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

// Endpoint para atualizar um texto existente
app.put('/atualizar-texto/:id', async (req, res) => {
    const { id } = req.params;
    const { texto } = req.body;
  
    if (!texto) {
      return res.status(400).json({ error: 'Texto não pode estar vazio.' });
    }
  
    try {
      const textoExistente = await Texto.findById(id);
  
      if (!textoExistente) {
        return res.status(404).json({ error: 'Texto não encontrado.' });
      }
  
      textoExistente.texto = texto;
      await textoExistente.save();
  
      res.status(200).json({ mensagem: 'Texto atualizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao atualizar texto:', error);
      res.status(500).json({ error: 'Erro ao atualizar texto.' });
    }
  });
  
  // Endpoint para buscar todos os textos
  app.get('/buscar-textos', async (req, res) => {
    try {
      const textos = await Texto.find();
      res.status(200).json(textos);
    } catch (error) {
      console.error('Erro ao buscar textos:', error);
      res.status(500).json({ error: 'Erro ao buscar textos.' });
    }
  });
  
  // Endpoint para buscar um texto específico
  app.get('/buscar-texto/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const texto = await Texto.findById(id);
      if (texto) {
        return res.status(200).json({ texto: texto.texto });
      } else {
        return res.status(404).json({ error: 'Texto não encontrado.' });
      }
    } catch (error) {
      console.error('Erro ao buscar texto:', error);
      return res.status(500).json({ error: 'Erro ao buscar o texto.' });
    }
  });


// Iniciar o servidor e conectar ao MongoDB
app.listen(8000, async () => {
    await conectarAoMongo();
    console.log("Servidor rodando na porta 8000");
});

