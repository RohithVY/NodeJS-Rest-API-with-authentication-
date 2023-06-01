const app = require(`./index.js`);
require("dotenv").config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`app is listening in port ${port}`)
});