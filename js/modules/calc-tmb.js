import initCalcKcal from "./calc-kcal.js";

export default function initCalcTmb() {
  const formBasal = document.getElementById("form-basal");
  const gridBfHomem = document.querySelector(".grid-bf-homem");
  const gridBfMulher = document.querySelector(".grid-bf-mulher");
  const resultBasal = document.querySelector(".result-basal");
  const resultKcal = document.querySelector(".result-kcal");
  const erroTmb = formBasal.querySelector(".tmb-erro");

  const dadosTmb = {};
  dadosTmb.length = 12;

  const calcTmb = () => {
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
  };

  const handleValidity = (form, event, erro) => {
    const target = event.target;

    if (target.value === "" && target.name != "submit") {
      target.classList.add("invalido");
    } else {
      target.classList.remove("invalido");
    }

    form.submit.addEventListener("click", (event) => {
      event.preventDefault();

      if (Object.values(dadosTmb).length === dadosTmb.length) {
        erro.classList.remove("invalido");
        calcTmb();
      } else {
        erro.classList.add("invalido");
      }
    });
  };

  const mostarFotosBf = () => {
    if (dadosTmb.sexo === "masculino") {
      gridBfMulher.style.display = "none";
      gridBfHomem.style.display = "grid";
    } else if (dadosTmb.sexo === "feminino") {
      gridBfHomem.style.display = "none";
      gridBfMulher.style.display = "grid";
    }
  };

  const handleEvents = (event) => {
    if (event.target.value) {
      dadosTmb[event.target.name] = event.target.value;
    }
    mostarFotosBf();
    handleValidity(formBasal, event, erroTmb);
  };

  const eventos = ["click", "touchstart", "change", "keyup"];

  eventos.forEach((evento) => formBasal.addEventListener(evento, handleEvents));
}
