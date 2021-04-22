import axios from "axios";
import qs from "qs";

const BASE_API = "http://127.0.0.1:3000/api";

const axiosGET = async (endpoint, body = {}) => {
  return await axios({
    method: "get",
    url: `${BASE_API + endpoint}?${qs.stringify(body)}`,
    headers: {
      Accept: "application/json",
    },
  });
};

const axiosPOST = async (endpoint, body) => {
  return await axios({
    method: "post",
    url: BASE_API + endpoint,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      ...body,
    },
  });
};

const axiosPUT = async (endpoint, body) => {
  return await axios({
    method: "put",
    url: BASE_API + endpoint,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      ...body,
    },
  });
};

const axiosPATCH = async (endpoint) => {
  return await axios({
    method: "patch",
    url: BASE_API + endpoint,
    headers: {
      Accept: "application/json",
    },
  });
};

const axiosDELETE = async (endpoint) => {
  return await axios({
    method: "delete",
    url: BASE_API + endpoint,
    headers: {
      Accept: "application/json",
    },
  });
};

const API = {
  getPessoas: async (options = {}) => {
    return await axiosGET("/pessoa", options);
  },
  getPessoaById: async (id) => {
    return await axiosGET(`/pessoa/${id}`);
  },
  addPessoa: async (body) => {
    return await axiosPOST("/pessoa", body);
  },
  editPessoa: async (id, body) => {
    return await axiosPUT(`/pessoa/${id}`, body);
  },
  togglePessoaActive: async (id) => {
    return await axiosPATCH(`/pessoa/${id}`);
  },
  deletePessoa: async (id) => {
    return await axiosDELETE(`/pessoa/${id}`);
  },
  getAnimais: async (options = {}) => {
    return await axiosGET("/animal", options);
  },
  getAnimalById: async (id) => {
    return await axiosGET(`/animal/${id}`);
  },
  addAnimal: async (body) => {
    return await axiosPOST("/animal", body);
  },
  editAnimal: async (id, body) => {
    return await axiosPUT(`/animal/${id}`, body);
  },
  deleteAnimal: async (id) => {
    return await axiosDELETE(`/animal/${id}`);
  },
  getLotes: async (options = {}) => {
    return await axiosGET("/lote", options);
  },
  getLoteById: async (id) => {
    return await axiosGET(`/lote/${id}`);
  },
  addLote: async (body) => {
    return await axiosPOST("/lote", body);
  },
  editLote: async (id, body) => {
    return await axiosPUT(`/lote/${id}`, body);
  },
  deleteLote: async (id) => {
    return await axiosDELETE(`/lote/${id}`);
  },
  getAlocacoes: async (options = {}) => {
    return await axiosGET("/animal-x-lote", options);
  },
  getAlocacaoById: async (id) => {
    return await axiosGET(`/animal-x-lote/${id}`);
  },
  editAlocacao: async (id, body) => {
    return await axiosPUT(`/animal-x-lote/${id}`, body);
  },
  addAlocacao: async (body) => {
    return await axiosPOST("/animal-x-lote/", body);
  },
  deleteAlocacao: async (id) => {
    return await axiosDELETE(`/animal-x-lote/${id}`);
  },
};

export default API;
