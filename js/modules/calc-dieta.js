export default function initCalcDieta() {}

const macros = {
  kcal: 2687.6,
  carboidratos: 339.5,
  proteina: 125.9,
  gorduras: 23.6,
};
const alimentos = {
  quantRef: 5,
  carbosA: "Arroz",
  proteinA: "Peito de Frango grelhado",
  gordA: "Amedoim Torrado",
};

function calcRefeicoes() {
  const quantRefeicoes = alimentos.quantRef;

  const kcalPorRefeicao = macros.kcal / quantRefeicoes;
  const carboidratosPorRefeicao = macros.carboidratos / quantRefeicoes;
  const proteinaPorRefeicao = macros.proteina / quantRefeicoes;
  const gorduraPorRefeicao = macros.gorduras / quantRefeicoes;

  return {
    refeicao1: {
      kcalPorRefeicao: +kcalPorRefeicao.toFixed(1),
      carboidratosPorRefeicao: +carboidratosPorRefeicao.toFixed(1),
      proteinaPorRefeicao: +proteinaPorRefeicao.toFixed(1),
      gorduraPorRefeicao: +gorduraPorRefeicao.toFixed(1),
    },
  };
}

//console.log(calcRefeicoes());
async function montagemRefeicao() {
  const dadosAlimentos = await fetch('../alimentosapi.json');
  const alimentosJson = await dadosAlimentos.json();

  const abc = calcRefeicoes().refeicao1.proteinaPorRefeicao;

  //console.log(abc);

  //console.log(alimentosJson.PeitoDeFrangoGrelhado.proteina / 10 * abc);
}

// cauculo carboidrato
const mn = 1.28;
const num = 400;
montagemRefeicao();
let index = 0;
for (index; ; index++) {
  if(mn * index >= num) {
break
  }
}
console.log(index)