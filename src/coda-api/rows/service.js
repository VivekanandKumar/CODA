import client from "../client.js";

class RowApiService {
  constructor() {}

  async list(docId, tableId) {
    const res = await client.get(`/docs/${docId}/tables/${tableId}/rows`);
    return res.data;
  }

  async deleteRow(docId, tableId, rowId) {
    try {
      const response = await client.delete(`/docs/${docId}/tables/${tableId}/rows/${rowId}`);
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }

  scanRow(docId, tableId, row, findings) {
    const currentFinding = {
      rowId: row.id,
      docId,
      tableId,
      messages: [],
    };
    for (const [column, value] of Object.entries(row.values)) {
      const str = String(value);
      if (/password|secret|token/i.test(column) || /password|secret/i.test(str)) {
        currentFinding.messages.push("Secret Data");
      } else if (/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/.test(str)) {
        currentFinding.messages.push("Email");
      } else if (/\b[6-9]\d{9}\b/.test(str)) {
        currentFinding.messages.push("Phone Number");
      } else if (/\b\d{4}\s?\d{4}\s?\d{4}\b/.test(str)) {
        currentFinding.messages.push("Aadhar Card Number");
      } else if (/\b(?:\d[ -]*?){13,16}\b/.test(str)) {
        currentFinding.messages.push("Bank Card Number");
      }
    }
    if (currentFinding.messages.length) findings.push(currentFinding);
    return findings;
  }
}

export default new RowApiService();
