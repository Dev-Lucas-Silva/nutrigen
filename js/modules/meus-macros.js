export function initMinhaDieta(dadosMacros) {
  console.log(dadosMacros);
}

fetch('../../alimentos-api/taco.json').then(r => r.json()).then(json => {
  json.forEach(element => {
    if(element.id ===1 )
    console.log(element.id)
    
  });
});
