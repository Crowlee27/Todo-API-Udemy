import { body, ValidationChain } from "express-validator";
import { Priority } from "../Enums/Priority";
import { Status } from "../Enums/Status";


export const createValidator: ValidationChain[] = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("The task title is mandatory")
    .trim()
    .isString()
    .withMessage("The task title must be a string"),
  body("date")
    .not()
    .isEmpty()
    .withMessage("The task date is mandatory")
    .isString()
    .withMessage("The date needs to be a valid date format"),
  body("description")
    .trim()
    .isString()
    .withMessage("Description need to be in string format"),
  body("priority")
    .trim()
    .isIn([Priority.high, Priority.normal, Priority.low])
    .withMessage("The priority needs to be high, normal or low"),
  body("status")
    .trim()
    .isIn([Status.completed, Status.todo, Status.inProgress])
    .withMessage("The status needs to be completed, todo or inProgress"),
];

export const updateValidator = [
  body("id")
    .not()
    .isEmpty()
    .withMessage("The task id is mandatory")
    .trim()
    .isString()
    .withMessage("ID need to be a valid uuid format"),
  body("status")
    .trim()
    .isIn([Status.completed, Status.todo, Status.inProgress])
  .withMessage("The status needs to be completed, todo or inProgress"),
];
