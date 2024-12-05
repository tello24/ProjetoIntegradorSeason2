async function prepararPagina() {
  const token = localStorage.getItem('token');
  const loginLink = document.querySelector('#loginLink');
  const loginButton = document.querySelector('#paginaAdministracao');
  const editableElement = document.querySelector('.editable')
  const saveButton = document.querySelector('#saveButton');

  if (token) {
    loginButton.style.display = 'block';
    loginLink.innerHTML = 'Sair';
    editableElement.setAttribute('contenteditable', 'true')
    saveButton.style.display = 'block'
  } else {
    loginButton.style.display = 'none';
    loginLink.innerHTML = 'Login';
    editableElement.setAttribute('contenteditable', 'false')
    saveButton.style.display = 'none'
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

async function salvarTexto() {
  const editableElement = document.querySelector('.editable');

  if (!editableElement) {
    alert('Elemento editável não encontrado!');
    return;
  }

  if (editableElement.getAttribute('contenteditable') === 'true') {
    const editedText = editableElement.innerText;

    try {
      const response = await fetch('http://localhost:8000/editar-texto', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ texto: editedText })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.mensagem);
        location.reload();
      } else {
        alert(`Erro ao salvar texto: ${data.error}`);
      }
    } catch (error) {
      console.error('Erro ao salvar texto:', error);
      alert('Erro ao conectar ao servidor.');
    }
  } else {
    alert('Você não tem permissão para salvar este texto.');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  prepararPagina(); 
  carregarTextoDoServidor();

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

  async function carregarTextoDoServidor() {
    try {
      const response = await fetch('http://localhost:8000/buscar-texto', {
        method: 'GET'
      });
  
      if (response.ok) {
        const data = await response.json();
        const editableElement = document.querySelector('.editable');
        editableElement.innerText = data.texto; 
      } else {
        alert('Erro ao carregar o texto do servidor');
      }
    } catch (error) {
      console.error('Erro ao buscar o texto:', error);
      alert('Erro ao conectar ao servidor.');
    }
  }
  
});