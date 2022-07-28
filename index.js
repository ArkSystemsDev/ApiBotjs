const { GetPageCookie } = require("./src/cookies/GetPageCookies");
const { GenerateAnnunces } = require("./src/products/products");

async function init() {
    await GetPageCookie();

    await GenerateAnnunces();
}

init();