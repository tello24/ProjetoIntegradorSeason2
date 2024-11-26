async function prepararPagina() {
  const token = localStorage.getItem("token")

  if (token) {
      const loginButton = document.querySelector('#paginaAdministracao')
      loginButton.style.display = 'block' 
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
  