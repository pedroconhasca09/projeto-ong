/**
 * Responsabilidade:
 * Persistência e recuperação de dados utilizando localStorage.
 */

const STORAGE_KEYS = {
  draft: 'ong-cadastro-rascunho',
  submissions: 'ong-cadastro-historico'
};

/**
 * Salva o rascunho do formulário.
 *
 * @param {Object} draft
 */
export function saveDraft(draft) {
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

/**
 * Recupera o rascunho salvo.
 *
 * @returns {Object|null}
 */
export function loadDraft() {
  try {
    const storedDraft = localStorage.getItem(
      STORAGE_KEYS.draft
    );

    if (!storedDraft) {
      return null;
    }

    return JSON.parse(storedDraft);
  } catch (error) {
    console.error(
      'Não foi possível recuperar o rascunho.',
      error
    );

    return null;
  }
}

/**
 * Remove o rascunho armazenado.
 */
export function clearDraft() {
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
}

/**
 * Recupera o histórico de cadastros.
 *
 * @returns {Array}
 */
export function getSubmissions() {
  try {
    const storedSubmissions =
      localStorage.getItem(
        STORAGE_KEYS.submissions
      );

    if (!storedSubmissions) {
      return [];
    }

    const submissions =
      JSON.parse(storedSubmissions);

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

/**
 * Adiciona um novo cadastro ao histórico.
 *
 * @param {Object} submission
 */
export function saveSubmission(submission) {
  const submissions = getSubmissions();

  submissions.push(submission);

  /*
   * Mantém somente os 10 registros
   * mais recentes.
   */
  const latestSubmissions =
    submissions.slice(-10);

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

/**
 * Remove todo o histórico de cadastros.
 */
export function clearSubmissions() {
  try {
    localStorage.removeItem(
      STORAGE_KEYS.submissions
    );
  } catch (error) {
    console.error(
      'Não foi possível remover o histórico.',
      error
    );
  }
}