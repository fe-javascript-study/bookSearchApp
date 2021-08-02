import { PriceTransfer } from '../util'

function SearchBookList({ $app, initialState, onRender }){
    this.state = initialState
    this.$searchBook = document.createElement('ul');
    this.$searchBook.id = 'search-book'
    this.storageItems = JSON.parse(localStorage.getItem('bookHistory')) || []

    $app.appendChild(this.$searchBook)

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        const bookData = this.state;
        let li = ``;

        if(!bookData.length){
            return this.$searchBook.innerHTML = `<div>검색 결과가 없습니다.</div>`

        }

        bookData.map((item,idx)=>{
            li += `
                <li class="list_${idx}">
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

        this.$searchBook.innerHTML = li

        Array.from(this.$searchBook.children).map((item,idx)=>{
            item.addEventListener('click',()=>{
                if( this.storageItems.length < 5 ){
                    this.storageItems.push(this.state[idx])
                }
                if(this.storageItems.length >= 5){
                    this.storageItems.shift();
                    this.storageItems.push(this.state[idx])
                }

                localStorage.setItem('bookHistory', JSON.stringify(this.storageItems))
                onRender()
            })
        })
    }
}

export default SearchBookList
