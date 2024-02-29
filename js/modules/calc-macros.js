export default function initCalcMacros() {
  const formMacros = document.getElementById("form-macros");
  const resultMacros = document.querySelector(".result-macros");
  const erroMacros = formBasal.querySelector(".erro");

  const dados = {};
  dados.length = 0;


  const handleValidity = (form, event, erro) => {
    const target = event.target;

    if (target.value === "" && target.name != "submit") {
      target.classList.add("invalido");
    } else {
      target.classList.remove("invalido");
    }

    form.submit.addEventListener("click", (event) => {
      event.preventDefault();

      if (Object.values(dados).length === dados.length) {
        erro.classList.remove("invalido");
      } else {
        erro.classList.add("invalido");
      }
    });
  };


  const handleEvents = (event) => {
    if (event.target.value) {
      dados[event.target.name] = event.target.value;
    }
    handleValidity(formBasal, event, erroMacros);
  };

  const eventos = ["click", "touchstart", "change", "keyup"];

  eventos.forEach((evento) => formMacros.addEventListener(evento, handleEvents));
}
