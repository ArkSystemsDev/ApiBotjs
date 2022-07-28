const puppeteer = require("puppeteer");
const fs = require('fs').promises;
require("dotenv").config();

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function GetPageCookie() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    console.log("[COOKIE_PAGE][STATUS] Opening OLX")
    await page.goto("https://www.olx.com.br/", {
        waitUntil: "networkidle2",
    });

    try {
        await page.click("[href='https://conta.olx.com.br/anuncios']", {waitUntil: 'networkidle0'});
    } catch (err) {
        console.log("[COOKIE_PAGE][ERROR] " + err);
        await page.browser().disconnect;
        await page.close()

        //Create new page and try to get cookies
        GetPageCookie();
    }
    await page.waitForNavigation();
    await page.waitForSelector('#cookie-notice-ok-button');

    console.log("[COOKIE_PAGE][+] INSERT EMAIL AND PASSWORD");
    await page.type('[type="email"]', `${process.env.LOGIN}`);
    await page.type('[type="password"]', `${process.env.PASSWORD}`);
    
    await sleep(1000);

    const [button] = await page.$x("//button[contains(., 'Entrar')]");
    if (button) {
        await button.click();
        console.log("[+] SUCESSFULL LOGIN");
    }

    await sleep(10000);

    //save cookies
    const cookies = await page.cookies();
    await fs.writeFile('cookies.json', JSON.stringify(cookies, null, 2));
    console.log("[COOKIE_PAGE].[UPDATE] cookie.json created exiting...");

    await browser.close();
}

module.exports = { GetPageCookie }