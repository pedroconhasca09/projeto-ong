/**
 * Responsabilidade:
 * Validação dos campos e feedback visual ao usuário.
 */

/**
 * Remove o estado de erro de um campo.
 *
 * @param {HTMLElement} field
 */
export function removeFieldError(field) {
  const wrapper = field.closest('.field');

  if (!wrapper) {
    return;
  }

  wrapper.classList.remove('is-invalid');

  const error = wrapper.querySelector('.field-error');

  if (error) {
    error.remove();
  }

  field.removeAttribute('aria-invalid');
  field.removeAttribute('aria-describedby');
}

/**
 * Exibe uma mensagem de erro associada ao campo.
 *
 * @param {HTMLElement} field
 * @param {string} message
 */
export function showFieldError(field, message) {
  const wrapper = field.closest('.field');

  if (!wrapper) {
    return;
  }

  removeFieldError(field);

  wrapper.classList.add('is-invalid');

  field.setAttribute(
    'aria-invalid',
    'true'
  );

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

/**
 * Valida individualmente um campo.
 *
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} field
 * @returns {boolean}
 */
export function validateField(field) {
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

/**
 * Valida todos os campos do formulário.
 *
 * @param {HTMLElement[]} fields
 * @returns {{
 *   valid: boolean,
 *   firstInvalidField: HTMLElement|null
 * }}
 */
export function validateAllFields(fields) {
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