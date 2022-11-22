import axios, { type AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
    baseURL: "http://127.0.0.1:8787/api/",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    }
};

const client = axios.create(axiosConfig);

export default client;
