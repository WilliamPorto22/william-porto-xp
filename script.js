const form = document.getElementById("contatoForm");
const statusDivSucces = document.getElementById("successMessage");
const statusDivError = document.getElementById("erroMessage");
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
                statusDivSucces.style.display = "block";
                statusDivError.style.display = "none";
                form.reset();

            } else {

                response.json().then(data => {
                  statusDivSucces.style.display = "none";
                  statusDivError.style.display = "block";
                });

            }

        })

        .catch(() => {
            statusDivSucces.style.display = "none";
            statusDivError.style.display = "block";
        });

});
