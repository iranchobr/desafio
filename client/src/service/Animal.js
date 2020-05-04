import axios from "axios";
import CONSTANTES from "../constantes/App";

export default class Farm {

    constructor() {
        this._endpoint = "animals";
    }

    findAll() {
        return axios.get(`${CONSTANTES.BASE_URL_API}/${this._endpoint}`)
                    .then(response => response.data);
    }

    findById(id) {
        return axios.get(`${CONSTANTES.BASE_URL_API}/${this._endpoint}/${id}`)
                    .then(response => response.data);
    }

    remove(id) {
        return axios.delete(`${CONSTANTES.BASE_URL_API}/${this._endpoint}/${id}`);
    }

    save(datas) {
        return axios.post(`${CONSTANTES.BASE_URL_API}/${this._endpoint}`, datas);
    }

    update(id, datasModified) {
        return axios.put(`${CONSTANTES.BASE_URL_API}/${this._endpoint}/${id}`, datasModified);
    }
}