import { listaObservacoes } from "./dietas-modelos/observacoes-dietas.js";

const myValue = localStorage.getItem("dietaImportada");
const minhaDieta = document.querySelector(".refeicao");
const observaoDieta = document.querySelector(".observacao-tabela-dieta");


export const printDieta = function (dieta) {
  let refeicoes = [];

  dieta.forEach((refe) => {
    let innerRefeicoes = `<div class='refeicoes'>
      <h3 class="titulo-refeicao">${refe[0].descricao}</h3>`;
    refeicoes.push(innerRefeicoes);

    for (let i = 1; i < refe.length; i++) {
      const ref = refe[i];
      let montarRefeicoes = `<div class="lista-alimentos">
      <p class="descricao-alimento">${ref[4]}</p>
            <div>
              <span class="gDescanso">${ref[0]}g</span>
              <span class="gTreino">${ref[1]}g</span>
              <span class="gCardio">${ref[2]}g</span>
              <span class="gCardioTreino">${ref[3]}g</span>
            </div>

          </div>
          `;
      refeicoes.push(montarRefeicoes);
    }
  });
  setTimeout(() => {    
    let joinRefeicoes = refeicoes.join(" ");
    minhaDieta.innerHTML = joinRefeicoes;
    observaoDieta.innerHTML = listaObservacoes[myValue];
  }, 20);

};
