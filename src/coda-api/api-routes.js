import express from "express";
import ApiController from "./docs/api-controller.js";

const Router = express.Router();
const controller = new ApiController();

Router.get("/", controller.listDocs);
Router.post("/", controller.create);
// Router.get("/:id", controller.getDetails);
// Router.put("/:id", controller.updateDocs);
// Router.delete("/:id", controller.deleteDocs);

export default Router;
