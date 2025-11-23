const main = document.querySelector('main');
const campoBusca = document.querySelector('header input');
let dados = []; // Array para armazenar todos os dados dos personagens

/**
 * Renderiza os cards dos personagens na tela.
 * @param {Array} dadosParaRenderizar - O array de personagens a ser exibido.
 */
function renderizarCards(dadosParaRenderizar) {
    main.innerHTML = ""; // Limpa o conteúdo principal antes de adicionar os novos cards
    for (let personagem of dadosParaRenderizar) {
        let article = document.createElement("article");
        article.innerHTML = `
            <img src="${personagem.imagem}" alt="Imagem de ${personagem.nome}">
            <div>
              <h2>${personagem.nome}</h2>
              <p><strong>Afiliação:</strong>${personagem.descricao}</p>
              <a href="${personagem.link}" target="_blank">Saiba Mais</a>
            </div>
        `;
        main.appendChild(article);
    }
}

/**
 * Carrega os dados do arquivo JSON e inicia a primeira renderização.
 */
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados); // Renderiza todos os cards na carga inicial
    } catch (erro) {
        console.error("Falha ao buscar dados:", erro);
    }
}

/**
 * Filtra os dados com base no termo de busca e renderiza os resultados.
 */
function iniciarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(dadosFiltrados);
}
campoBusca.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        iniciarBusca();
    }
});

// Carrega os dados assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', carregarDados);

