import { http } from "./config";

export default {
  listar: () => {
    return http.get("lote/list");
  },

  criar: lote => {
    return http.post("lote/create", lote);
  },

  atualizar: (id, lote) => {
    return http.put(`lote/put/${id}`, lote);
  },

  deletar: id => {
    return http.delete(`lote/delete/${id}`);
  }
};
