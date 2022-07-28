const categoryList = require("../AnnounceCreation/Categorias.js");
const puppeteer = require('puppeteer');
const myList = require("../products/products.json");

// vars and constant
let product_count = 0;
let index = 0;
let max_account_post = 2;
let enable_to_post = false;
let data_ = JSON.parse(JSON.stringify(myList));


async function GetPostData(index) {
    //Verifica se a conta cadastrada tem postagens disponiveis.
    let data_announce = data_[index].anunciosCadastrados;
    console.log("[CHECKING] Verify account announces. . .");
    if (data_announce >= max_account_post) {
        this.enable_to_post = false;
    } else {
        console.log("[ACCOUNT-STATUS] Account enable to post");
        console.log("[ACCOUNT-SELECTED] User: " + data_[index].user);
        console.log(".");
        console.log(".");
        return true;
    }

}
async function CreateAnnounces(index) {
    let i = 0;
    const width = 1024;
    const height = 1600;
    const browser = await puppeteer.launch({
        headless: true,
        'defaultViewport' : { 'width' : width, 'height' : height }
    });
    const page = await browser.newPage();
    console.log("[+] Acessando OLX...");
    await page.goto('https://www.olx.com.br/');
    await page.click("[href='https://conta.olx.com.br/anuncios']");

    //RETIRADA DO COOKIE DA FRENTE DO BOTÃO DE ENTRADA
    await page.waitForNavigation();
    await page.waitForSelector('#cookie-notice-ok-button');
    await page.click('#cookie-notice-ok-button');

    console.log("[+] INSERT EMAIL AND PASSWORD");
    await page.type('[type="email"]', `${data_[index].login}`);
    await page.type('[type="password"]', `${data_[index].password}`);
    await page.click("[class='sc-kGXeez kgGtxX']");
    try {
        await page.waitForNavigation();
        await page.goto('https://www2.olx.com.br/desapega');
    } catch (err) {
        console.log(["[ERROR] "] + err);
        console.log("[RESET] Redirecte to home page");
        try {
            await page.goto('https://www.olx.com.br/');
            await page.waitForNavigation();
            await page.click("[href='https://conta.olx.com.br/anuncios']");
        }
        catch (err) {
            console.log("[ERROR] Redirection failure " + err)
            await page.browser().disconnect;
            await page.close()
        }
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
        const [uploadbox] = await page.$x("//span[contains(., 'Adicionar fotos')]");
        await uploadbox.click();

        console.log("[+] Gerando PDF e Guardando dados...");
        const element = await page.$("input[type=file]");
        await element.uploadFile('./test.png');
        await page.screenshot({ path: "Generic.png" });

        console.log("[+] DONE");
        console.log("[+] CREATE NEW ANNOUNCE");





        product_count++;
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

async function GenerateAnnunces() {
    for (let i = 0; i <= max_account_post; i++) {

        let response = await GetPostData(index);
        console.log("[STATUS-CODE] " + response);
        if (response) {
            await CreateAnnounces(index);
        }
    }
}
module.exports = { GenerateAnnunces }