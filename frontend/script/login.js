const protocolo = 'http://';
const baseURL = 'localhost:3002';
const loginEndPoint = '/login';

async function verificaLogin() {
    // Pega os valores dos inputs de login e senha
    const login = document.getElementById('login').value;
    const psw = document.getElementById('psw').value;

    const URLCompleta = `${protocolo}${baseURL}${loginEndPoint}`;

    try {
        // Faz uma requisição ao endpoint de login (que retorna todos os usuários)
        const response = await axios.get(URLCompleta);
        const usuarios = response.data; // Isso é um array de usuários

        // Log para verificar o que a API está retornando
        console.log('Usuários retornados:', usuarios); // <-- Adicione esta linha aqui

        // Verifica se existe um usuário com as credenciais fornecidas
        const usuarioValido = usuarios.find(user => user.login === login && user.psw === psw);

        if (usuarioValido) {
            console.log('Login aceito');
        } else {
            console.log('Login ou senha incorretos');
        }
    } catch (error) {
        console.error('Erro ao verificar o login:', error);
    }
}

let count = 1
document.getElementById("radio1").checked = true

setInterval(function() {
    nextImage()
}, 4000)

function nextImage() {
    count ++
    if( count > 4 ) {
        count = 1
    }

    document.getElementById("radio" + count).checked = true

}

document.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('header-logo');
    const lista = document.querySelector('.lista');

    logo.addEventListener('click', function() {
        lista.classList.toggle('visible');
    });
});