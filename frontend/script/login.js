const protocolo = 'http://';
const baseURL = 'localhost:8000';
const loginEndPoint = '/login';

// async function verificaLogin() {
//     // Pega os valores dos inputs de login e senha
//     const email = document.getElementById('email').value;
//     const senha = document.getElementById('psw').value;

//     const URLCompleta = `${protocolo}${baseURL}${loginEndPoint}`;

//     try {
//         // Faz uma requisição ao endpoint de login (que retorna todos os usuários)
//         const response = await axios.get(URLCompleta);
//         const usuarios = response.data; // Isso é um array de usuários

//         // Log para verificar o que a API está retornando
//         console.log('Usuários retornados:', usuarios); // <-- Adicione esta linha aqui

//         // Verifica se existe um usuário com as credenciais fornecidas
//         const usuarioValido = usuarios.find(user => user.email === email && user.senha === senha);

//         if (usuarioValido) {
//             console.log('Login aceito');
//         } else {
//             console.log('Login ou senha incorretos');
//         }
//     } catch (error) {
//         console.error('Erro ao verificar o login:', error);
//     }
// }

const verificaLogin = async () => {

    let loginEmailInput = document.getElementById("email")
    loginEmail = loginEmailInput.value

    let loginSenhaInput = document.getElementById("senha")
    loginSenha = loginSenhaInput.value


    if (loginEmail && loginSenha) {

        try {
            const URLCompleta = `${protocolo}${baseURL}${loginEndPoint}`;
            const response = await axios.post(
                URLCompleta,
                { email: loginEmail, senha: loginSenha }
            )

            localStorage.setItem("token", response.data)

            loginEmailInput.value = ""
            loginSenhaInput.value = ""

            alert("Login Realizado com sucesso!!")
            // const cadastrarFilmeButton = document.querySelector('#cadastrarFilmeButton')
            // cadastrarFilmeButton.disabled = false
            // const loginLink = document.querySelector("#loginLink")
            // loginLink.innerHTML = 'Logout'

        }
        catch (e) {
            alert("Falha na Autenticação")
        }
    }
    else {
        alert("Preencha todos os campos!!!")
    }

}

let count = 1
document.getElementById("radio1").checked = true

setInterval(function () {
    nextImage()
}, 4000)

function nextImage() {
    count++
    if (count > 4) {
        count = 1
    }

    document.getElementById("radio" + count).checked = true

}

document.addEventListener('DOMContentLoaded', function () {
    const logo = document.getElementById('header-logo');
    const lista = document.querySelector('.lista');

    logo.addEventListener('click', function () {
        lista.classList.toggle('visible');
    });
});