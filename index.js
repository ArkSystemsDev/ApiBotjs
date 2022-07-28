/*
const myList = require("./src/products/products.json");

async function SelectProduct() {
    const data_ = JSON.parse(JSON.stringify(myList));
    console.log(data_[0].anuncio[1].description);

}

async function teste(){

    await SelectProduct();

}

teste();
*/

const { GetPageCookie } = require("./src/cookies/GetPageCookies");
const { GenerateAnnunces } = require("./src/products/products");

async function teste() {
    GetPageCookie();
    //GenerateAnnunces();
}

teste();