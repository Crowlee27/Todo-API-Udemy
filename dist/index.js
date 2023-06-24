"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
//instance of express
const app = (0, express_1.default)();
dotenv_1.default.config();
//create database connection
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    synchronize: true,
});
//define server port
const port = process.env.PORT;
//create a default route
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
exports.AppDataSource.initialize()
    .then(() => {
    // start listening to the requests on the defined port
    app.listen(port);
    console.log("Data source has been initialized");
})
    .catch((err) => {
    console.error("Error during Data source initialization", err);
});
// app.listen(port);
