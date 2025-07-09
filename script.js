// script.js
document.addEventListener('DOMContentLoaded', () => {
  const form       = document.getElementById('contatoForm');
  const successDiv = document.getElementById('successMessage');
  const telInput   = document.getElementById('telefone');

  // Máscara de telefone
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

  // Ao submeter, esconde o form e mostra a mensagem
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    form.style.display = 'none';
    successDiv.style.display = 'block';
    this.submit(); // envia para o iframe oculto sem reload de página
  });
});
