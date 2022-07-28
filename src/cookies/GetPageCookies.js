const puppeteer = require("puppeteer");
const fs = require('fs').promises;

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function GetPageCookie() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.olx.com.br/", {
        waitUntil: "networkidle2",
    });

    await page.type("#__next > div > div.sc-cHSUfg.hDSJfS.sc-jTzLTM.iwtnNi > div.sc-hmXxxW.izBUKY > div.sc-iybRtq.fjyUzw.sc-jTzLTM.iwtnNi > form > div:nth-child(1) > div.sc-dEoRIm.dWonDA.sc-jTzLTM.iwtnNi > input",
        "arktechdevelopment@gmail.com");
    await page.click("#identifierNext");

    await page.waitForSelector("#password", {
        visible: true,
        hidden: false,
    });
    await page.type(
        "#__next > div > div.sc-cHSUfg.hDSJfS.sc-jTzLTM.iwtnNi > div.sc-hmXxxW.izBUKY > div.sc-iybRtq.fjyUzw.sc-jTzLTM.iwtnNi > form > div:nth-child(2) > div.sc-dEoRIm.dWonDA.sc-jTzLTM.iwtnNi > div > div > input",
        "Sheut123"
    );
    await sleep(1000);
    await page.click("#passwordNext > div > button");

    await sleep(10000);

    //save cookies
    const cookies = await page.cookies();
    await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));

    await browser.close();
}

module.exports = { GetPageCookie }