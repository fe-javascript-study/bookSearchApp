import { bookApi } from './api'

import { validate } from './util'

import SearchInput from './components/SearchInput'
import SearchBookList from "./components/SearchBookList";

export default function App ({$target}){
    this.state = [];
    this.$app = document.createElement('div');
    this.$app.className = 'search-box';
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

    const searchBookList = new SearchBookList({$app:this.$app, initialState:this.state})

    this.setState = (nextState, keyword) => {
        validate(nextState)
        this.state = nextState
        this.watchState()
    }

    this.watchState = () => {
        searchBookList.setState(this.state)
    }
}
