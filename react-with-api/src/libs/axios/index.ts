import axios from "axios";

const axiosIntance = axios.create({
    baseURL: "http://localhost:2334/api/v1",
    headers: {
        "Authorization": `Bearer aldypanteq`,
    }
});

export default axiosIntance