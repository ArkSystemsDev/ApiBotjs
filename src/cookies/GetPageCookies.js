const puppeteer = require("puppeteer");
const fs = require('fs').promises;

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function GetPageCookie() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    console.log("[COOKIE_PAGE][STATUS] Opening OLX")
    await page.goto("https://www.olx.com.br/", {
        waitUntil: "networkidle2",
    });

    try {
        await page.click("[href='https://conta.olx.com.br/anuncios']");
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
    await page.type('[type="email"]', `${data_[index].login}`);
    await page.type('[type="password"]', `${data_[index].password}`);
    
    await sleep(1000);

    const [button] = await page.$x("//button[contains(., 'Entrar')]");
    if (button) {
        await button.click();
        console.log("[+] SUCESSFULL LOGIN");
    }

    await sleep(10000);

    //save cookies
    const cookies = await page.cookies();
    await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));

    await browser.close();
}

module.exports = { GetPageCookie }