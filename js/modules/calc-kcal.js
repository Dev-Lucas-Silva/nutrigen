import initCalcMacros from "./calc-macros.js";

//console.log(tbm)
export default function initCalcKcal(dado) {
  const kcalTreino = document.querySelector(".kcal-treino");
  const kcalCardio = document.querySelector(".kcal-cardio");
  const kcalCardioTreino = document.querySelector(".kcal-cardio-treino");

  const tmbHomem =
  66 + 13.7 * dado.peso + 5 * dado.altura - 6.8 * dado.idade;
  const tmbMulher =
  655 + 9.6 * dado.peso + 1.8 * dado.altura - 4.7 * dado.idade;
  console.log(tmbHomem, tmbMulher)


  const gastoCaloricoTreino =
    dado.intesidadeTreino * 0.0175 * dado.peso * dado.tempoTreino;
  const gastoCaloricoCardio =
    dado.intesidadeCardio * 0.0175 * dado.peso * dado.tempoCardio;

  if (dado.tempoTreino && dado.sexo === 'masculino') {
    kcalTreino.innerHTML = ((gastoCaloricoTreino.toFixed(0) + tmbHomem.toFixed(0)) * dado.objetivo) + " Kcal ";
  } else if(dado.tempoTreino && dado.sexo === 'feminino') {
    kcalTreino.innerHTML = ((gastoCaloricoTreino.toFixed(0) + tmbMulher.toFixed(0)) * dado.objetivo) + " Kcal ";
  } 
  else {
    kcalTreino.innerHTML = "Voçê ainda não adicionou treino";
  }

  if (dado.tempoCardio) {
    kcalCardio.innerHTML = gastoCaloricoCardio.toFixed(0) + " Kcal ";
  } else {
    kcalCardio.innerHTML = "Voçê ainda não adicionou cardio";
  }

  if (dado.tempoTreino && dado.tempoCardio) {
    kcalCardioTreino.innerHTML =
      gastoCaloricoTreino.toFixed(0) +
      gastoCaloricoCardio.toFixed(0) +
      " Kcal ";
  } else {
    kcalCardioTreino.innerHTML = "Voçê ainda não adicionou treino e cardio";
  }


  initCalcMacros(dado);
}
