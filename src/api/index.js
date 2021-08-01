import axios from "axios";
import qs from 'qs'
import API_KEY from './API_KEY'

axios.interceptors.request.use(
    (config)=> {
        config.baseURL = 'https://dapi.kakao.com/v3/search/'
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



const bookApi = (title, books, page = 1) => {
    const query = qs.stringify({
      query: title,
      page : page,
    })

    return axios.post(`book?`, query)
      .then(({ data }) => data.documents)
}

export default bookApi;