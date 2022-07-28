const categoryList = require("../AnnounceCreation/Categorias.js");
const puppeteer = require('puppeteer');
const myList = require("../products/products.json");
const fs = require("fs");
// vars and constant

let data_ = JSON.parse(JSON.stringify(myList));


async function GetPostData(index) {
    //Verifica se a conta cadastrada tem postagens disponiveis.
    let data_announce = data_[index].anunciosCadastrados;
    console.log("[CHECKING] Verify account announces. . .");
    if (data_announce >= max_account_post) {
        this.enable_to_post = false;
    } else {
        console.log("[ACCOUNT-STATUS] Account enable to post, post's to enable to write: " + data_announce[index].anunciosCadastrados - max_account_post);
        console.log("[-]--------------------------------------[-]");
        console.log("[ACCOUNT-SELECTED] User: " + data_[index].user);
        console.log("[-]--------------------------------------[-]");
        return true;
    }

}
async function CreateAnnounces(index, index_2) {
    let i = index_2;
    const width = 1024;
    const height = 1600;
    const browser = await puppeteer.launch({
        headless: true,
        'defaultViewport': { 'width': width, 'height': height }
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(90000);

    console.log("[SETUP] Setting WebCookies");
    //loading cookies.
    const cookiesString = await fs.readFile("./cookies.json");
    const cookies = JSON.parse(cookiesString);
    await page.setCookie(...cookies);

    //await page.setViewport( { 'width' : width, 'height' : height } );
    console.log("[+] Acessando OLX...");
    await page.goto('https://www.olx.com.br/', { waitUntil: 'networkidle0' });
    try {
        await page.click("[href='https://conta.olx.com.br/anuncios']");
    } catch (err) {
        console.log("[ERROR] " + err);
        await page.browser().disconnect;
        await page.close()
        CreateAnnounces(index);
    }

    //RETIRADA DO COOKIE DA FRENTE DO BOTÃO DE ENTRADA
    await page.waitForNavigation();
    await page.waitForSelector('#cookie-notice-ok-button');
    await page.click('#cookie-notice-ok-button');

    console.log("[+] INSERT EMAIL AND PASSWORD");
    await page.type('[type="email"]', `${data_[index].login}`);
    await page.type('[type="password"]', `${data_[index].password}`);

    const [button] = await page.$x("//button[contains(., 'Entrar')]");
    if (button) {
        await button.click();
        console.log("[+] SUCESSFULL LOGIN");
    }
    try {
        await page.waitForNavigation();
        await page.goto('https://www2.olx.com.br/desapega', { waitUntil: 'networkidle0' });
    } catch (err) {
        console.log(["[ERROR] "] + err);
        console.log("[RESET] Redirecte to home page");

        await page.goto('https://www.olx.com.br/', { waitUntil: 'networkidle0' });
        await page.waitForSelector("[href='https://conta.olx.com.br/anuncios']");
        await page.click("[href='https://conta.olx.com.br/anuncios']");


    }

    console.log("[+] CREATE PRODUCT");

    try {
        await page.type('[label="Título*"]', `${data_[index].announce[i].title}`);
        await page.type('[label="Descrição*"]', `${data_[index].announce[i].description}`);
        await page.click(`[title ="${data_[index].announce[i].category}"]`);
        await page.click(`[title="${data_[index].announce[i].subCategory}"]`);
        await page.type('[label="Localização*"]', `${data_[index].announce[i].location}`);
        await page.waitForTimeout(500);
        await page.select('[label="Marca*"]', `${data_[index].announce[i].marca}`);
        await page.select('[label="Modelo*"]', `${data_[index].announce[i].model}`);
        await page.select('[label="Versão*"]', `${data_[index].announce[i].version}`);
        await page.select('[label="Ano do modelo*"]', `${data_[index].announce[i].model_year}`);
        await page.type('[label="Quilometragem*"]', `${data_[index].announce[i].mileage}`);
        //await page.select('[label="Cilindradas*"]', `${data_[index].announce[i].portas}`);
        //await page.select('[label="Tipo de moto"]', `${data_[index].announce[i].engine}`);
        const [boxGNV] = await page.$x("//span[contains(., 'com Kit GNV')]");
        await boxGNV.click();

        await page.select('[label="Cor"]', `${data_[index].announce[i].color}`);
        await page.select('[label="Aceita Trocas"]', `${data_[index].announce[i].isTradable}`);
        const [box1] = await page.$x("//span[contains(., 'Financiado')]");
        await box1.click();
        await page.select('[label="Único dono"]', `${data_[index].announce[i].unicoDono}`);
        await page.type('[label="Preço (R$)"]', `${data_[index].announce[i].price}`);

        console.log("[+] Gerando PDF e Guardando dados...");
        const element = await page.$("input[type=file]");
        await element.uploadFile('./test.png');
        await page.screenshot({ path: "Generic.png" });

        console.log("[+] DONE");
        console.log("[UPDATE] Call UpdateFunction... next index for new post ");

        UpdateNewIndex();



    } catch (err) {
        console.log("[ERROR] " + err);
        console.log(".");
        console.log(".");
        console.log(".");
        await page.browser().disconnect;
        await page.close();

        CreateAnnounces(index, i);
    }

}
//index do produto
let product_count = 0;
//index do usuário
let index = 0;
//numero maximo de postagens
let max_account_post = 2;
let enable_to_post = false;

async function SettingDefaultValues() {
    index = 0;
    max_account_post = 2;
    enable_to_post = false;
    product_count = 0;
}
async function UpdateNewIndex() {
    if(data_[index].anunciosCadastrados == max_account_post){
        this.index++;
        product_count = 0;
        console.log("[NEW_USER] CHANGE USER ACCOUNT, NEW INDEX INSERTED");
    }else{
        product_count++;
        console.log("[UPDATE] Product count for " + data_[index].user + " is " + product_count);
    }
}
async function GenerateAnnounces() {

    for (let i = 0; i <= max_account_post; i++) {
        let product_info = this.product_count;
        let response = await GetPostData(index);

        console.log("[STATUS-CODE] " + response);
        if (response) {
            await SettingDefaultValues();

            await CreateAnnounces(index, product_info);
        }
    }
}
module.exports = { GenerateAnnounces }