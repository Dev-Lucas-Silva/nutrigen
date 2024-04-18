import { dadosMacros } from "./calc-macros.js";
import { buscarAlimentoApi } from "./search-alimento-api.js";
import { observacao, dietaGanharTwin } from "./dietas-modelos/dieta-ganhar-twin.js";

export const listaDietasImportadas = [dietaGanharTwin];

const dietaEscolhida = document.querySelectorAll(".escolha-dieta button");

let dietaMontada = [];

export function initMinhaDieta() {
  dietaEscolhida.forEach((dieta) => {
    if (!dieta.classList.contains("event")) {
      dieta.addEventListener("click", (event) => {
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

  setTimeout(() => {
    printDieta(dietaMontada);
  }, 700);
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

const minhaDieta = document.querySelector(".refeicao");

const printDieta = function (dieta) {
  let refeicoes = [];

  dieta.forEach((refe) => {
    let innerRefeicoes = `<div class='refeicoes'>
      <h3 class="titulo-refeicao">${refe[0].descricao}</h3>`;
    refeicoes.push(innerRefeicoes);

    for (let i = 1; i < refe.length; i++) {
      const ref = refe[i];
      let montarRefeicoes = `<div class="lista-alimentos">
      <p class="descricao-alimento">${ref[4]}</p>
            <div>
              <span class="gDescanso">${ref[0]}g</span>
              <span class="gTreino">${ref[1]}g</span>
              <span class="gCardio">${ref[2]}g</span>
              <span class="gCardioTreino">${ref[3]}g</span>
            </div>

          </div>
          `;
      refeicoes.push(montarRefeicoes);
    }
  });

  let joinRefeicoes = refeicoes.join(" ");
  minhaDieta.innerHTML = joinRefeicoes;
  const observaoDieta = document.querySelector('.observacao-tabela-dieta');
  observaoDieta.innerHTML = observacao;
};

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
  dietaMontada = [];
};
