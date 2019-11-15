const dotenv = require("dotenv");

(() => {
    const environment = process.env.NODE_ENV;
    let pathDotenv = ".env";
    const isEnvironmentTest = environment == "test";
    if (isEnvironmentTest) {
        pathDotenv = ".env.testing";
    }
    dotenv.config({ path: pathDotenv });
})()