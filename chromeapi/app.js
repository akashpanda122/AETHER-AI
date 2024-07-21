const express = require("express");
const cors = require("cors");

const userRouter = require("./Api/Routers/userRouter");
const tokenRouter = require("./Api/Routers/tokenRouter");
const accountRouter = require("./Api/Routers/accountRouter");

//MIDDLEWARE
const app = express();
app.use(express.json({ limit: "100kb" }));

app.use(cors());
app.options("*", cors());

//3. routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/tokens", tokenRouter);
app.use("/api/v1/accpunt", accountRouter);

module.exports = app;