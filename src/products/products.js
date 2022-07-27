const categoryList = require("../AnnounceCreation/Categorias.js");
const puppeteer = require('puppeteer');
const myList = require("../products/products.json");

let product_count = 0;
const data_ = JSON.parse(JSON.stringify(myList));
const enable_to_post = true;
const index = 0;
async function GenerateAnnunces() {
    for (let i = 0; i <= 13; i++) {

        if (product_count == 2) {
            console.log("[STATUS] products enable to post: " + product_count - 13);
            console.log("[GET] post's by: " + data_[0].user);
        }
        await Announces(index, i);
    }
    

}
async function Announces(index, i){
    console.log("[GET] productes in json file ");
    console.log("[GET] DATA:")
    console.log(data_);
    console.log("[GET] ANNOUNCE:")
    console.log(data_[index].announce[i])

    //Inicialização do navegador
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    console.log("[+] Acessando OLX...");
    await page.goto('https://www.olx.com.br/');
    console.log("[+] Logando...");

    await page.click("[href='https://conta.olx.com.br/anuncios']");
    await page.waitForNavigation();
    await page.waitForSelector('#cookie-notice-ok-button');
    await page.click('#cookie-notice-ok-button');
    await page.type('[type="email"]', `${data_[index].login}`);
    await page.type('[type="password"]', `${data_[index].password}`);

    //if (await page.waitForNavigation() == puppeteer.TimeoutError) console.log("[ERROR] Falha ao Gerar o anuncio, tentando novamente...."); GenerateAnnunces();

    const [button] = await page.$x("//button[contains(., 'Entrar')]");
    if (button) {
        await button.click();
        console.log("[+] Logado com sucesso!");
    }
    await page.waitForNavigation();
    await page.goto('https://www2.olx.com.br/desapega');
    await page.screenshot({ path: 'test.png' })

    console.log("[+] Writing description...");

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
    const element = await page.$("input[type=file]");
    await element.uploadFile('./test.png');

    console.log("[+] Gerando PDF...");
    await page.screenshot({ path: "Generic.png" });
    console.log("[+] Guardando dados...");
    await page.waitForTimeout(5000);
    await page.goto("https://www3.olx.com.br/account/do_logout");
    console.log("[UPDATE] Product count: " + product_count++);
    console.log(data_[index].anunciosCadastrados = product_count);
    await browser.close();
    console.log("[+] Saindo!");
}


module.exports = { GenerateAnnunces }