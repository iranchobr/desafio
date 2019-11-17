const app = require("./config/Server");

app.listen(
    process.env.PORT,
    () => console.log(`Server is running in address: ${process.env.APP_URL}`)
);