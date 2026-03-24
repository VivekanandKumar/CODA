import axios from "axios";

const client = axios.create({
  baseURL: process.env.CODA_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.CODA_API_KEY}`,
  },
});
export default client;
