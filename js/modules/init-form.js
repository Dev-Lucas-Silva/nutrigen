import { calcTmb } from "./calc-tmb.js";
import {
  calcPrint,
  listaDietasImportadas,
  zerarDietaMontada,
} from "./bild-dieta.js";

const formBasal = document.getElementById("form-basal");
const gridBfHomem = document.querySelector(".grid-bf-homem");
const gridBfMulher = document.querySelector(".grid-bf-mulher");
const erroTmb = formBasal.querySelector(".tmb-erro");

export const dadosForm = {
  DiaDia: "",
  altura: "",
  bf: "",
  biotipo: "",
  idade: "",
  intesidadeCardio: "",
  intesidadeTreino: "",
  objetivo: "",
  peso: "",
  sexo: "",
  tempoCardio: "",
  tempoTreino: "",
}; /*
DiaDia: "150",
altura: "173",
bf: "0.17",
biotipo: "endomorfo",
idade: "27",
intesidadeCardio: "moderado",
intesidadeTreino: "intenso",
objetivo: "ganhar",
peso: "74",
sexo: "masculino",
tempoCardio: "60",
tempoTreino: "30",*/
const handleValidity = (form, event, erro, calculadora) => {
  const target = event.target;

  if (target.value === "" && target.name != "submit") {
    target.classList.add("invalid");
  } else {
    target.classList.remove("invalid");
  }

  if (
    !Object.values(dadosForm).includes("") &&
    !form.submit.classList.contains("event")
  ) {
    erro.classList.remove("invalid");
    form.submit.addEventListener("click", (event) => {
      event.preventDefault();
      calculadora(dadosForm.sexo);
    });
    form.submit.setAttribute("class", "event");
  } else {
    erro.classList.add("invalid");
  }
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

const properties = Object.keys(localStorage);
function setValues() {
  properties.forEach((propertie, i) => {
    dadosForm[propertie] = localStorage[propertie];
    formBasal.DiaDia.value = localStorage.DiaDia;
    formBasal.altura.value = localStorage.altura;
    formBasal.bf.value = localStorage.bf;
    formBasal.biotipo.value = localStorage.biotipo;
    formBasal.idade.value = localStorage.idade;
    formBasal.intesidadeCardio.value = localStorage.intesidadeCardio;
    formBasal.intesidadeTreino.value = localStorage.intesidadeTreino;
    formBasal.objetivo.value = localStorage.objetivo;
    formBasal.peso.value = localStorage.peso;
    formBasal.sexo.value = localStorage.sexo;
    formBasal.tempoCardio.value = localStorage.tempoCardio;
    formBasal.tempoTreino.value = localStorage.tempoTreino;
  });

  if (properties.includes("sexo")) {
    mostarFotosBf();
  }

  if (properties.includes("dietaImportada")) {
    calcTmb(dadosForm.sexo);

    zerarDietaMontada();

    const myValue = localStorage.getItem("dietaImportada");

    calcPrint(listaDietasImportadas[myValue]);

    const dietaEscolhida = document.querySelectorAll(".escolha-dieta button");

    dietaEscolhida.forEach((dieta) => {
      dieta.disabled = true;
    });
  }
}
setValues();

const handleEvents = (event, calculadora) => {
  if (event.target.value) {
    const name = event.target.name;
    const value = event.target.value;
    dadosForm[name] = value;
    localStorage[name] = value;
  }
  mostarFotosBf();
  handleValidity(formBasal, event, erroTmb, calculadora);
};

export function init() {
  formBasal.addEventListener("change", () => {
    handleEvents(event, calcTmb);
  });
}
