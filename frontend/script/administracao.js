document.addEventListener('DOMContentLoaded', () => {
    const cadastrarButton = document.querySelector('.card-cadastro button');

    cadastrarButton.addEventListener('click', async () => {
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        if (!nome || !email || !senha) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const usuarioData = {
            nome: nome,
            email: email,
            senha: senha
        };

        try {
            const response = await fetch('http://localhost:8000/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioData)
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
});
