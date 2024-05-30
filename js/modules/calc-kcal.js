import { initCalcMacros } from "./calc-macros.js";

export default function initCalcKcal(dadoForm, tmb) {
  const calcBasal = tmb;
  const kcalTreino = document.querySelector(".kcal-treino");
  const kcalCardio = document.querySelector(".kcal-cardio");
  const kcalCardioTreino = document.querySelector(".kcal-cardio-treino");

  const gastoKcalTreino =
    dadoForm.intesidadeTreino * 0.0175 * dadoForm.peso * dadoForm.tempoTreino;
  const gastoKcalCardio =
    dadoForm.intesidadeCardio * 0.0175 * dadoForm.peso * dadoForm.tempoCardio;
  let gastoKcalDiaDia = 0;
  if (dadoForm.atvDiaDia > 0) {
    gastoKcalDiaDia = 3.5 * 0.0175 * dadoForm.peso * dadoForm.DiaDia;
  }

  function calcKcalTreino() {
    const kcalTreinoCalc =
      (gastoKcalTreino + calcBasal + gastoKcalDiaDia).toFixed(0);
    return kcalTreinoCalc;
  }
  const resultKcalTreino = calcKcalTreino();

  function calcKcalCardio() {
    const kcalCardioCalc =
      (gastoKcalCardio + calcBasal + gastoKcalDiaDia).toFixed(0);
    return kcalCardioCalc;
  }
  const resultKcalCardio = calcKcalCardio();

  function calcKcalTreinoCardio() {
    const kcalTreinoCardioCalc =
      (gastoKcalTreino +
        gastoKcalCardio +
        calcBasal +
        gastoKcalDiaDia).toFixed(0);
    return kcalTreinoCardioCalc;
  }
  const resultKcalTreinoCardio = calcKcalTreinoCardio();

  function printKcal(dadoForm) {
    if (dadoForm.tempoTreino) {
      kcalTreino.innerHTML = resultKcalTreino + " Kcal ";
    } else {
      kcalTreino.innerHTML = "N/A";
    }

    if (dadoForm.tempoCardio) {
      kcalCardio.innerHTML = resultKcalCardio + " Kcal ";
    } else {
      kcalCardio.innerHTML = "N/A";
    }

    if (dadoForm.tempoTreino && dadoForm.tempoCardio) {
      kcalCardioTreino.innerHTML = resultKcalTreinoCardio + " Kcal ";
    } else {
      kcalCardioTreino.innerHTML = "N/A";
    }
  }
  printKcal(dadoForm);
  initCalcMacros(dadoForm, resultKcalTreino, resultKcalCardio, resultKcalTreinoCardio, calcBasal);
}
