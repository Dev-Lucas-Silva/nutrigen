export async function buscarAlimentoApi(seachAlimento) {
  try {
    const response = await fetch("../../alimentos-api/taco.json");
    const json = await response.json();

    const listaEncontrada = json.filter((alimentoApi) => {
      const alimentoApiLCase = alimentoApi.description.toLowerCase();
      const tratamentoAlimentoApi = alimentoApiLCase
        .replace(/ç/g, "c")
        .replace(/ã/g, "a")
        .replace(/ú/g, "u")
        .replace(/ó/g, "o")
        .replace(/é/g, "e")
        .replace(/ê/g, "e")
        .replace(/,/g, "")
        .replace(/-/g, "")
        .replace(/á/g, "a")
        .replace(/â/g, "a")
        .replace(/í/g, "i")
        .replace(/ô/g, "o")
        .replace(/ü/g, "u");

      const alimento = seachAlimento.toLowerCase();

      return (
        alimentoApiLCase.includes(alimento) ||
        tratamentoAlimentoApi.includes(alimento)
      );
    });

    return listaEncontrada;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return []; 
  }
}
/*
buscarAlimentoApi('arroz').then((listaEncontrada) => {
  listaEncontrada.forEach(alimento => {
    console.log(alimento)
  });
});  
*/
