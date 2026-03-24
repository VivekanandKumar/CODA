import client from "../client.js";

class TableApiService {
  constructor() {}

  async list(docId) {
    const res = await client.get(`/docs/${docId}/tables`);
    return res.data;
  }
}

export default new TableApiService();
