import { buscarAlimentoApi } from "./search-alimento-api.js";
import { dietaGanharTwin } from "./dieta-ganhar-twin.js";

export function initMinhaDieta(dadosMacros) {
  //display bolck nas dietas ou montar sua dieta
  //add event form das dieta (click) => ativar biild dieta
  //bild dieta calcula a dieta
  //print a dieta

  function calcRefeicoes(descricao, proteinas, carboidratos, gorduras) {
    const refeMontada = [];
    refeMontada.push(descricao);

    if(proteinas){
      proteinas.forEach((p) => {
        buscarAlimentoApi(p.description).then((listaEncontrada) => {
          listaEncontrada.forEach((a) => {
            const percentProtGramas =
              (dadosMacros.proteina / 100) * p.percent;
            const protAlimPor100g = a.protein_g;
            const gramasDeAlimentoPRefe =
              (percentProtGramas / protAlimPor100g) * 100;
             refeMontada.push({
              gramas: gramasDeAlimentoPRefe.toFixed(0),
              alimento: p.description
             }) 
          });
        });
      });
    }

    if(carboidratos) {
      carboidratos.forEach((c) => {
        buscarAlimentoApi(c.description).then((listaEncontrada) => {
          listaEncontrada.forEach((a) => {
            const percentCarbGramas =
              (dadosMacros.carboDescanso / 100) * c.percent;
            const carbtAlimPor100g = a.carbohydrate_g;
            const gramasDeAlimentoPRefe =
              (percentCarbGramas / carbtAlimPor100g) * 100;
             refeMontada.push({
              gramas: gramasDeAlimentoPRefe.toFixed(0),
              alimento: c.description
             }) 
          });
        });
      });
    }

    if(gorduras){
      gorduras.forEach((g) => {
        buscarAlimentoApi(g.description).then((listaEncontrada) => {
          listaEncontrada.forEach((a) => {
            const percentGordGramas =
              (dadosMacros.gordura / 100) * g.percent;
            const gordAlimPor100g = a.lipid_g;
            const gramasDeAlimentoPRefe =
              (percentGordGramas / gordAlimPor100g) * 100;
             refeMontada.push({
              gramas: gramasDeAlimentoPRefe.toFixed(0),
              alimento: g.description
             }) 
          });
        });
      });
    }

console.log(refeMontada)
    return refeMontada
  }


const dietaMontada = [];

  function refe1() {
    const dietaEscolhida = [...dietaGanharTwin];
    dietaEscolhida.forEach((ref, i) => {
      //console.log(ref.gordura);
      dietaMontada.push(calcRefeicoes(ref.descricao,ref.proteina, ref.carboidrato, ref.gordura)
      )


    });
  }
  refe1();
  console.log(dietaMontada)
}
