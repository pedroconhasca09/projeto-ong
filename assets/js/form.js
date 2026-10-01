document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEYS = {
    draft: 'ong-cadastro-rascunho',
    submissions: 'ong-cadastro-historico'
  };

  const form = document.querySelector('#cadastro-form');
  const status = document.querySelector('#form-status');
  const historyList = document.querySelector('#historico-list');
  const clearHistoryButton = document.querySelector('#limpar-historico');

  if (!form) return;

  const cpf = document.querySelector('#cpf');
  const telefone = document.querySelector('#telefone');
  const cep = document.querySelector('#cep');

  const fields = Array.from(
    form.querySelectorAll('input, select, textarea')
  ).filter(field => field.name);

  const onlyDigits = value => value.replace(/\D/g, '');

  function formatCpf(value) {
    let v = onlyDigits(value).slice(0, 11);

    v = v
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return v;
  }

  function formatTelefone(value) {
    let v = onlyDigits(value).slice(0, 11);

    if (v.length > 10) {
      v = v.replace(
        /(\d{2})(\d{5})(\d{1,4})/,
        '($1) $2-$3'
      );
    } else {
      v = v.replace(
        /(\d{2})(\d{4})(\d{1,4})/,
        '($1) $2-$3'
      );
    }

    return v;
  }

  function formatCep(value) {
    let v = onlyDigits(value).slice(0, 8);

    return v.replace(
      /(\d{5})(\d{1,3})$/,
      '$1-$2'
    );
  }

  /*
   * =========================================================
   * VALIDAÇÃO VISUAL
   * =========================================================
   */

  function removeFieldError(field) {
    const wrapper = field.closest('.field');

    if (!wrapper) return;

    wrapper.classList.remove('is-invalid');

    const error = wrapper.querySelector('.field-error');

    if (error) {
      error.remove();
    }

    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
  }

  function showFieldError(field, message) {
    const wrapper = field.closest('.field');

    if (!wrapper) return;

    removeFieldError(field);

    wrapper.classList.add('is-invalid');
    field.setAttribute('aria-invalid', 'true');

    const error = document.createElement('small');

    error.className = 'field-error';
    error.id = `${field.id}-error`;
    error.textContent = message;

    field.setAttribute(
      'aria-describedby',
      error.id
    );

    wrapper.appendChild(error);
  }

  function validateField(field) {
    removeFieldError(field);

    if (field.validity.valueMissing) {
      showFieldError(
        field,
        'Este campo é obrigatório.'
      );

      return false;
    }

    if (field.validity.typeMismatch) {
      showFieldError(
        field,
        'Digite um e-mail válido.'
      );

      return false;
    }

    if (field.validity.patternMismatch) {
      showFieldError(
        field,
        field.title || 'Formato inválido.'
      );

      return false;
    }

    return true;
  }

  function validateAllFields() {
    let valid = true;
    let firstInvalidField = null;

    fields.forEach(field => {
      const fieldValid = validateField(field);

      if (!fieldValid) {
        valid = false;

        if (!firstInvalidField) {
          firstInvalidField = field;
        }
      }
    });

    return {
      valid,
      firstInvalidField
    };
  }

  /*
   * =========================================================
   * LOCAL STORAGE
   * =========================================================
   */

  function saveDraft() {
    const draft = {};

    fields.forEach(field => {
      draft[field.name] = field.value;
    });

    try {
      localStorage.setItem(
        STORAGE_KEYS.draft,
        JSON.stringify(draft)
      );
    } catch (error) {
      console.error(
        'Não foi possível salvar o rascunho.',
        error
      );
    }
  }

  function loadDraft() {
    try {
      const savedDraft = localStorage.getItem(
        STORAGE_KEYS.draft
      );

      if (!savedDraft) return;

      const draft = JSON.parse(savedDraft);

      fields.forEach(field => {
        if (
          Object.prototype.hasOwnProperty.call(
            draft,
            field.name
          )
        ) {
          field.value = draft[field.name];
        }
      });

      if (cpf) {
        cpf.value = formatCpf(cpf.value);
      }

      if (telefone) {
        telefone.value = formatTelefone(
          telefone.value
        );
      }

      if (cep) {
        cep.value = formatCep(cep.value);
      }

      showStatus(
        'Rascunho restaurado. Você pode continuar o preenchimento.',
        'info'
      );
    } catch (error) {
      console.error(
        'Não foi possível recuperar o rascunho.',
        error
      );
    }
  }

  function getSubmissions() {
    try {
      const stored = localStorage.getItem(
        STORAGE_KEYS.submissions
      );

      if (!stored) return [];

      const submissions = JSON.parse(stored);

      return Array.isArray(submissions)
        ? submissions
        : [];
    } catch (error) {
      console.error(
        'Não foi possível recuperar o histórico.',
        error
      );

      return [];
    }
  }

  function saveSubmission(data) {
    const submissions = getSubmissions();

    submissions.push(data);

    /*
     * Mantém somente os 10 registros mais recentes.
     */
    const latestSubmissions = submissions.slice(-10);

    try {
      localStorage.setItem(
        STORAGE_KEYS.submissions,
        JSON.stringify(latestSubmissions)
      );
    } catch (error) {
      console.error(
        'Não foi possível salvar o cadastro.',
        error
      );
    }
  }

  /*
   * =========================================================
   * STATUS
   * =========================================================
   */

  function showStatus(message, type = 'success') {
    if (!status) return;

    status.hidden = false;
    status.textContent = message;

    status.classList.remove(
      'status-success',
      'status-info',
      'status-error'
    );

    status.classList.add(`status-${type}`);
  }

  /*
   * =========================================================
   * HISTÓRICO
   * =========================================================
   */

  function renderHistory() {
    if (!historyList) return;

    const submissions = getSubmissions();

    historyList.innerHTML = '';

    if (submissions.length === 0) {
      const emptyMessage = document.createElement('li');

      emptyMessage.className = 'history-empty';
      emptyMessage.textContent =
        'Nenhum cadastro realizado neste navegador.';

      historyList.appendChild(emptyMessage);

      return;
    }

    submissions
      .slice()
      .reverse()
      .forEach(submission => {
        const item = document.createElement('li');

        item.className = 'history-item';

        const name = document.createElement('strong');
        name.textContent = submission.nome;

        const details = document.createElement('span');

        details.textContent =
          `${submission.email} • ` +
          `${submission.interesse} • ` +
          `${submission.dataCadastro}`;

        item.appendChild(name);
        item.appendChild(details);

        historyList.appendChild(item);
      });
  }

  /*
   * =========================================================
   * MÁSCARAS
   * =========================================================
   */

  if (cpf) {
    cpf.addEventListener('input', event => {
      event.target.value = formatCpf(
        event.target.value
      );

      saveDraft();

      if (event.target.dataset.touched === 'true') {
        validateField(event.target);
      }
    });
  }

  if (telefone) {
    telefone.addEventListener('input', event => {
      event.target.value = formatTelefone(
        event.target.value
      );

      saveDraft();

      if (event.target.dataset.touched === 'true') {
        validateField(event.target);
      }
    });
  }

  if (cep) {
    cep.addEventListener('input', event => {
      event.target.value = formatCep(
        event.target.value
      );

      saveDraft();

      if (event.target.dataset.touched === 'true') {
        validateField(event.target);
      }
    });
  }

  /*
   * =========================================================
   * EVENTO INPUT
   * =========================================================
   */

  fields.forEach(field => {
    field.addEventListener('input', () => {
      field.dataset.touched = 'true';

      saveDraft();

      validateField(field);
    });

    field.addEventListener('change', () => {
      field.dataset.touched = 'true';

      saveDraft();

      validateField(field);
    });

    field.addEventListener('blur', () => {
      field.dataset.touched = 'true';

      validateField(field);
    });
  });

  /*
   * =========================================================
   * SUBMIT
   * =========================================================
   */

  form.addEventListener('submit', event => {
    event.preventDefault();

    const validation = validateAllFields();

    if (!validation.valid) {
      showStatus(
        'Revise os campos destacados antes de continuar.',
        'error'
      );

      if (validation.firstInvalidField) {
        validation.firstInvalidField.focus();
      }

      return;
    }

    const formData = new FormData(form);

    const cadastro = {
      nome: formData.get('nome'),
      cpf: formData.get('cpf'),
      nascimento: formData.get('nascimento'),
      email: formData.get('email'),
      telefone: formData.get('telefone'),
      cep: formData.get('cep'),
      cidade: formData.get('cidade'),
      estado: formData.get('estado'),
      endereco: formData.get('endereco'),
      interesse: formData.get('interesse'),
      mensagem: formData.get('mensagem'),
      dataCadastro: new Date().toLocaleString(
        'pt-BR'
      )
    };

    saveSubmission(cadastro);

    try {
      localStorage.removeItem(
        STORAGE_KEYS.draft
      );
    } catch (error) {
      console.error(
        'Não foi possível remover o rascunho.',
        error
      );
    }

    form.reset();

    fields.forEach(field => {
      field.dataset.touched = 'false';
      removeFieldError(field);
    });

    showStatus(
      'Cadastro realizado com sucesso! Os dados foram salvos neste navegador.',
      'success'
    );

    renderHistory();
  });

  /*
   * =========================================================
   * LIMPAR HISTÓRICO
   * =========================================================
   */

  if (clearHistoryButton) {
    clearHistoryButton.addEventListener(
      'click',
      () => {
        localStorage.removeItem(
          STORAGE_KEYS.submissions
        );

        renderHistory();

        showStatus(
          'Histórico de cadastros removido deste navegador.',
          'info'
        );
      }
    );
  }

  /*
   * =========================================================
   * INICIALIZAÇÃO
   * =========================================================
   */

  loadDraft();
  renderHistory();
});