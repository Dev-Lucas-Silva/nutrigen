import initCalcMacros from "./calc-macros.js";

//console.log(tbm)
export default function initCalcKcal(dado) {
  const kcalTreino = document.querySelector(".kcal-treino");
  const kcalCardio = document.querySelector(".kcal-cardio");
  const kcalCardioTreino = document.querySelector(".kcal-cardio-treino");

  const tmbHomem = 66 + 13.7 * dado.peso + 5 * dado.altura - 6.8 * dado.idade;
  const tmbMulher =
    655 + 9.6 * dado.peso + 1.8 * dado.altura - 4.7 * dado.idade;

  const gastoKcalTreino =
    dado.intesidadeTreino * 0.0175 * dado.peso * dado.tempoTreino;
  const gastoKcalCardio =
    dado.intesidadeCardio * 0.0175 * dado.peso * dado.tempoCardio;
    let gastoKcalDiaDia = 0;
    if(dado.atvDiaDia > 0) {
      gastoKcalDiaDia = 3.22 * 0.0175 * dado.peso * dado.DiaDia;
    }

  const kcalTreinoHomen = (
    (gastoKcalTreino + tmbHomem + gastoKcalDiaDia) *
    dado.objetivo
  ).toFixed(0);
  const kcalTreinoMulher = (
    (gastoKcalTreino + tmbMulher + gastoKcalDiaDia) *
    dado.objetivo
  ).toFixed(0);

  const kcalCardioHomen = (
    (gastoKcalCardio + tmbHomem + gastoKcalDiaDia) *
    dado.objetivo
  ).toFixed(0);
  const kcalCardioMulher = (
    (gastoKcalCardio + tmbMulher + gastoKcalDiaDia) *
    dado.objetivo
  ).toFixed(0);

  const kcalTreinoCardioHomem = (
    (gastoKcalTreino + gastoKcalCardio + tmbHomem + gastoKcalDiaDia) *
    dado.objetivo
  ).toFixed(0);
  const kcalTreinoCardioMulher = (
    (gastoKcalTreino + gastoKcalCardio + tmbMulher + gastoKcalDiaDia) *
    dado.objetivo
  ).toFixed(0);

  if (dado.tempoTreino && dado.sexo === "masculino") {
    kcalTreino.innerHTML = kcalTreinoHomen + " Kcal ";
  } else if (dado.tempoTreino && dado.sexo === "feminino") {
    kcalTreino.innerHTML = kcalTreinoMulher + " Kcal ";
  } else {
    kcalTreino.innerHTML = "Voçê ainda não adicionou treino";
  }

  if (dado.tempoCardio && dado.sexo === "masculino") {
    kcalCardio.innerHTML = kcalCardioHomen + " Kcal ";
  } else if (dado.tempoTreino && dado.sexo === "feminino") {
    kcalCardio.innerHTML = kcalCardioMulher + " Kcal ";
  } else {
    kcalCardio.innerHTML = "Voçê ainda não adicionou cardio";
  }

  if (dado.tempoTreino && dado.tempoCardio && dado.sexo === "masculino") {
    kcalCardioTreino.innerHTML = kcalTreinoCardioHomem + " Kcal ";
  } else if (dado.tempoTreino && dado.tempoCardio && dado.sexo === "feminino") {
    kcalCardioTreino.innerHTML = kcalTreinoCardioMulher + " Kcal ";
  } else {
    kcalCardioTreino.innerHTML = "Voçê ainda não adicionou treino e cardio";
  }

  initCalcMacros(dado);
}
