

const categorias = [
  "Imóveis",
  "Autos e peças",
  "Para a sua casa",
  "Eletrônicos e celulares",
];

function ChooseCategory(param) {
  if (param == null) {
    console.log("NullReference");
    return;
  }
}

function category(_categorias_) {
  for (let i = 0; i <= categorias.length; i++) {
    if (_categorias_ == categorias[i]) {
      console.log("categoria selecionada " + categorias[i]);
      return categorias[i];
    }
  }
}
module.exports = { category };
