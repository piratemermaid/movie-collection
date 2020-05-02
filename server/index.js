const express = require("express");
const bodyParse = require("body-parser");
const accountRouter = require("./routes/account");

const app = express();

app.use("/account", accountRouter);

const port = process.env.PORT || 5001;
app.listen(port);
console.log("app listening on port", port);

module.exports = app;
