import axios from "axios";
import API_KEY from "./API_KEY";

axios.interceptors.request.use(
    (config)=> {
        config.baseURL = 'https://dapi.kakao.com/v3/search'
        config.headers.Authorization = `KakaoAK ${API_KEY}`
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    });

const bookApi = (keyword = '') => {
    const res =  axios.post(`book?query=${keyword}`)

    return res
}

export {
    bookApi
}
