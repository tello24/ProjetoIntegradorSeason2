function mostrarLista() {
    const lista = document.getElementById("minhaLista");
  
    // Verifica se a lista está visível e alterna a visibilidade
    if (lista.style.display === "none") {
      lista.style.display = "flex";
    } else {
      lista.style.display = "none";
    }
  }
  