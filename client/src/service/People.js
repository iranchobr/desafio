import axios from "axios";
import CONSTANTES from "../constantes/App";

export default class People {

    constructor() {
        this._endpoint = "peoples";
    }

    findAll(fieldsReturn = []) {
        fieldsReturn = fieldsReturn.join(",");
        return axios.get(`${CONSTANTES.BASE_URL_API}/${this._endpoint}?fields=${fieldsReturn}`)
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