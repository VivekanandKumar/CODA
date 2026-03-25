import ApiService from "./service.js";
import RowApiService from "../rows/service.js";
class ApiController {
  constructor() {}

  listDocs = async (req, res, next) => {
    try {
      const docs = await ApiService.list();
      return res.json(docs);
    } catch (error) {
      return next(error);
    }
  };

  async deleteRows(req, res, next) {
    try {
      const { docId, tableId, rowId } = req.params;
      await RowApiService.deleteRow(docId, tableId, rowId);
      return res.status(204).send("Deleted");
    } catch (error) {
      return next(error);
    }
  }

  async showDashboard(req, res, next) {
    try {
      const docs = await ApiService.list();
      res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.set("Pragma", "no-cache");
      res.set("Expires", "0");
      return res.render("Dashboard", {
        title: "Dashboard",
        docs,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default ApiController;
