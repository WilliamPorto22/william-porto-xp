document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contatoForm');
  const successDiv = document.getElementById('successMessage');
  const telInput = document.getElementById('telefone');

  // Pré-compila padrões de máscara para não recriar regex a cada input
  const fullPattern  = /^(\d{2})(\d{5})(\d{4})$/;
  const shortPattern = /^(\d{2})(\d{4})(\d{4})$/;

  // Máscara de telefone
  telInput.addEventListener('input', ({ target }) => {
    let digits = target.value.replace(/\D/g, '').slice(0, 11);
    let formatted = digits;

    if (digits.length > 2) {
      const area = digits.slice(0, 2);
      const rest = digits.slice(2);
      // Celular (11 dígitos)
      if (digits.length === 11 && fullPattern.test(digits)) {
        formatted = `(${area}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
      }
      // Telefone fixo (10 dígitos)
      else if (digits.length === 10 && shortPattern.test(digits)) {
        formatted = `(${area}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
      }
      // Enquanto o usuário digita
      else {
        formatted = `(${area}) ${rest}`;
      }
    }

    target.value = formatted;
  });

  // Intercepta o submit, envia via fetch e mostra a mensagem de sucesso
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (response.ok) {
        // esconde o form e exibe a div de sucesso
        form.hidden = true;
        successDiv.hidden = false;
      } else {
        const data = await response.json();
        alert(data.message || 'Erro ao enviar. Tente novamente.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão. Tente mais tarde.');
    }
  });
});
