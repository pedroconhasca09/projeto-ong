
document.addEventListener('DOMContentLoaded', () => {
  const onlyDigits = value => value.replace(/\D/g, '');

  const cpf = document.querySelector('#cpf');
  const telefone = document.querySelector('#telefone');
  const cep = document.querySelector('#cep');

  if (cpf) cpf.addEventListener('input', e => {
    let v = onlyDigits(e.target.value).slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = v;
  });
  if (telefone) telefone.addEventListener('input', e => {
    let v = onlyDigits(e.target.value).slice(0, 11);
    if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
    else v = v.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');
    e.target.value = v;
  });
  if (cep) cep.addEventListener('input', e => {
    let v = onlyDigits(e.target.value).slice(0, 8);
    v = v.replace(/(\d{5})(\d{1,3})$/, '$1-$2');
    e.target.value = v;
  });

  const form = document.querySelector('#cadastro-form');
  const status = document.querySelector('#form-status');
  if (form && status) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      status.hidden = false;
      status.textContent = 'Cadastro validado com sucesso. Seus dados estão prontos para envio ao servidor.';
      form.reset();
    });
  }
});
