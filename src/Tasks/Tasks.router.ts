import { Router, } from "express";
import { taskController } from "./Tasks.controller";
import { createValidator, updateValidator } from "./Tasks.validator";


//fire the router function

export const tasksRouter: Router = Router();

tasksRouter.get("/Tasks", taskController.getAll);

tasksRouter.post(
  "/Tasks",
  createValidator,
  taskController.create
);

tasksRouter.put("/Tasks", updateValidator, taskController.update);

