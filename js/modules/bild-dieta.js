import { buscarAlimentoApi } from "./search-alimento-api.js";
import { dietaGanharTwin } from "./dieta-ganhar-twin.js";

console.log(dietaGanharTwin)

export function initMinhaDieta(dadosMacros) {

}

buscarAlimentoApi("batata in").then((listaEncontrada) => {
  listaEncontrada.forEach(alimento => {
    const gord = +alimento.lipid_g;
    console.log(alimento.description, alimento.energy_kcal, alimento.carbohydrate_g, alimento.protein_g, +gord.toFixed(1))
  });
});

