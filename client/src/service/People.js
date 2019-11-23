import axios from "axios";
import CONSTANTES from "../constantes/App";

export default class People {

    findAll() {
        return axios.get(`${CONSTANTES.BASE_URL_API}/peoples`)
                    .then(response => response.data);
    }

    findById(id) {
        return axios.get(`${CONSTANTES.BASE_URL_API}/peoples/${id}`)
                    .then(response => response.data);
    }

    remove(id) {
        return axios.delete(`${CONSTANTES.BASE_URL_API}/peoples/${id}`);
    }

    save(datas) {
        return axios.post(`${CONSTANTES.BASE_URL_API}/peoples`, datas);
    }

    update(id, datasModified) {
        return axios.put(`${CONSTANTES.BASE_URL_API}/peoples/${id}`, datasModified);
    }
}