import axios from "axios";
import API_KEY from "./API_KEY";
import './style.css'

const instance = axios.create({
    baseURL: 'https://dapi.kakao.com/v3/search/',
    headers: {
        'Authorization': `KakaoAK ${API_KEY}`
    },
});

const bookApi = () =>{
    return instance.post('book?query=토지',{
        query:'토지'
    }).then((data)=>{
        console.log('book-data', data)
    }).catch((e)=>{
        console.warn('bookApi:' + e)
    })
}

bookApi()
