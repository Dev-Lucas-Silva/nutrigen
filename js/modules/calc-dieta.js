export default function initCalcDieta() {
  const formBasal = document.getElementById("form-basal");
  const gridBfHomem = document.querySelector(".grid-bf-homem");
  const gridBfMulher = document.querySelector(".grid-bf-mulher");
  const resultBasal = document.querySelector(".result-basal");

  const eventos = ["click", "touchstart", "change", "keyup"];

  const dados = {};

  const calcularTmb = () => {
    resultBasal.querySelector(".result-bf").innerHTML = dados.bf * 100 + "%";

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
  };

  const handleValidity = (event) => {
    const target = event.target;
    const erro = formBasal.querySelector(".erro");

    if (!dados[target.name]) {
      target.classList.add("invalido");
    } else {
      target.classList.remove("invalido");
    }
    formBasal.submit.addEventListener("click", () => {
      if (
        dados.altura &&
        dados.idade &&
        dados.peso &&
        dados.sexo &&
        dados.bf
      ) {
        erro.classList.remove("invalido");
        calcularTmb();
      } else {
        erro.classList.add("invalido");
      }
    });
  };

  const handleEvents = (event) => {
    dados[event.target.name] = event.target.value;
    if (dados.sexo === "masculino") {
      gridBfMulher.style.display = "none";
      gridBfHomem.style.display = "grid";
    } else if (dados.sexo === "feminino") {
      gridBfHomem.style.display = "none";
      gridBfMulher.style.display = "grid";
    }
    handleValidity(event);
  };

  eventos.forEach((evento) => formBasal.addEventListener(evento, handleEvents));
}
