import { bookApi } from './api'

import { validate } from './util'

import SearchInput from './components/SearchInput'

function App ({$target}){
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
                    await this.setState(data.documents, keyword)
                }
            }catch (e){
                throw new Error(e)
            }
        }
    })

    this.setState = (nextState, keyword) => {
        validate(nextState)
        this.state = nextState
    }
}

new App({$target:document.querySelector('#main')})
