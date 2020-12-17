import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3002/'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8'
export default axios
