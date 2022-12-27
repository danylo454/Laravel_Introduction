import axios from "axios";

const http = axios.create({
    baseURL: "http://laravel.pu012.com",
    headers: {
        "Content-type": "application/json"
    }
});

export default http;