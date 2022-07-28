const { GetPageCookie } = require("./src/cookies/GetPageCookies");
const { GenerateAnnounces } = require("./src/products/products");

async function init() {
    await GetPageCookie();

    await GenerateAnnounces();
}

init();