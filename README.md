# Projeto ONG — Juntos Fazemos a Diferença

Projeto front-end desenvolvido para uma ONG fictícia, com foco na construção de uma interface **semântica, responsiva e acessível**, utilizando HTML5, CSS3 e JavaScript puro.

O projeto simula um site institucional para apresentação da organização, divulgação de projetos sociais e captação de voluntários e doadores.

## ✨ Funcionalidades

* Apresentação institucional da ONG.
* Página dedicada aos projetos e iniciativas sociais.
* Área para voluntariado e doações.
* Formulário de cadastro para participação na ONG.
* Organização do formulário utilizando `fieldset` e `legend`.
* Validação de campos utilizando recursos nativos do HTML5.
* Máscaras para CPF, telefone e CEP com JavaScript.
* Feedback visual após a interação com o formulário.
* Navegação entre páginas.
* Layout responsivo para diferentes tamanhos de tela.
* Uso de elementos HTML semânticos para estruturar o conteúdo.
* Recursos básicos de acessibilidade, como link para pular diretamente ao conteúdo principal, textos alternativos e identificação adequada dos campos do formulário.

## 🛠️ Tecnologias

* **HTML5** — estrutura semântica e formulários.
* **CSS3** — estilização e responsividade.
* **JavaScript** — interações, máscaras e tratamento do formulário.
* **WebP, JPG e PNG** — recursos visuais e otimização de imagens.

## 📁 Estrutura do projeto

```text
projeto-ong/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── img/
│   │   ├── *.jpg
│   │   ├── *.png
│   │   └── *.webp
│   └── js/
│       └── form.js
├── cadastro.html
├── index.html
├── projetos.html
└── README.md
```

### Principais arquivos

* `index.html` — página inicial com apresentação institucional e informações de contato.
* `projetos.html` — apresentação dos projetos, oportunidades de voluntariado e formas de contribuição.
* `cadastro.html` — formulário de participação, organizado em grupos de informações pessoais, contato, endereço e interesse.
* `assets/css/style.css` — estilos visuais e regras de responsividade.
* `assets/js/form.js` — máscaras de entrada e tratamento das interações do formulário.
* `assets/img/` — imagens e elementos gráficos utilizados no projeto.

## ♿ Acessibilidade

O projeto utiliza recursos do HTML e da estrutura da interface para melhorar a experiência de navegação, incluindo:

* HTML semântico;
* hierarquia de títulos;
* `label` associado aos campos do formulário;
* `fieldset` e `legend` para agrupamento de informações;
* link de acesso direto ao conteúdo principal;
* textos alternativos para imagens;
* atributos `aria` quando necessários;
* mensagens de status para feedback das interações.

A implementação busca demonstrar que acessibilidade pode ser incorporada desde a estrutura inicial do desenvolvimento, sem depender exclusivamente de recursos externos.

## 📱 Responsividade

A interface foi desenvolvida para se adaptar a diferentes tamanhos de tela, utilizando CSS responsivo e uma estrutura de conteúdo que prioriza a organização e a legibilidade em dispositivos desktop e móveis.

## ▶️ Como executar

O projeto não depende de frameworks, gerenciadores de pacotes ou processo de build.

Para executar localmente:

```bash
git clone https://github.com/pedroconhasca09/projeto-ong.git
cd projeto-ong
```

Depois, abra o arquivo `index.html` no navegador.

Também é possível utilizar uma extensão como **Live Server** no VS Code para executar o projeto durante o desenvolvimento.

## ⚠️ Observação

Este é um projeto acadêmico e demonstrativo desenvolvido para uma ONG fictícia.

Os dados de contato, informações institucionais e imagens utilizados no projeto são genéricos e servem exclusivamente para fins de demonstração.

O formulário demonstra validação e interação no navegador. Em uma aplicação real, os dados enviados também precisariam ser tratados, validados e protegidos no servidor.

## 🎓 Contexto acadêmico

Projeto desenvolvido como parte da atividade **Experiência Prática  — Faculdade Cruzeiro do Sul**, com o objetivo de aplicar conceitos de desenvolvimento front-end, estruturação semântica, formulários HTML, CSS responsivo e JavaScript.
