const projetos = [
  {
    titulo: "Educação e oportunidades",
    texto: "Apoiamos atividades educativas e ações que ampliam o acesso ao conhecimento.",
    imagem: "assets/img/educacao",
    alt: "Criança sorrindo em uma ação de educação",
    largura: 293,
    icone: "assets/img/icone-voluntariado.png"
  },
  {
    titulo: "Campanhas de doação",
    texto: "Organizamos campanhas para arrecadar alimentos e recursos destinados às ações sociais.",
    imagem: "assets/img/doacao-alimentos",
    alt: "Caixa com alimentos destinada a uma campanha de doação",
    largura: 293,
    icone: "assets/img/icone-doacao.png"
  },
  {
    titulo: "Sustentabilidade",
    texto: "Promovemos ações comunitárias voltadas ao cuidado com o ambiente e ao uso consciente de recursos.",
    imagem: "assets/img/sustentabilidade",
    alt: "Mudas sendo plantadas como parte de uma ação de sustentabilidade",
    largura: 260,
    icone: "assets/img/icone-sustentabilidade.png"
  }
];

function renderizar(dados, tpl, destino) {
  const fragmento = document.createDocumentFragment();

  dados.forEach(item => {
    const no = tpl.content.cloneNode(true);

    no.querySelector("source").srcset = `${item.imagem}.webp`;

    const foto = no.querySelector(".card-foto");
    foto.src = `${item.imagem}.jpg`;
    foto.alt = item.alt;
    foto.width = item.largura;

    no.querySelector(".card-icon").src = item.icone;
    no.querySelector("h3").textContent = item.titulo;
    no.querySelector("p").textContent = item.texto;

    fragmento.appendChild(no);
  });

  destino.replaceChildren(fragmento);
}

function marcarPaginaAtiva() {
  const atual = document.querySelector("main").dataset.page;
  document.querySelectorAll(".site-nav a[data-page]").forEach(link => {
    if (link.dataset.page === atual) link.setAttribute("aria-current", "page");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const tpl = document.getElementById("tpl-projeto");
  const destino = document.getElementById("lista-projetos");
  if (tpl && destino) renderizar(projetos, tpl, destino);
  marcarPaginaAtiva();
});