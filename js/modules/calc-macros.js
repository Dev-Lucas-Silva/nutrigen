import { dadosForm } from "./init-form.js";
import { initMinhaDieta } from "./bild-dieta.js";
import {
  calcPrint,
  listaDietasImportadas,
  zerarDietaMontada,
} from "./bild-dieta.js";

export let dadosMacros = {};

export function initCalcMacros(
  dado,
  resultKcalTreino,
  resultKcalCardio,
  resultKcalTreinoCardio,
  calcBasal
) {
  class TipoDieta {
    constructor(objetivo, biotipo) {
      this.objetivo = objetivo;
      this.biotipo = biotipo;
      this.imcMm =
        (dadosForm.peso * dadosForm.bf - dadosForm.peso) /
        (dadosForm.altura * dadosForm.altura);
      this.taxa = {};
    }

    peformance() {
      if (this.biotipo === "ectomorfo") {
        this.taxa = {
          proteina: 1.6,
          gordura: 0.4,
        };
      } else if (this.biotipo === "mesomorfo") {
        this.taxa = {
          proteina: 1.6,
          gordura: 0.4,
        };
      } else if (this.biotipo === "endomorfo") {
        this.taxa = {
          proteina: 1.6,
          gordura: 0.4,
        };
      }
    }

    ganharManter() {
      if (this.biotipo === "ectomorfo") {
        this.taxa = {
          proteina: 1.8,
          gordura: 1.3,
        };
      } else if (this.biotipo === "mesomorfo") {
        this.taxa = {
          proteina: 2,
          gordura: 1.15,
        };
      } else if (this.biotipo === "endomorfo") {
        this.taxa = {
          proteina: 2,
          gordura: 1,
        };
      }
    }
    perder() {
      if (this.biotipo === "ectomorfo") {
        this.taxa = {
          proteina: 2,
          gordura: 1,
        };
      } else if (this.biotipo === "mesomorfo") {
        this.taxa = {
          proteina: 2.1,
          gordura: 1,
        };
      } else if (this.biotipo === "endomorfo") {
        this.taxa = {
          proteina: 2.2,
          gordura: 1,
        };
      }
    }
    perder25bf() {
      if (this.biotipo === "ectomorfo") {
        this.taxa = {
          proteina: 1.8,
          gordura: 0.8,
        };
      } else if (this.biotipo === "mesomorfo") {
        this.taxa = {
          proteina: 1.8,
          gordura: 0.8,
        };
      } else if (this.biotipo === "endomorfo") {
        this.taxa = {
          proteina: 1.8,
          gordura: 0.8,
        };
      }
    }
    perder40bf20imc() {
      if (this.biotipo === "ectomorfo") {
        this.taxa = {
          proteina: 1.4,
          gordura: 0.7,
        };
      } else if (this.biotipo === "mesomorfo") {
        this.taxa = {
          proteina: 1.4,
          gordura: 0.6,
        };
      } else if (this.biotipo === "endomorfo") {
        this.taxa = {
          proteina: 1.4,
          gordura: 0.6,
        };
      }
    }
    perder40bf() {
      if (this.biotipo === "ectomorfo") {
        this.taxa = {
          proteina: 2,
          gordura: 1,
        };
      } else if (this.biotipo === "mesomorfo") {
        this.taxa = {
          proteina: 2.1,
          gordura: 1,
        };
      } else if (this.biotipo === "endomorfo") {
        this.taxa = {
          proteina: 2.2,
          gordura: 1,
        };
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

  const taxaCalcMacros = new TipoDieta(
    dadosForm.objetivo,
    dadosForm.biotipo
  ).init();

  const resultMacros = document.querySelector(".result-basal-contain");
  const formMacros = document.getElementById("form-macros");

  const eventos = ["click"];

  function calcProteinas(taxa) {
    let tipoDietaProteina = taxa;
    resultMacros.querySelector(".gkgProteina").innerHTML =
      tipoDietaProteina + "g";
    const proteinas = dado.peso * tipoDietaProteina;
    resultMacros.querySelector(".proteina").innerHTML =
      proteinas.toFixed(0) + "g";
    dadosMacros.proteina = +proteinas.toFixed(0);
  }
  calcProteinas(taxaCalcMacros.proteina);

  function calcGordura(taxa) {
    let tipoDietaGordura = taxa;
    resultMacros.querySelector(".gkgGordura").innerHTML =
      tipoDietaGordura + "g";
    formMacros.carboidratoporkg.value = 100;
    const gordura = dado.peso * tipoDietaGordura;
    resultMacros.querySelector(".gordura").innerHTML = gordura.toFixed(0) + "g";
    dadosMacros.gordura = +gordura.toFixed(0);
  }
  calcGordura(taxaCalcMacros.gordura);

  resultMacros.querySelector(".gkgCarbo").innerHTML = 100 + "%";

  function calcCarbo(basal, taxaProteina, taxaGordura, novaTaxa) {
    const carboDescanso =
      ((basal - (taxaProteina * 4 + taxaGordura * 9)) / 4) * (novaTaxa / 100);
    const carboTreino =
      ((resultKcalTreino - (taxaProteina * 4 + taxaGordura * 9)) / 4) *
      (novaTaxa / 100);
    const carboCardio =
      ((resultKcalCardio - (taxaProteina * 4 + taxaGordura * 9)) / 4) *
      (novaTaxa / 100);
    const carboTreinoCardio =
      ((resultKcalTreinoCardio - (taxaProteina * 4 + taxaGordura * 9)) / 4) *
      (novaTaxa / 100);

    if (carboDescanso > 0) {
      resultMacros.querySelector(".carbo-descanso").innerHTML =
        carboDescanso.toFixed(0) + "g";
    } else {
      resultMacros.querySelector(".carbo-descanso").innerHTML = 0 + "g";
    }
    if (carboTreino > 0) {
      resultMacros.querySelector(".carbo-treino").innerHTML =
        carboTreino.toFixed(0) + "g";
    } else {
      resultMacros.querySelector(".carbo-treino").innerHTML = 0;
    }
    if (carboCardio > 0) {
      resultMacros.querySelector(".carbo-cardio").innerHTML =
        carboCardio.toFixed(0) + "g";
    } else {
      resultMacros.querySelector(".carbo-cardio").innerHTML = 0;
    }
    if (carboTreinoCardio > 0) {
      resultMacros.querySelector(".carbo-treino-cardio").innerHTML =
        carboTreinoCardio.toFixed(0) + "g";
    } else {
      resultMacros.querySelector(".carbo-treino-cardio").innerHTML = 0;
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
  calcCarbo(calcBasal, dadosMacros.proteina, dadosMacros.gordura, 100);

  const minhaDieta = document.querySelector(".refeicao");

  eventos.forEach((evento) =>
    formMacros.proteinaporkg.addEventListener(evento, () => {
      calcProteinas(formMacros.proteinaporkg.value);

      resultMacros.querySelector(".gkgCarbo").innerHTML =
        formMacros.carboidratoporkg.value + "%";

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

      resultMacros.querySelector(".gkgCarbo").innerHTML =
        formMacros.carboidratoporkg.value + "%";

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
      resultMacros.querySelector(".gkgCarbo").innerHTML =
        formMacros.carboidratoporkg.value + "%";
      zerarDietaMontada();
      const myValue = localStorage.getItem("dietaImportada");
      calcPrint(listaDietasImportadas[myValue]);
    })
  );
  initMinhaDieta();
}
