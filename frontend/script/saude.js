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

document.addEventListener('DOMContentLoaded', function () {
  prepararPagina(); 

  const daltonismoSelect = document.getElementById('daltonismo-select');

  
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
      
          localStorage.setItem('daltonismoClass', selectedValue);
      } else {
          
          localStorage.removeItem('daltonismoClass');
      }
  });
});