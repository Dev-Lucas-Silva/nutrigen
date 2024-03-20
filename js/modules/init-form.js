import { calcTmb } from "./calc-tmb.js";

const formBasal = document.getElementById("form-basal");
const gridBfHomem = document.querySelector(".grid-bf-homem");
const gridBfMulher = document.querySelector(".grid-bf-mulher");
const erroTmb = formBasal.querySelector(".tmb-erro");

export const dadosForm = {
  DiaDia: "120",
  altura: "173",
  bf: "0.17",
  biotipo: "endomorfo",
  idade: "27",
  intesidadeCardio: "8",
  intesidadeTreino: "9",
  objetivo: "manter",
  peso: "74",
  sexo: "masculino",
  tempoCardio: "60",
  tempoTreino: "30",
};

const handleValidity = (form, event, erro, calculadora) => {
  const target = event.target;

  if (target.value === "" && target.name != "submit") {
    target.classList.add("invalid");
  } else {
    target.classList.remove("invalid");
  }

  form.submit.addEventListener("click", (event) => {
    event.preventDefault();

    if ((Object.values(dadosForm).length = 12)) {
      erro.classList.remove("invalid");
      calculadora();
    } else {
      erro.classList.add("invalid");
    }
  });
};

const mostarFotosBf = () => {
  if (dadosForm.sexo === "masculino") {
    gridBfMulher.style.display = "none";
    gridBfHomem.style.display = "grid";
  } else if (dadosForm.sexo === "feminino") {
    gridBfHomem.style.display = "none";
    gridBfMulher.style.display = "grid";
  }
};

const handleEvents = (event, calculadora) => {
  if (event.target.value) {
    dadosForm[event.target.name] = event.target.value;
  }
  mostarFotosBf();
  handleValidity(formBasal, event, erroTmb, calculadora);
};

const eventos = ["click", "touchstart", "change"];

export function init() {
  eventos.forEach((evento) =>
    formBasal.addEventListener(evento, () => {
      handleEvents(event, calcTmb);
    })
  );
}
