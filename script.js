// script.js
document.addEventListener('DOMContentLoaded', () => {
  const form       = document.getElementById('contatoForm');
  const successDiv = document.getElementById('successMessage');
  const telInput   = document.getElementById('telefone');

  // Máscaras para telefone: (00) 00000-0000 ou (00) 0000-0000
  const fullPattern  = /^(\d{2})(\d{5})(\d{4})$/;
  const shortPattern = /^(\d{2})(\d{4})(\d{4})$/;

  telInput.addEventListener('input', ({ target }) => {
    const digits = target.value.replace(/\D/g, '').slice(0, 11);
    let formatted = digits;

    if (digits.length === 11 && fullPattern.test(digits)) {
      formatted = `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
    } else if (digits.length === 10 && shortPattern.test(digits)) {
      formatted = `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`;
    } else if (digits.length > 2) {
      formatted = `(${digits.slice(0,2)}) ${digits.slice(2)}`;
    }

    target.value = formatted;
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // não recarrega a página

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
      });

      if (response.ok) {
        // limpa campos (se quiser resetar)
        form.reset();
        // esconde o formulário e mostra a div de sucesso
        form.hidden       = true;
        successDiv.hidden = false;
      } else {
        // tenta ler mensagem de erro do servidor
        let msg = 'Erro ao enviar. Tente novamente.';
        try {
          const data = await response.json();
          msg = data.message || msg;
        } catch {}
        alert(msg);
      }
    } catch {
      alert('Erro de conexão. Verifique sua internet e tente novamente.');
    }
  });
});
