
const myList = require("./src/products/products.json");

async function SelectProduct() {
    const data_ = JSON.parse(JSON.stringify(myList));
    console.log(data_[0].anuncio.title);

}

async function teste(){

    await SelectProduct();

}

teste();