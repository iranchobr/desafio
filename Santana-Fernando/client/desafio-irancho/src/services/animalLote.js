import { http } from "./config";

export default {
  listar: () => {
    return http.get("animal_lote/list");
  },

  criar: animalLote => {
    return http.post("animal_lote/create", animalLote);
  },

  atualizar: (id, animalLote) => {
    return http.put(`animal_lote/put/${id}`, { animalLote });
  },

  deletar: id => {
    return http.delete(`animal_lote/delete/${id}`);
  }
};
