import express from "express";
import ApiController from "./controller.js";
import RowApiController from "../rows/service.js";

const Router = express.Router();
const controller = new ApiController();

Router.get("/dashboard", controller.showDashboard);
Router.get("/", controller.listDocs);
Router.delete("/row/:docId/:tableId/:rowId", controller.deleteRows);
// Router.post("/", controller.create);

export default Router;
