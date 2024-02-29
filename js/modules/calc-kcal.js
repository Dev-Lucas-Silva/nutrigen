export default function initCalcKcal() {
  const formKcal = document.getElementById("form-kcal");
  const resultKcal = document.querySelector(".result-kcal");
  const erroKcal = formBasal.querySelector(".erro");

  const dados = {};
  dados.length = 0;


    const resultadoBf = dados.bf * 100;
    resultBasal.querySelector(".result-bf").innerHTML =
      resultadoBf.toFixed(1) + "%";

    const resultadoMm = dados.peso - dados.peso * dados.bf;
    resultBasal.querySelector(".result-mm").innerHTML =
      resultadoMm.toFixed(2) + " Kg";

    const resultadoMg = dados.peso * dados.bf;
    resultBasal.querySelector(".result-mg").innerHTML =
      resultadoMg.toFixed(2) + " Kg";

    if (dados.sexo === "masculino") {
      const resultadoTmbh =
        66 + 13.7 * dados.peso + 5 * dados.altura - 6.8 * dados.idade;
      resultBasal.querySelector(".result-tmb").innerHTML =
        resultadoTmbh.toFixed(0) + " Kcal";
    } else if (dados.sexo === "feminino") {
      const resultadoTmbm =
        655 + 9.6 * dados.peso + 1.8 * dados.altura - 4.7 * dados.idade;
      resultBasal.querySelector(".result-tmb").innerHTML =
        resultadoTmbm.toFixed(0) + " Kcal";
    }


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
    handleValidity(formKcal, event, erroKcal);
  };

  const eventos = ["click", "touchstart", "change", "keyup"];

  eventos.forEach((evento) => formKcal.addEventListener(evento, handleEvents));
}
