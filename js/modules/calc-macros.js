import { calcTmb } from "./calc-tmb.js";
import { dadosForm } from "./init-form.js";

export default function initCalcMacros(dado, resultKcalTreino, resultKcalCardio, resultKcalTreinoCardio) {
    const calcBasal = calcTmb(dado.sexo);
  
    function biotipo(biotipo) {
      if(biotipo === 'ectomorfo') {
        const taxa = {
          proteina: 1.8,
          gordura: 1.3
        }
        return taxa
      }else if(biotipo === 'mesomorfo') {
        const taxa = {
          proteina: 2,
          gordura: 1.3
        }
        return taxa
      }else if(biotipo === 'endomorfo') {
        const taxa = {
          proteina: 2,
          gordura: 1
        }
        return taxa
      }
    };

    const proteinas = dado.peso * biotipo(dadosForm.biotipo).proteina;
    const gordura = dado.peso * biotipo(dadosForm.biotipo).gordura;
    const carboDescanso = (calcBasal - (proteinas * 4 + gordura * 9)) / 4;
    const carboTreino = (resultKcalTreino - (proteinas * 4 + gordura * 9)) / 4;
    const carboCardio = (resultKcalCardio - (proteinas * 4 + gordura * 9)) / 4;
    const carboTreinoCardio = (resultKcalTreinoCardio - (proteinas * 4 + gordura * 9)) / 4;



  const resultMacros = document.querySelector(".result-macros");
  const innerProteina = resultMacros.querySelector(".proteina").innerHTML = proteinas.toFixed(0) + ' g ';
  const innerGordura = resultMacros.querySelector(".gordura").innerHTML = gordura.toFixed(0) + ' g ';
  const innerCarboDescanso = resultMacros.querySelector(".carbo-descanso").innerHTML = carboDescanso.toFixed(0) + ' g ';
  const innerCarboTreino = resultMacros.querySelector(".carbo-treino").innerHTML = carboTreino.toFixed(0) + ' g ';
  const innerCarboCardio = resultMacros.querySelector(".carbo-cardio").innerHTML = carboCardio.toFixed(0) + ' g ';
  const innerCarboCardioTreino = resultMacros.querySelector(".carbo-treino-cardio").innerHTML = carboTreinoCardio.toFixed(0) + ' g ';

  const formMacros = document.getElementById("form-macros");

  formMacros.proteinaporkg

  
    //console.log(carboDescanso)
    //console.log(carboTreino)
    //console.log(carboCardio)
    //console.log(carboTreinoCardio)

}


