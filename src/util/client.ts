import axios, { type AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
    baseURL: "https://ggm-festival.pages.dev/",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
};

const client = axios.create(axiosConfig);

export default client;