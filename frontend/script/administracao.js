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

document.addEventListener('DOMContentLoaded', () => {
    prepararPagina(); // Certifica-se de que a página foi carregada antes de chamar a função
    carregarUsuarios();

    const daltonismoSelect = document.getElementById('daltonismo-select');

    // Recupera a configuração de daltonismo salva
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
            // Salva a configuração de daltonismo no localStorage
            localStorage.setItem('daltonismoClass', selectedValue);
        } else {
            // Remove a configuração se nenhuma opção estiver selecionada
            localStorage.removeItem('daltonismoClass');
        }
    });

    const cadastrarButton = document.querySelector('.card-cadastro button');
    const sairButton = document.querySelector('#sairButton');

    // Cadastro de usuário
    cadastrarButton.addEventListener('click', async () => {
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

            if (response.ok) {
                const usuarioCadastrado = await response.json();
                alert(`Usuário ${usuarioCadastrado.nome} cadastrado com sucesso!`);
                document.getElementById('nome').value = '';
                document.getElementById('email').value = '';
                document.getElementById('senha').value = '';
            } else {
                const errorData = await response.json();
                alert(`Erro ao cadastrar usuário: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Erro ao cadastrar o usuário:", error);
            alert("Erro ao conectar com o servidor.");
        }
    });


    async function carregarUsuarios() {
        try {
            const response = await fetch('http://localhost:8000/logins');
            
            if (!response.ok) {
                throw new Error('Erro ao buscar os usuários');
            }
    
            const usuarios = await response.json();
            
            // Seleciona o elemento onde os usuários serão exibidos
            const usuariosFiltrados = document.querySelector('.usuarios-filtrados');
            
            if (!usuariosFiltrados) {
                console.error("Elemento .usuarios-filtrados não encontrado.");
                return;
            }
    
            usuariosFiltrados.innerHTML = ''; // Limpa o conteúdo anterior
    
            // Adiciona os usuários ao DOM
            usuarios.forEach((usuario) => {
                const card = document.createElement('div');
                card.classList.add('card-filtrado'); // Estilo para o card de usuário
    
                // Monta o conteúdo do card
                card.innerHTML = `
                    <p>Nome: ${usuario.nome}</p>
                    <p>Email: ${usuario.email}</p>
                    <div class="buttons-card-filtrado">
                        <div class="botao-verde">
                            <button type="button" class="botao-verde">Editar</button>
                        </div>
                        <div class="botao-vermelho">
                            <button type="button" class="botao-vermelho">Remover</button>
                        </div>
                    </div>
                `;
    
                // Adiciona o card ao container
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
            window.location.href = './../pages/paginaLogin.html'; // Redireciona para a página de login
        }
    });
});