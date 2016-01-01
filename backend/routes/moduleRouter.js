import { Router } from "express";
import express from "express";
import {
  addModule,
  allModules,
  updateModules,
  findModule,
  deleteModule,
} from "../controller/moduleController.js";

const router = express.Router();

router.route("/")
  .get(allModules)
  .post(addModule);
//.delete( deleteAllCourses )

router.route("/:id")
  .get(findModule)
  .delete(deleteModule)
  .patch(/* hasRightPassword, */ updateModules);

export default router;
