const minhaDieta = document.querySelector(".refeicao");
const observaoDieta = document.querySelector(".observacao-tabela-dieta");
/*
let teste = [];

const objeto = { a: 1, b: 2, c: 3 };
Object.entries(objeto).forEach(([chave, valor]) => {
  console.log(chave + ': ' + valor);
});

*/
export const printDieta = function (dieta) {
  let refeicoes = [];
console.log(dieta)
  dieta.forEach((refe, index) => {
    let innerRefeicoes = `<div class='refeicoes'>
      <h3 class="titulo-refeicao">${refe[0].descricao}</h3>`;
        refeicoes.push(innerRefeicoes);
        console.log('1')

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
      console.log('2')

    }
  });
    setTimeout(() => {      
      let joinRefeicoes = refeicoes.join(" ");
      minhaDieta.innerHTML = joinRefeicoes;
    }, 50);
};
