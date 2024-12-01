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
    }
}

document.addEventListener('DOMContentLoaded', () => {
    prepararPagina(); // Certifica-se de que a página foi carregada antes de chamar a função

    const daltonismoSelect = document.getElementById('daltonismo-select');

    // Recupera a configuração de daltonismo salva
    const savedDaltonismo = localStorage.getItem('daltonismoClass');
    if (savedDaltonismo) {
        document.body.classList.add(savedDaltonismo);
        daltonismoSelect.value = savedDaltonismo;
    }

    daltonismoSelect.addEventListener('change', function() {
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

    // Logout
    sairButton.addEventListener('click', () => {
        localStorage.removeItem("token");
        alert("Logout realizado com sucesso!");
        document.querySelector('#paginaAdministracao').style.display = 'none';
        sairButton.style.display = 'none';
    });
});