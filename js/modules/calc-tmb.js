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

  function objetivo(objetivo) {
    const imcMm = ((dadosForm.peso * dadosForm.bf) - dadosForm.peso) / (dadosForm.altura * dadosForm.altura);

    if(objetivo === 'perder' && dadosForm.bf <= 22) {
      return 0.8
    }else if(objetivo === 'perder' && dadosForm.bf > 22 && dadosForm.bf < 39) {
      return 0.7
    }else if(objetivo === 'perder' && dadosForm.bf >= 40 && imcMm <= 20) {
      return 0.6
    }else if(objetivo === 'perder' && dadosForm.bf >= 40 && imcMm > 25) {
      return 0.5
    }else if(objetivo === 'manter') {
      return 1
    }else if(objetivo === 'ganhar') {
      return 1.2
    }else if(objetivo === 'performace') {
      return 1.05
    }
  };

  let tmbCalculada = 0;

  if (sexo === "masculino") {
    const resultadoTmbH =
      ((66 + 13.7 * dadosForm.peso + 5 * dadosForm.altura - 6.8 * dadosForm.idade) * biotipo(dadosForm.biotipo)) * objetivo(dadosForm.objetivo);
      tmbCalculada = resultadoTmbH;
  } else if (sexo === "feminino") {
    const resultadoTmbM =
      ((655 + 9.6 * dadosForm.peso + 1.8 * dadosForm.altura - 4.7 * dadosForm.idade) * biotipo(dadosForm.biotipo)) * objetivo(dadosForm.objetivo);
      tmbCalculada = resultadoTmbM;
  }

  printTmb(tmbCalculada);
}

export function printTmb(tmb) {
  const resultBf = dadosForm.bf * 100;
  const resultMm = dadosForm.peso - dadosForm.peso * dadosForm.bf;
  const resultMg = dadosForm.peso * dadosForm.bf;
  const resultBasalKcal = document.querySelector(".result-basal-contain");

  resultBasalKcal.querySelector(".result-bf").innerHTML =
    resultBf.toFixed(1) + "%";
  resultBasalKcal.querySelector(".result-mm").innerHTML =
    resultMm.toFixed(2) + "Kg";
  resultBasalKcal.querySelector(".result-mg").innerHTML =
    resultMg.toFixed(2) + "Kg";
  resultBasalKcal.querySelector(".result-tmb").innerHTML =
    tmb.toFixed(0) + " Kcal";

  initCalcKcal(dadosForm, tmb);
}
