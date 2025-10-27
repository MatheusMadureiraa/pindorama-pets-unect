let paginaAtual = 1;
const avaliacoesPorPagina = 3;
let avaliacoes = [];

async function carregarAvaliacoes() {
    try {
        const resposta = await fetch("data/avaliacoes.json");
        const dados = await resposta.json();
        avaliacoes = dados.avaliacoes;

        renderizarPagina(paginaAtual);
    } catch (erro) {
        console.error("Erro ao carregar avaliações:", erro);
    }
}

function renderizarPagina(pagina) {
    // inserindo titulo
    const container = document.getElementById("avaliacoes-container");
    container.innerHTML = `<h2>Avaliações (${avaliacoes.length})</h2>`;

    // selecionando as avaliacoes do json p/ usar por pagina
    const inicio = (pagina - 1) * avaliacoesPorPagina;
    const fim = inicio + avaliacoesPorPagina;
    const avaliacoesPagina = avaliacoes.slice(inicio, fim);

    // inserindo avaliacoes
    avaliacoesPagina.forEach((avaliacao, index) => {
        const div = document.createElement("div");
        div.classList.add("avaliacao-item");

        // criando estrelas
        const estrelas = Array(5).fill('<div class="estrela"></div>').join("");

        div.innerHTML = `
            <div class="foto-container">
            <img src="${avaliacao.foto}" alt="${avaliacao.nome}" class="foto-avaliador"/>
            </div>
            <div class="avaliacao-conteudo">
            <div class="estrelas">${estrelas}</div>
            <h4>${avaliacao.nome}</h4>
            <p>${avaliacao.comentario}</p>
            </div>
        `;

        // linha cinza
        container.appendChild(div);
        if (index < avaliacoesPagina.length - 1) {
            container.appendChild(document.createElement("hr"));
        }

        const estrelasDiv = div.querySelectorAll(".estrela");
        for (let i = 0; i < avaliacao.estrelas; i++) {
            estrelasDiv[i].classList.add("preenchida");
        }
    });

    adicionarPaginacao(container);
}

function aplicarEfeitoClique(botao) {
    botao.classList.add("clicado");
    setTimeout(() => botao.classList.remove("clicado"), 500);
}

function adicionarPaginacao(container) {
    const totalPaginas = Math.ceil(avaliacoes.length / avaliacoesPorPagina);
    if (totalPaginas <= 1) return;

    const paginacaoDiv = document.createElement("div");
    paginacaoDiv.classList.add("paginacao");

    const botaoAnterior = document.createElement("button");
    botaoAnterior.innerHTML = "<";
    botaoAnterior.classList.add("botao-anterior");
    botaoAnterior.disabled = paginaAtual === 1;

    const numeroPagina = document.createElement("span");
    numeroPagina.textContent = paginaAtual;
    numeroPagina.classList.add("numero-pagina");

    const botaoProxima = document.createElement("button");
    botaoProxima.innerHTML = ">";
    botaoProxima.classList.add("botao-proxima");
    botaoProxima.disabled = paginaAtual >= totalPaginas;

    botaoAnterior.addEventListener("click", () => {
        if (paginaAtual > 1) {
            aplicarEfeitoClique(botaoAnterior);
            paginaAtual--;
            setTimeout(() => renderizarPagina(paginaAtual), 500);
        }
    });

    botaoProxima.addEventListener("click", () => {
        if (paginaAtual < totalPaginas) {
            aplicarEfeitoClique(botaoProxima);
            paginaAtual++;
            setTimeout(() => renderizarPagina(paginaAtual), 500);
        }
    });

    paginacaoDiv.appendChild(botaoAnterior);
    paginacaoDiv.appendChild(numeroPagina);
    paginacaoDiv.appendChild(botaoProxima);
    container.appendChild(paginacaoDiv);
}


document.addEventListener("DOMContentLoaded", carregarAvaliacoes);
