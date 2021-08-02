import { bookApi } from './api'

import { validate } from './util'

import SearchInput from './components/SearchInput'
import SearchBookList from "./components/SearchBookList";

export default function App ({$target}){
    this.state = [];
    this.$app = document.createElement('div');
    this.$app.className = 'search-box';
    this.$history = document.createElement('div')
    $target.appendChild(this.$app)

    const searchInput = new SearchInput({
        $app:this.$app,
        onSearch: async (keyword) => {
            try{
                if(keyword.length){
                    const { data } = await bookApi(keyword)
                    this.setState(data.documents, keyword)
                }
            }catch (e){
                throw new Error(e)
            }
        }
    })

    this.bookHistoryRender = () => {
        this.$history.classList.add('book-history')
        let items = ``;

        const localItems = JSON.parse(localStorage.getItem('bookHistory'))

        localItems.map((item,idx) => {
            items += `<a href="${item.url}" target="_blank">
                    <div>
                        <img src="${item.thumbnail}" alt="${item.title}"/>
                    </div>
                    <h2>${item.title}</h2>
                </a>
            `
        })



        this.$history.innerHTML = items
        $target.appendChild(this.$history)
    }

    const searchBookList = new SearchBookList({$app:this.$app, initialState:this.state, onRender:this.bookHistoryRender})

    this.setState = (nextState, keyword) => {
        validate(nextState)
        this.state = nextState
        this.watchState()
    }

    this.watchState = () => {
        searchBookList.setState(this.state)
    }

}
