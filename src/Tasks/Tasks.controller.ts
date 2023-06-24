import { Task } from "./Tasks.entity";
import { AppDataSource } from "../../index";
import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

class TasksController {
  // Method for the get route
  public async getAll(req: Request, res: Response): Promise<Response> {
    //declare a variable to hold all the tasks
    let allTasks: Task[];
    //fetch all the tasks using the repository
    try {
      allTasks = await AppDataSource.getRepository(Task).find({
        order: {
          date: "ASC",
        },
      });
      //conver the taks instance to an array of objects
      allTasks = instanceToPlain(allTasks) as Task[];

      return res.json(allTasks).status(200);
    } catch (_errors) {
      return res.json({ error: "Internal server error" }).status(500);
    }
  }

  //Method for the post route
  public async create(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //create a new instance of the task
    const newTask = new Task();

    //add the required properties to the task object
    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;

    //add the new trask to the database
    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(Task).save(newTask);

      //conver the task instance to an object
      createdTask = instanceToPlain(createdTask) as Task;

      return res.json(createdTask).status(201);
    } catch (errors) {
      return res.json({ error: "Internal server error" }).status(500);
    }
  }

  //method for updating tasks
  public async update(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // try to find if the task exists
    let task: Task | null;

    try {
      task = await AppDataSource.getRepository(Task).findOne({
        where: { id: req.body.id },
      });
    } catch (error) {
      return res.json({ error: "Internal server error" }).status(500);
    }
    // return 404 if task is null
    if (!task) {
      return res.status(404).json({
        error: "The task with given ID does not exist",
      });
    }

    //update the task
    try {
      await AppDataSource.getRepository(Task).update(req.body.id, {
        status: req.body.status,
      });

      // fetch the updated task
      const updatedTask = await AppDataSource.getRepository(Task).findOne(
        req.body.id
      );

      // convert the updated task instance to an object
      const plainUpdatedTask = instanceToPlain(updatedTask) as Task;

      return res.json(plainUpdatedTask).status(200);
    } catch (error) {
      return res
        .json({ error: "Internal server error for updating" })
        .status(500);
    }
  }
}

export const taskController = new TasksController();

// im getting an json error for updating task but it does update to the database
