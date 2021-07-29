import { debounce } from '../util'

function SearchInput ({ $app, onSearch }){
    this.$searchInput = document.createElement('input');
    this.$searchInput.id = 'search-keyword'
    this.onSearch = (keyword) => debounce(() => onSearch(keyword), 600)
    $app.appendChild(this.$searchInput)

    this.$searchInput.focus()
    this.$searchInput.addEventListener('keyup', (e)=>{
        const { target } = e
        if(e.keyCode !== 13){
            return;
        }
        this.onSearch(target.value)
    })
}

export default SearchInput;
