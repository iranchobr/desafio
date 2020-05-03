import { http } from "./config";

export default {
  listarPessoa: () => {
    return http.get("animal/query");
  },
  listar: () => {
    return http.get("animal/list");
  },

  criar: animal => {
    return http.post("animal/create", animal);
  },

  atualizar: (id, animal) => {
    return http.put(`animal/put/${id}`, { animal });
  },

  deletar: id => {
    return http.delete(`animal/delete/${id}`);
  }
};
