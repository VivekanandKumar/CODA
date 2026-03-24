import express from "express";
import DocRoutes from "./coda-api/docs/routes.js";
import ejs from "ejs";
import HandleError from "./middlewares/ErrorHandlers.js";
const app = express();

app.use(express.json());
app.use("/", DocRoutes);
app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(HandleError);
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
