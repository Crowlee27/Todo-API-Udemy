import express, { Express } from "express";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import cors from "cors";
import bodyParser from "body-parser";
import { Task } from "./src/Tasks/Tasks.entity";
import { tasksRouter } from "./src/Tasks/Tasks.router";

//instance of express
const app: Express = express();
dotenv.config();

// parse request body
app.use(bodyParser.json());

//use CORS intall types as well
app.use(cors());

//create database connection
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  entities: [Task],
  synchronize: true,
});

//define server port
const port = process.env.PORT;

//create a default route
// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });

AppDataSource.initialize()
  .then(() => {
    // start listening to the requests on the defined port
    app.listen(port);
    console.log("Data source has been initialized");
  })
  .catch((err) => {
    console.error("Error during Data source initialization", err);
  });

app.use("/", tasksRouter);
