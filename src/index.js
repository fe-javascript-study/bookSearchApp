import bookApi from './api'

const BookSearchApp = (function(){

  // TODO 
  // 중복 체크
  // 삭제 기능
  // 결과 없음
  // 기타 등등...

  function BookSearchApp() {
    this.elBookList       = null;
    this.elSearchButton   = null;
    this.elSearchForm     = null;
    this.elSearchField    = null;
    this.elStorageList    = null;
    this.elScrollObserver = null;
    this.title            = null;
    this.page             = 1;
    this.books            = [];
    this.addedBooks       = [];
  };


  BookSearchApp.prototype.init = function() {
    this._findDoms();
    this._bindEvents();
    this._getLocalstorage();
  }


  BookSearchApp.prototype._findDoms = function() {
    this.elBookList       = document.querySelector('.book__list')
    this.elSearchButton   = document.querySelector('.search__button')
    this.elSearchForm     = document.querySelector('.search__form')
    this.elSearchField    = document.querySelector('.search__field')
    this.elStorageList    = document.querySelector('.storage__list')
    this.elScrollObserver = document.querySelector('.scroll-observer')
  }


  BookSearchApp.prototype._bindEvents = function() {
    this.elSearchButton.addEventListener('click', this._searchBook.bind(this))
    this.elSearchForm.addEventListener('submit', this._searchBook.bind(this))
    this.elBookList.addEventListener('click', (event) => this._setLocalstroage(event, this._getSelectedBook.bind(this).bind(this)))
  }


  BookSearchApp.prototype._createElement = function(book, target) {
    const { authors, isbn, price, publisher, thumbnail, title, url } = book;

    if(target === 'book') {
      return `<li data-book-isbn="${ isbn }">
        <figure>
          <a href="${ url }">
            <img src=${ thumbnail } alt="" width="124" height="170" loading="lazy" />
          </a>
          <figcaption>
            <dl>
              <dt>
                <a href="${ url }">
                  ${ title } </dt>
                </a>
              <dd>${ authors.map(author => author).join(', ') }</dd>
              <dd>${ price }</dd>
              <dd>${ publisher }</dd>
            </dl>
          </figcaption>
        </figure>
        <button class="button__add-book">저장하기</button>
      </li>`
    }
    else {
      return `<li data-book-isbn="${ isbn }">
      <figure>
        <a href="${ url }">
          <img src=${ thumbnail } alt="" width="124" height="170" loading="lazy" />
        </a>
        <figcaption>
          <dl>
            <dt>
              <a href="${ url }">
                ${ title } </dt>
              </a>
          </dl>
        </figcaption>
      </figure>
      <button class="button__remove-book">삭제하기</button>
      </li>`
    }
  }


  BookSearchApp.prototype._appendElement = function(books, target) {
    const that = this;

    const elements = [...books].map(book => that._createElement(book, target));
    
    target === 'book'
      ? this.elBookList.innerHTML += elements
      : this.elStorageList.innerHTML += elements
  }


  BookSearchApp.prototype._setLocalstroage = function(event, cb) {
    const book = cb(event);

    this.addedBooks.push({
      isbn     : book.isbn,
      title    : book.title,
      thumbnail: book.thumbnail,
      url      : book.url
    });
  
    localStorage.setItem('book', JSON.stringify(this.addedBooks));
  
    const lastItem = this.addedBooks.slice(-1);
    this._appendElement(lastItem, 'storage')
  }


  BookSearchApp.prototype._getLocalstorage = function() {
    this.addedBooks = JSON.parse(localStorage.getItem('book')) || [];

    if(!!this.addedBooks) this._appendElement(this.addedBooks, 'storage')
  }


  BookSearchApp.prototype._getSelectedBook = function(event) {
    if(event.target.className !== 'button__add-book') return;
  
    const isbn = event.target.parentNode.dataset.bookIsbn;

    const book = this.books.find(book => book.isbn === isbn);
  
    return book;
  }


  BookSearchApp.prototype._searchBook = async function(event) {

    event.preventDefault();
    this.title = this.elSearchField.value.trim();
    
    if(!this.title) return alert('올바른 검색어를 입력해 주세요');
    
    this.books = await bookApi(this.title, this.books, this.page);
    await this._appendElement(this.books, 'book')
    await this._infiniteScroll();
  }


  BookSearchApp.prototype._moreBook = async function() {

    this.page += 1
    const moreBooks = await bookApi(this.title, this.books, this.page);
    this.books = [...this.books, ...moreBooks]
  
    await this._appendElement(moreBooks, 'book')
  }


  BookSearchApp.prototype._infiniteScroll = function() {
    const io = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
        this._moreBook();
      }
    })
  
    io.observe(this.elScrollObserver)
  }


  const bookSearchApp = new BookSearchApp();
  bookSearchApp.init();
})();























