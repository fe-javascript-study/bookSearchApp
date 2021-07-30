import { PriceTransfer } from '../util'

function SearchBookList({ $app, initialState }){
    this.state = initialState
    this.$searchBook = document.createElement('div');
    this.$searchBook.id = 'search-book'

    $app.appendChild(this.$searchBook)

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        const bookData = this.state;
        const ul = document.createElement('ul')
        let li = ``;

        bookData.map((item)=>{
            li += `
                <li>
                    <a href="${item.url}" target="_blank">
                        <h2>${item.title}</h2>
                        <div>
                            <img src="${item.thumbnail}" alt="${item.title}"/>
                        </div>
                    </a>    
                    <p>
                        <span>작가:${item.authors[0]}</span>
                        <span>출판:${item.publisher}</span>
                    </p>
                    <p>
                        ${item.contents}
                    </p>
                    <div>
                        ${item.sale_price === -1 ? `<span>${PriceTransfer(item.price)}원</span>` : `<strike>${PriceTransfer(item.price)}원</strike>`}
                        ${item.sale_price === -1 ? `` : `<span>${PriceTransfer(item.sale_price)}원</span>`}
                    </div>
                </li>
            `
        })

        ul.innerHTML = li
        this.$searchBook.appendChild(ul)
    }
}

export default SearchBookList
