const { Console } = require('console');
const puppeteer = require('puppeteer');
const c = require("../AnnounceCreation/Categorias")
require("dotenv").config();

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.olx.com.br/');
    console.log("[+] Acessando OLX...");
    await page.click("[href='https://conta.olx.com.br/anuncios']");
    console.log("[+] Logando...");
    await page.waitForNavigation();
    await page.type('[type="email"]', process.env.LOGIN);
    await page.type('[type="password"]', process.env.PASSWORLD);
    await page.waitForSelector('#cookie-notice-ok-button');
    await page.click('#cookie-notice-ok-button');
    const [button] = await page.$x("//button[contains(., 'Entrar')]");
    if(button){
        await button.click();
        console.log("[+] Logado com sucesso!");
    }
    await page.waitForNavigation();
    await page.goto('https://www2.olx.com.br/desapega');
    await page.type('[label="Título*"]', 'teste');
    await page.type('[label="Descrição*"]', 'teste');
    let category_selected = c.category("Imóveis");
    let subcategory_selected = c.subcategory("Casas")
    await page.click(`[title =${category_selected}]`);
    await page.click(`[title=${subcategory_selected}]`);
    await page.type('[label="Localização*"]', '46401543');
})();