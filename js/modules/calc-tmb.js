import initCalcKcal from "./calc-kcal.js";
import { dadosTmb } from "./init-form.js";

const resultBasal = document.querySelector(".result-basal");
const resultKcal = document.querySelector(".result-kcal");


export default function calcTmb() {
  const resultadoBf = dadosTmb.bf * 100;
  const resultadoMm = dadosTmb.peso - dadosTmb.peso * dadosTmb.bf;
  const resultadoMg = dadosTmb.peso * dadosTmb.bf;
  const resultadoTmbh =
    66 + 13.7 * dadosTmb.peso + 5 * dadosTmb.altura - 6.8 * dadosTmb.idade;
  const resultadoTmbm =
    655 + 9.6 * dadosTmb.peso + 1.8 * dadosTmb.altura - 4.7 * dadosTmb.idade;

  resultBasal.querySelector(".result-bf").innerHTML =
    resultadoBf.toFixed(1) + "%";
  resultBasal.querySelector(".result-mm").innerHTML =
    resultadoMm.toFixed(2) + " Kg";
  resultBasal.querySelector(".result-mg").innerHTML =
    resultadoMg.toFixed(2) + " Kg";

  if (dadosTmb.sexo === "masculino") {
    resultKcal.querySelector(".result-tmb").innerHTML =
      resultadoTmbh.toFixed(0) + " Kcal";
  } else if (dadosTmb.sexo === "feminino") {
    resultKcal.querySelector(".result-tmb").innerHTML =
      resultadoTmbm.toFixed(0) + " Kcal";
  }
  initCalcKcal(dadosTmb);
}
