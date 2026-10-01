import {
  formatCpf,
  formatTelefone,
  formatCep
} from './masks.js';

import {
  validateField,
  validateAllFields,
  removeFieldError
} from './validation.js';

import {
  saveDraft,
  loadDraft,
  clearDraft,
  getSubmissions,
  saveSubmission,
  clearSubmissions
} from './storage.js';


document.addEventListener(
  'DOMContentLoaded',
  () => {

    const form =
      document.querySelector('#cadastro-form');

    const status =
      document.querySelector('#form-status');

    const historyList =
      document.querySelector('#historico-list');

    const clearHistoryButton =
      document.querySelector('#limpar-historico');

    if (!form) {
      return;
    }


    /*
     * =====================================================
     * CAMPOS
     * =====================================================
     */

    const cpf =
      document.querySelector('#cpf');

    const telefone =
      document.querySelector('#telefone');

    const cep =
      document.querySelector('#cep');


    const fields = Array.from(
      form.querySelectorAll(
        'input, select, textarea'
      )
    ).filter(
      field => field.name
    );


    /*
     * =====================================================
     * STATUS
     * =====================================================
     */

    function showStatus(
      message,
      type = 'success'
    ) {

      if (!status) {
        return;
      }

      status.hidden = false;

      status.textContent = message;

      status.classList.remove(
        'status-success',
        'status-info',
        'status-error'
      );

      status.classList.add(
        `status-${type}`
      );
    }


    /*
     * =====================================================
     * FORMULÁRIO → OBJETO
     * =====================================================
     */

    function getFormData() {

      const data = {};

      fields.forEach(field => {
        data[field.name] =
          field.value;
      });

      return data;
    }


    /*
     * =====================================================
     * OBJETO → FORMULÁRIO
     * =====================================================
     */

    function restoreFormData(data) {

      if (!data) {
        return;
      }

      fields.forEach(field => {

        if (
          Object.prototype.hasOwnProperty.call(
            data,
            field.name
          )
        ) {

          field.value =
            data[field.name];

        }

      });

      /*
       * Reaplica as máscaras depois
       * da recuperação do localStorage.
       */

      if (cpf) {
        cpf.value =
          formatCpf(cpf.value);
      }

      if (telefone) {
        telefone.value =
          formatTelefone(
            telefone.value
          );
      }

      if (cep) {
        cep.value =
          formatCep(cep.value);
      }
    }


    /*
     * =====================================================
     * HISTÓRICO
     * =====================================================
     */

    function renderHistory() {

      if (!historyList) {
        return;
      }

      const submissions =
        getSubmissions();

      historyList.innerHTML = '';


      if (submissions.length === 0) {

        const emptyMessage =
          document.createElement('li');

        emptyMessage.className =
          'history-empty';

        emptyMessage.textContent =
          'Nenhum cadastro realizado neste navegador.';

        historyList.appendChild(
          emptyMessage
        );

        return;
      }


      submissions
        .slice()
        .reverse()
        .forEach(submission => {

          const item =
            document.createElement('li');

          item.className =
            'history-item';


          const name =
            document.createElement('strong');

          name.textContent =
            submission.nome;


          const details =
            document.createElement('span');

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
     * =====================================================
     * MÁSCARAS
     * =====================================================
     */

    if (cpf) {

      cpf.addEventListener(
        'input',
        event => {

          event.target.value =
            formatCpf(
              event.target.value
            );

          saveDraft(
            getFormData()
          );

          if (
            event.target.dataset.touched ===
            'true'
          ) {

            validateField(
              event.target
            );

          }

        }
      );

    }


    if (telefone) {

      telefone.addEventListener(
        'input',
        event => {

          event.target.value =
            formatTelefone(
              event.target.value
            );

          saveDraft(
            getFormData()
          );

          if (
            event.target.dataset.touched ===
            'true'
          ) {

            validateField(
              event.target
            );

          }

        }
      );

    }


    if (cep) {

      cep.addEventListener(
        'input',
        event => {

          event.target.value =
            formatCep(
              event.target.value
            );

          saveDraft(
            getFormData()
          );

          if (
            event.target.dataset.touched ===
            'true'
          ) {

            validateField(
              event.target
            );

          }

        }
      );

    }


    /*
     * =====================================================
     * INPUT E CHANGE
     * =====================================================
     */

    fields.forEach(field => {

      field.addEventListener(
        'input',
        () => {

          field.dataset.touched =
            'true';

          saveDraft(
            getFormData()
          );

          validateField(field);

        }
      );


      field.addEventListener(
        'change',
        () => {

          field.dataset.touched =
            'true';

          saveDraft(
            getFormData()
          );

          validateField(field);

        }
      );


      field.addEventListener(
        'blur',
        () => {

          field.dataset.touched =
            'true';

          validateField(field);

        }
      );

    });


    /*
     * =====================================================
     * SUBMIT
     * =====================================================
     */

    form.addEventListener(
      'submit',
      event => {

        event.preventDefault();


        const validation =
          validateAllFields(fields);


        if (!validation.valid) {

          showStatus(
            'Revise os campos destacados antes de continuar.',
            'error'
          );


          if (
            validation.firstInvalidField
          ) {

            validation
              .firstInvalidField
              .focus();

          }

          return;
        }


        const formData =
          new FormData(form);


        const cadastro = {

          nome:
            formData.get('nome'),

          cpf:
            formData.get('cpf'),

          nascimento:
            formData.get('nascimento'),

          email:
            formData.get('email'),

          telefone:
            formData.get('telefone'),

          cep:
            formData.get('cep'),

          cidade:
            formData.get('cidade'),

          estado:
            formData.get('estado'),

          endereco:
            formData.get('endereco'),

          interesse:
            formData.get('interesse'),

          mensagem:
            formData.get('mensagem'),

          dataCadastro:
            new Date().toLocaleString(
              'pt-BR'
            )

        };


        /*
         * O módulo de storage é responsável
         * pela persistência.
         */

        saveSubmission(cadastro);

        clearDraft();


        /*
         * Limpa o formulário.
         */

        form.reset();


        fields.forEach(field => {

          field.dataset.touched =
            'false';

          removeFieldError(field);

        });


        showStatus(
          'Cadastro realizado com sucesso! Os dados foram salvos neste navegador.',
          'success'
        );


        renderHistory();

      }
    );


    /*
     * =====================================================
     * LIMPAR HISTÓRICO
     * =====================================================
     */

    if (clearHistoryButton) {

      clearHistoryButton.addEventListener(
        'click',
        () => {

          clearSubmissions();

          renderHistory();

          showStatus(
            'Histórico de cadastros removido deste navegador.',
            'info'
          );

        }
      );

    }


    /*
     * =====================================================
     * INICIALIZAÇÃO
     * =====================================================
     */

    const savedDraft =
      loadDraft();

    restoreFormData(
      savedDraft
    );

    if (savedDraft) {

      showStatus(
        'Rascunho restaurado. Você pode continuar o preenchimento.',
        'info'
      );

    }


    renderHistory();

  }
);