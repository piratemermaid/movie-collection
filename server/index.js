const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const accountRouter = require("./routes/account");
const userRouter = require("./routes/user");
const appRouter = require("./routes/app");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/account", accountRouter);
app.use("/user", accountRouter);
app.use("/app", accountRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        type: "error",
        message: err.message
    });
});

const port = process.env.PORT || 5001;
app.listen(port);
console.log("app listening on port", port);

module.exports = app;
