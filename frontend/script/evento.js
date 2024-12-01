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

function mostrarLista() {
  const lista = document.getElementById("minhaLista");

  // Verifica se a lista está visível e alterna a visibilidade
  if (lista.style.display === "none") {
      lista.style.display = "flex";
  } else {
      lista.style.display = "none";
  }
}

const logout = () => {
  localStorage.removeItem('token');
  alert('Logout realizado com sucesso!');
  const loginLink = document.querySelector('#loginLink');
  loginLink.innerHTML = 'Login';
  const loginButton = document.querySelector('#paginaAdministracao');
  loginButton.style.display = 'none'; 
};

document.querySelector('#loginLink').addEventListener('click', function (e) {
  e.preventDefault();
  if (localStorage.getItem('token')) {
      logout();
  } else {
      window.location.href = '/login'; // Redireciona para a página de login
  }
});

document.addEventListener('DOMContentLoaded', function () {
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
});