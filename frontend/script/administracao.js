async function prepararPagina() {
    const token = localStorage.getItem('token');
    const loginLink = document.querySelector('#loginLink');
    const loginButton = document.querySelector('#paginaAdministracao');

    if (token) {
        loginButton.style.display = 'block';
        loginLink.innerHTML = 'Sair';
    } else {
        loginButton.style.display = 'none';
        loginLink.innerHTML = 'Login';
        window.location.href = "./../pages/paginaLogin.html"
    }
}

// Cadastro de usuário
async function cadastrarUsuario() {
    console.log("Função cadastrarUsuario foi chamada");  // Adicione esse log

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (!nome || !email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const usuarioData = { nome, email, senha };

    try {
        const response = await fetch('http://localhost:8000/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioData),
        });

        console.log(response); 

        if (response.ok) {
            const usuarioCadastrado = await response.json();
            alert(`Usuário ${usuarioCadastrado.nome} cadastrado com sucesso!`);
            document.getElementById('nome').value = '';
            document.getElementById('email').value = '';
            document.getElementById('senha').value = '';
            location.reload();
        } else {
            const errorData = await response.json();
            alert(`Erro ao cadastrar usuário: ${errorData.error}`);
        }
    } catch (error) {
        console.error("Erro ao cadastrar o usuário:", error);
        alert("Erro ao conectar com o servidor.");
    }
}



async function excluirUsuario() {
    const usuarioExcluir = document.getElementById("exclui-email").value;

    if (!usuarioExcluir) {
        alert("Por favor, insira um e-mail para excluir.");
        return;
    }

     
     const confirmar = confirm(`Tem certeza que deseja excluir o usuário com e-mail: ${usuarioExcluir}?`);
     if (!confirmar) {
         return; 
     }

    try {
        const response = await fetch('http://localhost:8000/usuario', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: usuarioExcluir }), 
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.mensagem);  
            location.reload(); 
        } else {
            const errorData = await response.json();
            alert(`Erro ao excluir usuário: ${errorData.error}`);
        }
    } catch (error) {
        console.error("Erro ao excluir o usuário:", error);
        alert("Erro ao conectar com o servidor.");
    }
}



document.addEventListener('DOMContentLoaded', () => {
    prepararPagina(); 
    carregarUsuarios();

    const daltonismoSelect = document.getElementById('daltonismo-select');

    
    const savedDaltonismo = localStorage.getItem('daltonismoClass');
    if (savedDaltonismo) {
        document.body.classList.add(savedDaltonismo);
        daltonismoSelect.value = savedDaltonismo;
    }

    daltonismoSelect.addEventListener('change', function () {
        document.body.classList.remove('protanopia', 'deuteranopia', 'tritanopia');

        const selectedValue = daltonismoSelect.value;
        if (selectedValue) {
            document.body.classList.add(selectedValue);
            
            localStorage.setItem('daltonismoClass', selectedValue);
        } else {
            
            localStorage.removeItem('daltonismoClass');
        }
    });


    async function carregarUsuarios() {
        try {
            const response = await fetch('http://localhost:8000/logins');
            
            if (!response.ok) {
                throw new Error('Erro ao buscar os usuários');
            }
    
            const usuarios = await response.json();
            
            
            const usuariosFiltrados = document.querySelector('.usuarios-filtrados');
            
            if (!usuariosFiltrados) {
                console.error("Elemento .usuarios-filtrados não encontrado.");
                return;
            }
    
            usuariosFiltrados.innerHTML = ''; 
    
            
            usuarios.forEach((usuario) => {
                const card = document.createElement('div');
                card.classList.add('card-filtrado'); 
    
            
                card.innerHTML = `
                    <p>Nome: ${usuario.nome}</p>
                    <p>Email: ${usuario.email}</p>
                `;
    
                
                usuariosFiltrados.appendChild(card);
            });
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
            alert('Não foi possível carregar os usuários.');
        }
    }


    const logout = () => {
        localStorage.removeItem('token');
        alert('Logout realizado com sucesso!');
        const loginLink = document.querySelector('#loginLink');
        loginLink.innerHTML = 'Login';
        const loginButton = document.querySelector('#paginaAdministracao');
        loginButton.style.display = 'none';
        window.location.href = ("./../pages/paginaLogin.html")
    };

    document.querySelector('#loginLink').addEventListener('click', function (e) {
        e.preventDefault();
        if (localStorage.getItem('token')) {
            logout();
            window.location.href("./../pages/paginaLogin.html")
        } else {
            window.location.href = './../pages/paginaLogin.html'; 
        }
    });
});