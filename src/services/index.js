import axios from "axios";

const baseURL = "http://localhost:3000/api";

const api = axios.create({
  baseURL,
});

const simularEmprestimo = (payload) => api.post("/simularEmprestimo", payload);
const efetivarEmprestimo = (payload) => api.post("/efetivarEmprestimo", payload);

export default {
  simularEmprestimo,
  efetivarEmprestimo,
};
