import { buscarAlimentoApi } from "./search-alimento-api.js";
import { dietaGanharTwin } from "./dieta-ganhar-twin.js";
const listaDietasImportadas = [dietaGanharTwin];

export function initMinhaDieta(dadosMacros) {
  const dietaMontada = [];

  const dietaEscolhida = document.querySelectorAll(".escolha-dieta button");

  dietaEscolhida.forEach((dieta) => {
    dieta.addEventListener("click", (event) => {
      dieta.disabled = true;
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
        });
      }
      setTimeout(() => {
        printDieta(dietaMontada);
      }, 600);
    });
  });

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
              p.description
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
               g.description
            ]);
          });
        });
      });
    }
    return refeMontada;
  };

  const printDieta = function (dieta) {
    const minhaDieta = document.querySelector(".refeicao");

    let refeicoes = [];
    dieta.forEach((refe) => {
      let innerRefeicoes = `<div class='refeicoes'>
      <h3 class="titulo-refeicao">${refe[0].descricao}</h3>`;
      refeicoes.push(innerRefeicoes);

      for (let i = 1; i < refe.length; i++) {
        const ref = refe[i];
          let montarRefeicoes = `<div class="lista-alimentos">
            <div>
              <span class="gDescanso">${ref[0]}g</span>
              <span class="gTreino">${ref[1]}g</span>
              <span class="gCardio">${ref[2]}g</span>
              <span class="gCardioTreino">${ref[3]}g</span>
            </div>
            <p class="descricao-alimento">${ref[4]}g</p>
          </div>`;
          minhaDieta.innerHTML = montarRefeicoes;

          refeicoes.push(montarRefeicoes);
          //console.log(montarRefeicoes);
      }
    });
    let joinRefeicoes = refeicoes.join(" ");
    minhaDieta.innerHTML = joinRefeicoes;
    //console.log(refeicoes);
  };
}
