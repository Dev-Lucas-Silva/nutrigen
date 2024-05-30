import { dadosForm } from "./init-form.js";
import { initMinhaDieta } from "./bild-dieta.js";
import {
  calcPrint,
  listaDietasImportadas,
  zerarDietaMontada,
} from "./bild-dieta.js";

export let dadosMacros = {};
export let dados = {};

export class TipoDieta {
  constructor(objetivo, biotipo) {
    this.objetivo = objetivo;
    this.biotipo = biotipo;
    this.imcMm =
      (dadosForm.peso * dadosForm.bf - dadosForm.peso) /
      (dadosForm.altura * dadosForm.altura);
    this.taxa = {};
  }

  peformance() {
    switch (this.biotipo) {
      case "ectomorfo":
        this.taxa = {
          proteina: 1.6,
          gordura: 0.4,
        };
        break;
      case "mesomorfo":
        this.taxa = {
          proteina: 1.6,
          gordura: 0.4,
        };
        break;
      case "endomorfo":
        this.taxa = {
          proteina: 1.6,
          gordura: 0.4,
        };
        break;
    }
  }

  ganharManter() {
    switch (this.biotipo) {
      case "ectomorfo":
        this.taxa = {
          proteina: 1.8,
          gordura: 1.3,
        };
        break;
      case "mesomorfo":
        this.taxa = {
          proteina: 2,
          gordura: 1.15,
        };
        break;
      case "endomorfo":
        this.taxa = {
          proteina: 2,
          gordura: 1,
        };
        break;
    }
  }
  perder() {
    switch (this.biotipo) {
      case "ectomorfo":
        this.taxa = {
          proteina: 2,
          gordura: 1,
        };
        break;
      case "mesomorfo":
        this.taxa = {
          proteina: 2.1,
          gordura: 1,
        };
        break;
      case "endomorfo":
        this.taxa = {
          proteina: 2.2,
          gordura: 1,
        };
        break;
    }
  }
  perder25bf() {
    switch (this.biotipo) {
      case "ectomorfo":
        this.taxa = {
          proteina: 1.8,
          gordura: 0.8,
        };
        break;
      case "mesomorfo":
        this.taxa = {
          proteina: 1.8,
          gordura: 0.8,
        };
        break;
      case "endomorfo":
        this.taxa = {
          proteina: 1.8,
          gordura: 0.8,
        };
        break;
    }
  }
  perder40bf20imc() {
    switch (this.biotipo) {
      case "ectomorfo":
        this.taxa = {
          proteina: 1.4,
          gordura: 0.7,
        };
        break;
      case "mesomorfo":
        this.taxa = {
          proteina: 1.4,
          gordura: 0.6,
        };
        break;
      case "endomorfo":
        this.taxa = {
          proteina: 1.4,
          gordura: 0.6,
        };
        break;
    }
  }
  perder40bf() {
    switch (this.biotipo) {
      case "ectomorfo":
        this.taxa = {
          proteina: 2,
          gordura: 1,
        };
        break;
      case "mesomorfo":
        this.taxa = {
          proteina: 2.1,
          gordura: 1,
        };
        break;
      case "endomorfo":
        this.taxa = {
          proteina: 2.2,
          gordura: 1,
        };
        break;
    }
  }
  init() {
    if (this.objetivo === "ganhar" || this.objetivo === "manter") {
      this.ganharManter();
    } else if (this.objetivo === "performance") {
      this.peformance();
    } else if (this.objetivo === "perder" && dadosForm.bf <= 22) {
      this.perder();
    } else if (
      this.objetivo === "perder" &&
      dadosForm.bf > 22 &&
      dadosForm.bf < 39
    ) {
      this.perder25bf();
    } else if (
      this.objetivo === "perder" &&
      dadosForm.bf >= 40 &&
      this.imcMm <= 20
    ) {
      this.perder40bf20imc();
    } else if (
      this.objetivo === "perder" &&
      dadosForm.bf >= 40 &&
      this.imcMm > 25
    ) {
      this.perder40bf();
    }
    return this.taxa;
  }
}
const resultMacros = document.querySelector(".result-basal-contain");
const formMacros = document.getElementById("form-macros");


export function calcProteinas(taxa) {
  let tipoDietaProteina = taxa;
  const proteinas = dadosForm.peso * tipoDietaProteina;
  resultMacros.querySelector(".proteina").innerHTML =
    proteinas.toFixed(0) + "g";
  dadosMacros.proteina = +proteinas.toFixed(0);
  formMacros.proteinaporkg.value = taxa;
}

export function calcGordura(taxa) {
  let tipoDietaGordura = taxa;
  const gordura = dadosForm.peso * tipoDietaGordura;
  resultMacros.querySelector(".gordura").innerHTML = gordura.toFixed(0) + "g";
  dadosMacros.gordura = +gordura.toFixed(0);
  formMacros.gorduraporkg.value = taxa;

}

export function calcCarbo(basal, taxaProteina, taxaGordura, novaTaxa) {
  const carboDescanso =
    ((basal - (taxaProteina * 4 + taxaGordura * 9)) / 4) * (novaTaxa / 100);
  const carboTreino =
    ((dados.resultKcalTreino - (taxaProteina * 4 + taxaGordura * 9)) / 4) *
    (novaTaxa / 100);
  const carboCardio =
    ((dados.resultKcalCardio - (taxaProteina * 4 + taxaGordura * 9)) / 4) *
    (novaTaxa / 100);
  const carboTreinoCardio =
    ((dados.resultKcalTreinoCardio - (taxaProteina * 4 + taxaGordura * 9)) / 4) *
    (novaTaxa / 100);

  if (carboDescanso > 0) {
    resultMacros.querySelector(".carbo-descanso").innerHTML =
      carboDescanso.toFixed(0) + "g";
  } else {
    resultMacros.querySelector(".carbo-descanso").innerHTML = "N/A";
  }
  if (carboTreino > 0) {
    resultMacros.querySelector(".carbo-treino").innerHTML =
      carboTreino.toFixed(0) + "g";
  } else {
    resultMacros.querySelector(".carbo-treino").innerHTML =  "N/A";
  }
  if (carboCardio > 0) {
    resultMacros.querySelector(".carbo-cardio").innerHTML =
      carboCardio.toFixed(0) + "g";
  } else {
    resultMacros.querySelector(".carbo-cardio").innerHTML =  "N/A";
  }
  if (carboTreinoCardio > 0) {
    resultMacros.querySelector(".carbo-treino-cardio").innerHTML =
      carboTreinoCardio.toFixed(0) + "g";
  } else {
    resultMacros.querySelector(".carbo-treino-cardio").innerHTML =  "N/A";
  }

  if (carboDescanso > 0) {
    dadosMacros.carboDescanso = +carboDescanso.toFixed(0);
  } else {
    dadosMacros.carboDescanso = 0;
  }
  if (carboTreino > 0) {
    dadosMacros.carboTreino = +carboTreino.toFixed(0);
  } else {
    dadosMacros.carboTreino = 0;
  }
  if (carboCardio > 0) {
    dadosMacros.carboCardio = +carboCardio.toFixed(0);
  } else {
    dadosMacros.carboCardio = 0;
  }
  if (carboTreinoCardio > 0) {
    dadosMacros.carboTreinoCardio = +carboTreinoCardio.toFixed(0);
  } else {
    dadosMacros.carboTreinoCardio = 0;
  }
}

export function initCalcMacros(
  dado,
  resultKcalTreino,
  resultKcalCardio,
  resultKcalTreinoCardio,
  calcBasal
) {

  dados = {
    dado: dado,
    resultKcalTreino: resultKcalTreino,
    resultKcalCardio: resultKcalCardio,
    resultKcalTreinoCardio: resultKcalTreinoCardio,
    calcBasal: calcBasal
  };

  const taxaCalcMacros = new TipoDieta(
    dadosForm.objetivo,
    dadosForm.biotipo
  ).init();

  calcProteinas(taxaCalcMacros.proteina);

  calcGordura(taxaCalcMacros.gordura);

  formMacros.carboidratoporkg.value = 100;

  calcCarbo(calcBasal, dadosMacros.proteina, dadosMacros.gordura, 100);

  const eventos = ["change"];

  eventos.forEach((evento) =>
    formMacros.proteinaporkg.addEventListener(evento, () => {
      calcProteinas(formMacros.proteinaporkg.value);
        
      localStorage.gkgProteina = proteinaporkg.value;

      calcCarbo(
        calcBasal,
        dadosMacros.proteina,
        dadosMacros.gordura,
        formMacros.carboidratoporkg.value
      );

      zerarDietaMontada();
      const myValue = localStorage.getItem("dietaImportada");
      calcPrint(listaDietasImportadas[myValue]);
    })
  );

  eventos.forEach((evento) =>
    formMacros.gorduraporkg.addEventListener(evento, () => {
      calcGordura(formMacros.gorduraporkg.value);

        localStorage.gkgGordura = gorduraporkg.value;

      calcCarbo(
        calcBasal,
        dadosMacros.proteina,
        dadosMacros.gordura,
        formMacros.carboidratoporkg.value
      );

      zerarDietaMontada();
      const myValue = localStorage.getItem("dietaImportada");
      calcPrint(listaDietasImportadas[myValue]);
    })
  );

  eventos.forEach((evento) =>
    formMacros.carboidratoporkg.addEventListener(evento, () => {
      calcCarbo(
        calcBasal,
        dadosMacros.proteina,
        dadosMacros.gordura,
        formMacros.carboidratoporkg.value
      );
      localStorage.gkgCarbo = carboidratoporkg.value;

      zerarDietaMontada();
      const myValue = localStorage.getItem("dietaImportada");
      calcPrint(listaDietasImportadas[myValue]);
    })
  );
  initMinhaDieta();
}
