const form = document.getElementById("contatoForm");
const statusDiv = document.getElementById("mensagemStatus");
const campoTelefone = document.getElementById("telefone");

campoTelefone.addEventListener("input", function (e) {

    let valor = e.target.value.replace(/\D/g, '').slice(0, 11);

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

form.addEventListener("submit", function (e) {

    e.preventDefault(); 

    fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
    })
        .then((response) => {

            if (response.ok) {
                statusDiv.textContent = "Mensagem enviada com sucesso!";
                statusDiv.className = "sucesso";
                form.reset();

            } else {

                response.json().then(data => {
                    statusDiv.textContent = data.message || "Erro ao enviar. Tente novamente.";
                    statusDiv.className = "erro";
                });

            }

        })

        .catch(() => {
            statusDiv.textContent = "Erro de conexão. Tente mais tarde.";
            statusDiv.className = "erro";
        });

});