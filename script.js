// Seleção de elementos
const form               = document.getElementById("contatoForm");
const statusDivSuccess   = document.getElementById("successMessage");
const statusDivError     = document.getElementById("erroMessage");
const campoTelefone      = document.getElementById("telefone");

// Máscara de telefone
campoTelefone.addEventListener("input", function (e) {
  let valor = e.target.value.replace(/\D/g, "").slice(0, 11);

  if (valor.length >= 2) {
    valor = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
  }
  if (valor.length >= 10) {
    valor = valor.replace(/^(\(\d{2}\))\s?(\d{5})(\d{4})$/, "$1 $2-$3");
  } else if (valor.length >= 9) {
    valor = valor.replace(/^(\(\d{2}\))\s?(\d{4})(\d{4})$/, "$1 $2-$3");
  }

  e.target.value = valor;
});

// Função para exibir modal por 15 segundos
function showModal(el) {
  el.classList.add("show");
  setTimeout(() => {
    el.classList.remove("show");
  }, 15000);
}

// Tratamento de submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  fetch(form.action, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new FormData(form),
  })
    .then((response) => {
      if (response.ok) {
        showModal(statusDivSuccess);
        statusDivError.classList.remove("show");
        form.reset();
      } else {
        showModal(statusDivError);
        statusDivSuccess.classList.remove("show");
      }
    })
    .catch(() => {
      showModal(statusDivError);
      statusDivSuccess.classList.remove("show");
    });
});
