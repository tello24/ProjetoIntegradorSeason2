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

async function salvarTexto(id) {
  const textoElement = document.querySelector(`[data-id="${id}"]`);

  if (!textoElement) {
    alert('Texto não encontrado!');
    return;
  }

  const textoEditado = textoElement.innerText;

  if (!textoEditado) {
    alert('Texto não pode estar vazio!');
    return;
  }

  try {
    const response = await fetch(`http://localhost:8000/atualizar-texto/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ texto: textoEditado })
    });

<<<<<<< HEAD
    const data = await response.json();

    if (response.ok) {
      alert(data.mensagem);
    } else {
      alert(`Erro ao atualizar texto: ${data.error}`);
=======
      if (response.ok) {
        alert(data.mensagem);
        location.reload();
      } else {
        alert(`Erro ao salvar texto: ${data.error}`);
      }
    } catch (error) {
      console.error('Erro ao salvar texto:', error);
      alert('Erro ao conectar ao servidor.');
>>>>>>> 9a4d1485ee0a6830c1553fc181dc51798552dd7a
    }
  } catch (error) {
    console.error('Erro ao salvar texto:', error);
    alert('Erro ao conectar ao servidor.');
  }
}

document.addEventListener('DOMContentLoaded', function () {
<<<<<<< HEAD
  prepararPagina(); // Certifica-se de que a página foi carregada antes de chamar a função
  carregarTextosDoServidor();
=======
  prepararPagina(); 
  carregarTextoDoServidor();
>>>>>>> 9a4d1485ee0a6830c1553fc181dc51798552dd7a

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

  async function carregarTextosDoServidor() {
    try {
      const response = await fetch('http://localhost:8000/buscar-textos', {
        method: 'GET'
      });
  
      if (response.ok) {
        const data = await response.json();
<<<<<<< HEAD
  
        // Para cada texto, crie um novo elemento na página
        const container = document.querySelector('#textosContainer');
        container.innerHTML = ''; // Limpa o conteúdo anterior
  
        data.forEach((texto) => {
          const div = document.createElement('div');
          div.classList.add('editable');
          div.setAttribute('contenteditable', 'true');
          div.dataset.id = texto._id; // Armazena o ID do texto
  
          div.innerText = texto.texto;
          container.appendChild(div);
        });
=======
        const editableElement = document.querySelector('.editable');
        editableElement.innerText = data.texto; 
>>>>>>> 9a4d1485ee0a6830c1553fc181dc51798552dd7a
      } else {
        alert('Erro ao carregar os textos do servidor');
      }
    } catch (error) {
      console.error('Erro ao carregar textos:', error);
      alert('Erro ao conectar ao servidor.');
    }
  }
  
});