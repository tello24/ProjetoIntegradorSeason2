async function prepararPagina() {
    const token = localStorage.getItem("token");

    if (token) {
        // Decodificar o token para extrair informações
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));

        // Verifique se os elementos existem antes de manipulá-los
        const loginButton = document.querySelector('#paginaAdministracao');
        const sairButton = document.querySelector('#sairButton');

        if (loginButton) {
            loginButton.style.display = 'block';
        }

        if (sairButton) {
            sairButton.style.display = 'block';
        }

        console.log(`Usuário logado: ${payload.email}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    prepararPagina(); // Certifica-se de que a página foi carregada antes de chamar a função
});

document.addEventListener('DOMContentLoaded', () => {
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

    // Preparar a página ao carregar
    prepararPagina();
});
