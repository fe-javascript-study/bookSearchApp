function SearchBookList({ $app, initialState }){
    this.state = initialState
    this.$searchBook = document.createElement('div');
    this.$searchBook.id = 'search-book'

    $app.appendChild(this.$searchBook)

    this.setState = (nextState) => {
        this.state = nextState
    }

    this.render = () => {

    }
}

export default SearchBookList
