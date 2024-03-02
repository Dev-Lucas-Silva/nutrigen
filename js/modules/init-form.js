import calcTmb from "./calc-tmb.js";

const formBasal = document.getElementById("form-basal");
const gridBfHomem = document.querySelector(".grid-bf-homem");
const gridBfMulher = document.querySelector(".grid-bf-mulher");
const erroTmb = formBasal.querySelector(".tmb-erro");

export const dadosTmb = {};
dadosTmb.length = 6;

const handleValidity = (form, event, erro, callback) => {
  const target = event.target;

  if (target.value === "" && target.name != "submit") {
    target.classList.add("invalido");
  } else {
    target.classList.remove("invalido");
  }

  form.submit.addEventListener("click", (event) => {
    event.preventDefault();

    if ((Object.values(dadosTmb).length = dadosTmb.length)) {
      erro.classList.remove("invalido");
      callback();
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

const handleEvents = (event, callback) => {
  if (event.target.value) {
    dadosTmb[event.target.name] = event.target.value;
  }
  mostarFotosBf();
  handleValidity(formBasal, event, erroTmb, callback);
};

const eventos = ["click", "touchstart", "change", "keyup"];

export function init() {
  eventos.forEach((evento) =>
    formBasal.addEventListener(evento, () => {
      handleEvents(event, calcTmb);
    })
  );
}
