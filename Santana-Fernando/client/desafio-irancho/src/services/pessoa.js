import { http } from "./config";

export default {
  listar: () => {
    return http.get("pessoa/list");
  },

  criar: pessoa => {
    return http.post("pessoa/create", pessoa);
  },

  atualizar: (id, pessoa) => {
    return http.put(`pessoa/put/${id}`, pessoa);
  },

  deletar: (id) => {
    return http.delete(`pessoa/delete/${id}`);
  }
};
