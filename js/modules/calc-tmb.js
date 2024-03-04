import initCalcKcal from "./calc-kcal.js";
import { dadosForm } from "./init-form.js";

export function calcTmb(sexo) {
  function biotipo(biotipo) {
    if(biotipo === 'ectomorfo') {
      return 1.2
    }else if(biotipo === 'mesomorfo') {
      return 1.1
    }else if(biotipo === 'endomorfo') {
      return 1
    }
  };
  function objeivo(objetivo) {
    const imcMm = ((dadosForm.peso * dadosForm.bf) - dadosForm.peso) / (dadosForm.peso * dadosForm.peso);

    if(objeivo === 'perder' && dadosForm.bf <= 22) {
      return 0.94
    }else if(objeivo === 'perder' && dadosForm.bf >= 27 && dadosForm.bf < 39) {
      return 0.7
    }else if(objeivo === 'perder' && dadosForm.bf >= 40 && imcMm <= 20) {
      return 0.6
    }else if(objeivo === 'perder' && dadosForm.bf >= 40 && imcMm > 25) {
      return 0.5
    }else if(objeivo === 'manter') {
      return 1
    }else if(objeivo === 'ganhar') {
      return 1.04
    }else if(objeivo === 'performace') {
      return 1.14
    }

  };
  if (sexo === "masculino") {
    const resultadoTmbh =
      ((66 + 13.7 * dadosForm.peso + 5 * dadosForm.altura - 6.8 * dadosForm.idade) * biotipo(dadosForm.biotipo)) * objeivo(dadosForm.objetivo);
    return resultadoTmbh;
  } else if (sexo === "feminino") {
    const resultadoTmbm =
      ((655 + 9.6 * dadosForm.peso + 1.8 * dadosForm.altura - 4.7 * dadosForm.idade) * biotipo(dadosForm.biotipo)) * objeivo(dadosForm.objetivo);
    return resultadoTmbm;
  }
  printTmb();
}

export function printTmb() {
  const resultBf = dadosForm.bf * 100;
  const resultMm = dadosForm.peso - dadosForm.peso * dadosForm.bf;
  const resultMg = dadosForm.peso * dadosForm.bf;
  const resultBasalKcal = document.querySelector(".result-basal-kcal");

  resultBasalKcal.querySelector(".result-bf").innerHTML =
    resultBf.toFixed(1) + "%";
  resultBasalKcal.querySelector(".result-mm").innerHTML =
    resultMm.toFixed(2) + " Kg";
  resultBasalKcal.querySelector(".result-mg").innerHTML =
    resultMg.toFixed(2) + " Kg";
  resultBasalKcal.querySelector(".result-tmb").innerHTML =
    calcTmb(dadosForm.sexo).toFixed(0) + " Kcal";

  initCalcKcal(dadosForm);
}
