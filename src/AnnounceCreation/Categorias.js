

const categorias = [
  "Imóveis",
  "Autos e peças",
  "Para a sua casa",
  "Eletrônicos e celulares",
  "Música e hobbies",
  "Esportes e Lazer",
  "Artigos infantis",
  "Animais de estimação",
  "Moda e beleza",
  "Agro e indústria",
  "Comércio e escritório",
  "Serviços",
  "Vagas de emprego"
];

const subcategoria = [
  "Apartamentos",
  "Casas",
  "Carros, vans e utilitários",
  "Motos"
];

function ChooseCategory(param) {
  if (param == null) {
    console.log("NullReference");
    return;
  }
}

function subcategory(_subcategorias_){
  for (let i_ = 0; i_ <= subcategoria.length; i_++){
    if(_subcategorias_ == subcategoria[i_]){
      console.log("subcategoria selecionada" + subcategoria[i_])
      return subcategoria[i_]
    }
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
module.exports = {category,subcategory };
