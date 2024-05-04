import { dadosMacros } from "./calc-macros.js";
import { buscarAlimentoApi } from "./search-alimento-api.js";
import {
  observacao,
  dietaGanharTwin,
} from "./dietas-modelos/dieta-ganhar-twin.js";
import { printDieta } from "./print-dieta.js";

export const listaDietasImportadas = [dietaGanharTwin];

const dietaEscolhida = document.querySelectorAll(".lista-dietas button");
const minhaDieta = document.querySelector(".refeicao");

let dietaMontada = [];

export function initMinhaDieta() {
  dietaEscolhida.forEach((dieta) => {
    if (!dieta.classList.contains("event")) {
      dieta.addEventListener("click", (event) => {
        minhaDieta.innerHTML = `<div class="progress">
        <div class="color"></div>
      </div><style>
      .refeicao {
        border: none;
      }</style>`;

        dieta.disabled = true;
        const escolhida = dieta.dataset.dieta;

        localStorage.setItem("dietaImportada", escolhida);

        calcPrint(listaDietasImportadas[escolhida]);
      });
    }
    dieta.setAttribute("class", "event");
  });
}

export const calcPrint = function (dietaImportada) {
  if (dietaImportada) {
    dietaImportada.forEach((ref, i) => {
      dietaMontada.push(
        calcRefeicoes(ref.descricao, ref.proteina, ref.carboidrato, ref.gordura)
      );
    });
  }
  let timeControl = 0;
  switch (window.navigator.connection.effectiveType) {
    case "5g":
      timeControl = 500;
      break;
    case "4g":
      timeControl = 950;
      break;
      case "3g":
        timeControl = 950;
        break;
    case "2g":
      timeControl = 9000;
      break;
  }
    setTimeout(() => {
      printDieta(dietaMontada);

    }, timeControl);
};

const calcRefeicoes = (descricao, proteinas, carboidratos, gorduras) => {
  const refeMontada = [];
  refeMontada.push({ descricao });

  if (proteinas) {
    proteinas.forEach((p) => {
      buscarAlimentoApi(p.description).then((listaEncontrada) => {
        listaEncontrada.forEach((a) => {
          const percentProtGramas = (dadosMacros.proteina / 100) * p.percent;
          const protAlimPor100g = a.protein_g;
          const gramasDeAlimentoPRefe =
            (percentProtGramas / protAlimPor100g) * 100;
          refeMontada.push([
            gramasDeAlimentoPRefe.toFixed(0),
            gramasDeAlimentoPRefe.toFixed(0),
            gramasDeAlimentoPRefe.toFixed(0),
            gramasDeAlimentoPRefe.toFixed(0),
            p.description,
          ]);
        });
      });
    });
  }

  if (carboidratos) {
    carboidratos.forEach((c) => {
      buscarAlimentoApi(c.description).then((listaEncontrada) => {
        listaEncontrada.forEach((a) => {
          const carbAlimPor100g = a.carbohydrate_g;

          const percentCarbGramasDescanso =
            (dadosMacros.carboDescanso / 100) * c.percent;
          const percentCarbGramasTreino =
            (dadosMacros.carboTreino / 100) * c.percent;
          const percentCarbGramasCardio =
            (dadosMacros.carboCardio / 100) * c.percent;
          const percentCarbGramasCardioTreino =
            (dadosMacros.carboTreinoCardio / 100) * c.percent;
          const gramasDescando =
            (percentCarbGramasDescanso / carbAlimPor100g) * 100;
          const gramasTreino =
            (percentCarbGramasTreino / carbAlimPor100g) * 100;
          const gramasCardio =
            (percentCarbGramasCardio / carbAlimPor100g) * 100;
          const gramasCardioTreino =
            (percentCarbGramasCardioTreino / carbAlimPor100g) * 100;

          refeMontada.push([
            gramasDescando.toFixed(0),
            gramasTreino.toFixed(0),
            gramasCardio.toFixed(0),
            gramasCardioTreino.toFixed(0),
            c.description,
          ]);
        });
      });
    });
  }

  if (gorduras) {
    gorduras.forEach((g) => {
      buscarAlimentoApi(g.description).then((listaEncontrada) => {
        listaEncontrada.forEach((a) => {
          const percentGordGramas = (dadosMacros.gordura / 100) * g.percent;
          const gordAlimPor100g = a.lipid_g;
          const gramasDeAlimentoPRefe =
            (percentGordGramas / gordAlimPor100g) * 100;
          refeMontada.push([
            gramasDeAlimentoPRefe.toFixed(0),
            gramasDeAlimentoPRefe.toFixed(0),
            gramasDeAlimentoPRefe.toFixed(0),
            gramasDeAlimentoPRefe.toFixed(0),
            g.description,
          ]);
        });
      });
    });
  }
  return refeMontada;
};


const observaoDieta = document.querySelector(".observacao-tabela-dieta");


const escolherOutraDieta = document.querySelector(".escolher-outra-dieta");

escolherOutraDieta.addEventListener("click", () => {
  dietaEscolhida.forEach((dieta) => {
    zerarDietaMontada();
    dieta.disabled = false;
  });
});

export const zerarDietaMontada = function () {
  const refeicaoChidrens = minhaDieta.childNodes;
  refeicaoChidrens.forEach((Chidrens) => {
    Chidrens.remove();
  });
  observaoDieta.innerHTML = "";
  dietaMontada = [];
};
