const mongoose = require("mongoose");
const dotenv = require("./app");
const app = require("./app");

const DB = process.env.DAATBASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log("DB connection successful!"));

const port = 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});