import { buscarAlimentoApi } from "./search-alimento-api.js";
import { dietaGanharTwin } from "./dieta-ganhar-twin.js";
const listaDietasImportadas = [dietaGanharTwin];

export function initMinhaDieta(dadosMacros) {
  const dietaMontada = [];

  function bildDieta() {
    const dietaEscolhida = document.querySelectorAll(".escolha-dieta button");
    dietaEscolhida.forEach((dieta) => {
      dieta.addEventListener("click", (event) => {
        const escolhida = dieta.dataset.dieta;
        const dietaImportada = listaDietasImportadas[escolhida];
        if (dietaImportada) {
          dietaImportada.forEach((ref, i) => {
            dietaMontada.push(
              calcRefeicoes(
                ref.descricao,
                ref.proteina,
                ref.carboidrato,
                ref.gordura
              )
            );
            printDieta(dietaMontada);
          });
        }
      });
    });
  }
  bildDieta();

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
            refeMontada.push({
              gramasDescando: gramasDeAlimentoPRefe.toFixed(0),
              gramasTreino: gramasDeAlimentoPRefe.toFixed(0),
              gramasCardio: gramasDeAlimentoPRefe.toFixed(0),
              gramasCardioTreino: gramasDeAlimentoPRefe.toFixed(0),

              alimento: p.description,
            });
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

            refeMontada.push({
              gramasDescando: gramasDescando.toFixed(0),
              gramasTreino: gramasTreino.toFixed(0),
              gramasCardio: gramasCardio.toFixed(0),
              gramasCardioTreino: gramasCardioTreino.toFixed(0),

              alimento: c.description,
            });
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
            refeMontada.push({
              gramasDescando: gramasDeAlimentoPRefe.toFixed(0),
              gramasTreino: gramasDeAlimentoPRefe.toFixed(0),
              gramasCardio: gramasDeAlimentoPRefe.toFixed(0),
              gramasCardioTreino: gramasDeAlimentoPRefe.toFixed(0),

              alimento: g.description,
            });
          });
        });
      });
    }
    return refeMontada;
  };

  const printDieta = function (dieta) {
    const minhaDieta = document.querySelector(".dieta-montada");
    dieta.forEach((refe) => {
      refe.forEach(qqq => {

        console.log(qqq);
      });

      let refeicoes = [];
      let innerRefeicoes = `<div class='refeicao'>
      <h3 class="titulo-refeicao">${refe.descricao}</h3>
      </div>`;
      let montarRefeicoes = `<div class="lista-alimentos">
        <div>
          <span class="gTreino">100g</span>
          <span class="gCardio">100g</span>
          <span class="gCardioTreino">100g</span>
          <span class="gCardioTreino">100g</span>
        </div>
        <p class="descricao-alimento">Lorem ipsum dolor sit amet, conseLorem ipsum do</p>
      </div>`;
    });
  };
}
