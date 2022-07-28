const categoryList = require("../AnnounceCreation/Categorias.js");
const puppeteer = require('puppeteer');
const myList = require("../products/products.json");
const mycookies = require("../../cookies.json")

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

        console.log("[ACCOUNT-STATUS] Account enable to create post");
        console.log("[-]--------------------------------------[-]");
        console.log("[ACCOUNT-SELECTED] User: " + data_[index].user);
        console.log("[-]--------------------------------------[-]");
        console.log(data_[index].announce[product_count]);
        console.log(".");
        console.log(".");
        console.log(".");
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
    const cookiesString = fs.readFileSync("cookies.json");
    const cookies = JSON.parse(cookiesString);
    await page.setCookie(...cookies);

    //await page.setViewport( { 'width' : width, 'height' : height } );
    console.log("[+] Acessando OLX...");
    await page.goto('https://www.olx.com.br/', { waitUntil: 'networkidle0' });
    try {
        await page.click("[href='https://conta.olx.com.br/anuncios']");

    } catch (err) {
        console.log("[ERROR] " + err);
        await page.close();
        await page.browser().disconnect;
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
        
        await page.waitForSelector('[label="Título*"]');
        await page.type('[label="Título*"]', `${data_[index].announce[i].title}`);
        console.log("[+] 1");
        await page.type('[label="Descrição*"]', `${data_[index].announce[i].description}`);
        console.log("[+] 2");
        await page.click(`[title ="${data_[index].announce[i].category}"]`);
        await page.click(`[title="${data_[index].announce[i].subCategory}"]`);
        console.log("[+] 3");
        await page.type('[label="Localização*"]', `${data_[index].announce[i].location}`);
        await page.waitForTimeout(500);
        console.log("[+] 4");
        await page.select('[label="Marca*"]', `${data_[index].announce[i].marca}`);
        console.log("[+] 5");
        await page.select('[label="Modelo*"]', `${data_[index].announce[i].model}`);
        console.log("[+] 6");
        await page.select('[label="Versão*"]', `${data_[index].announce[i].version}`);
        console.log("[+] 7");
        await page.select('[label="Ano do modelo*"]', `${data_[index].announce[i].model_year}`);
        console.log("[+] 8");
        await page.type('[label="Quilometragem*"]', `${data_[index].announce[i].mileage}`);
        const [boxGNV] = await page.$x("//span[contains(., 'com Kit GNV')]");
        await boxGNV.click();
        console.log("[+] 9");
        await page.select('[label="Cor"]', `${data_[index].announce[i].color}`);
        await page.select('[label="Aceita Trocas"]', `${data_[index].announce[i].isTradable}`);
        const [box1] = await page.$x("//span[contains(., 'Financiado')]");
        await box1.click();
        await page.select('[label="Único dono"]', `${data_[index].announce[i].unicoDono}`);
        await page.type('[label="Preço (R$)"]', `${data_[index].announce[i].price}`);
        console.log("[+] 10");
        console.log("[+] Gerando PDF e Guardando dados...");
        const element = await page.$("input[type=file]");
        await element.uploadFile('./test.png');
        await page.screenshot({ path: "Generic.png" });

        console.log("[+] DONE");
        console.log("[UPDATE] Call UpdateFunction... next index for new post ");
        console.log(".");
        console.log(".");
        console.log(".");
        UpdateNewIndex();



    } catch (err) {
        console.log("[ERROR] " + err);
        console.log(".");
        console.log(".");
        console.log(".");
        await page.browser().disconnect;
        await page.close();
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
    if (data_[index].anunciosCadastrados == max_account_post) {
        this.index++;
        product_count = 0;
        console.log("[NEW_USER] CHANGE USER ACCOUNT, NEW INDEX INSERTED");
    } else {
        product_count++;
        console.log("[STATUS] actualy index: " + index);
        console.log("[UPDATE] Product count for " + data_[index].user + " is " + product_count);
    }
}
async function GenerateAnnounces() {

    let product_info = this.product_count;
    let response = await GetPostData(index);

    console.log("[STATUS-CODE] " + response);
    if (response) {
        await SettingDefaultValues();

        await CreateAnnounces(index, product_info);
    }
}
module.exports = { GenerateAnnounces }