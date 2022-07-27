const puppeteer = require('puppeteer');
const c = require("../AnnounceCreation/Categorias")
require("dotenv").config();

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.olx.com.br/',{waitUntil: 'networkidle0'});
    console.log("[+] Acessando OLX...");
    await page.click("[href='https://conta.olx.com.br/anuncios']");
    console.log("[+] Logando...");
    await page.waitForNavigation();
    await page.waitForSelector('#cookie-notice-ok-button');
    await page.click('#cookie-notice-ok-button');
    await page.type('[type="email"]', process.env.LOGIN);
    await page.type('[type="password"]', process.env.PASSWORD);
    const [button] = await page.$x("//button[contains(., 'Entrar')]");
    if(button){
            await button.click();
            console.log("[+] Logado com sucesso!");
    }
    await page.waitForNavigation();
    await page.goto('https://www2.olx.com.br/desapega');
    await page.screenshot({path: 'test.png'})
    await page.type('[label="Título*"]', 'teste');
    await page.type('[label="Descrição*"]', 'teste');
    let category_selected = c.category("Autos e peças");
    let subcategory_selected = c.subcategory("Carros, vans e utilitários");
    await page.click(`[title ="${category_selected}"]`);
    await page.click(`[title="${subcategory_selected}"]`);
    await page.type('[label="Localização*"]', '46401543');
    await page.waitForTimeout(500);
    await page.type('[label="Placa do carro*"]', 'asa5646');
    await page.select('[label="Marca*"]', '1');
    await page.select('[label="Modelo*"]', '1');
    await page.select('[label="Versão*"]', '1');
    await page.select('[label="Ano do modelo*"]', '1');
    await page.select('[label="Câmbio"]', '1');
    await page.select('[label="Combustível"]', '1');
    const [boxGNV] = await page.$x("//span[contains(., 'com Kit GNV')]");
    await boxGNV.click();
    await page.select('[label="Direção"]', '1');
    await page.select('[label="Potência do motor"]', '1');
    await page.select('[label="Tipo de veículo"]', '1');
    await page.type('[label="Quilometragem*"]', '1');
    //await page.select('[label="Cilindradas*"]', '1');
    //await page.select('[label="Tipo de moto"]', '1');
    await page.select('[label="Portas"]', '1');
    await page.select('[label="Final de placa"]', '1');
    const [box0] = await page.$x("//span[contains(., 'Alarme')]");
    await box0.click();
    await page.select('[label="Cor"]', '1');
    await page.select('[label="Aceita Trocas"]', '2');
    const [box1] = await page.$x("//span[contains(., 'Financiado')]");
    await box1.click();
    await page.select('[label="Único dono"]', '1');
    await page.type('[label="Preço (R$)"]', '10000');
    //const [uploadbox] = await page.$x("//span[contains(., 'Adicionar fotos')]");
    //await uploadbox.click();
    const element = await page.$("input[type=file]");
    await element.uploadFile('./test.png');

    console.log("[+] Gerando log...");
    await page.screenshot({path: 'generic.png',fullPage: true});
    console.log("[+] Guardando dados...");
    /*   await execute('exiftool -title="Generic.pdf" ') 
    Eu to destacando essa parte para fora do codigo
    Pós me bateu uma forte duvida se isso funciona
    //const exec = require('util').promisify(require('child_process').exec);
    */
    await page.waitForTimeout(5000);
    await page.goto("https://www3.olx.com.br/account/do_logout");
    console.log("[+] Saindo!");
    //await page.waitForNavigation();
    //await page.goto('https://www3.olx.com.br/account/do_logout')
})();