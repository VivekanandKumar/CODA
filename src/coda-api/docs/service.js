import client from "../client.js";
import TableApiService from "../tables/service.js";
import RowApiService from "../rows/service.js";
class ApiService {
  constructor() {}

  async list() {
    const response = await client.get("/docs");
    const docs = response?.data?.items || [];
    const TIMEFRAME = 1000 * 60 * 10;

    const lists = [];

    for (let doc of docs) {
      doc = await this.scanDoc(doc);

      // check for 10 minutes timeframe
      const updatedAt = new Date(doc.updatedAt).valueOf() + TIMEFRAME;

      const isUnused = Date.now() > updatedAt;
      doc.unused = isUnused;
      lists.push(doc);
    }

    return lists;
  }

  async scanDoc(doc) {
    const table_response = await TableApiService.list(doc.id);
    const tables = table_response?.items || [];
    const findings = [];
    for (const table of tables) {
      const row_response = await RowApiService.list(doc.id, table.id);
      const rows = row_response?.items || [];
      for (const row of rows) {
        RowApiService.scanRow(doc.id, table.id, row, findings);
        if (findings.length) {
          doc.issue = findings;
        }
      }
    }
    return doc;
  }
}

export default new ApiService();
