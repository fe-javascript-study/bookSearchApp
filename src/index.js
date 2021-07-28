import axios from "axios";
import API_KEY from "./API_KEY";

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

const bookApi = () =>{
    let searchWord= document.getElementById('bookName').value;
    searchWord=searchWord? searchWord: '과자';
    return axios.post(`book?query=${searchWord}`,{
        // query:'리액트'
    }).then((data)=>{
        console.log('book-data', data)
    });
}

function App({$target}){
    this.$title = document.createElement('h1');
    this.$titleText= document.createTextNode('책을 찾아보자!');
    this.$title.appendChild(this.$titleText);
    $target.appendChild(this.$title)

    this.$bookName= document.createElement('input');
    this.$bookName.setAttribute("id", "bookName");
    $target.appendChild(this.$bookName);

    this.$bookSearch= document.createElement('button');
    this.$bookSearch.innerText='검색';
    this.$bookSearch.onclick= function(){
        bookApi();
    }

    $target.appendChild(this.$bookSearch);
}

new App({$target:document.querySelector('#main')})