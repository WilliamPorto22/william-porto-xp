// script.js
let submitted = false;

// Função chamada pelo iframe onload
function showSuccess() {
  document.getElementById('contatoForm').hidden     = true;
  document.getElementById('successMessage').hidden = false;
}

document.addEventListener('DOMContentLoaded', () => {
  const telInput = document.getElementById('telefone');

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
});
