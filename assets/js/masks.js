/**
 * Responsabilidade:
 * Formatação e máscaras dos campos do formulário.
 */

/**
 * Remove todos os caracteres que não sejam números.
 *
 * @param {string} value
 * @returns {string}
 */
export function onlyDigits(value) {
  return value.replace(/\D/g, '');
}

/**
 * Aplica máscara de CPF.
 *
 * Formato: 000.000.000-00
 *
 * @param {string} value
 * @returns {string}
 */
export function formatCpf(value) {
  let formatted = onlyDigits(value).slice(0, 11);

  formatted = formatted
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  return formatted;
}

/**
 * Aplica máscara de telefone.
 *
 * Formatos:
 * (00) 0000-0000
 * (00) 00000-0000
 *
 * @param {string} value
 * @returns {string}
 */
export function formatTelefone(value) {
  let formatted = onlyDigits(value).slice(0, 11);

  if (formatted.length > 10) {
    formatted = formatted.replace(
      /(\d{2})(\d{5})(\d{1,4})/,
      '($1) $2-$3'
    );
  } else {
    formatted = formatted.replace(
      /(\d{2})(\d{4})(\d{1,4})/,
      '($1) $2-$3'
    );
  }

  return formatted;
}

/**
 * Aplica máscara de CEP.
 *
 * Formato: 00000-000
 *
 * @param {string} value
 * @returns {string}
 */
export function formatCep(value) {
  const formatted = onlyDigits(value).slice(0, 8);

  return formatted.replace(
    /(\d{5})(\d{1,3})$/,
    '$1-$2'
  );
}