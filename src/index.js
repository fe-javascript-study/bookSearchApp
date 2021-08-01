import axios from "axios";
import API_KEY from "./API_KEY";

axios.interceptors.request.use(
    (config)=> {
        config.baseURL = 'https://dapi.kakao.com/v3/search/book?target=title'
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

const bookApi = () =>{
    return axios.post('book?query=토지',{
        query:'토지'
    }).then((data)=>{
        console.log('book-data', data);
    });
}

bookApi();
