import "dotenv"
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL

const api = axios.create({
  baseURL,
});

const simularEmprestimo = (payload) => api.post("/simularEmprestimo", payload);
const efetivarEmprestimo = (payload) => api.post("/efetivarEmprestimo", payload);

export default {
  simularEmprestimo,
  efetivarEmprestimo,
};
