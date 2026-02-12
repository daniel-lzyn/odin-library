const mainContainer  = document.querySelector('main');
const addBookBtn = document.querySelector('#add_book_btn');
const addBookPopup = document.querySelector('.add_book_popup');
const popupCloseBtn = document.querySelector('#popup_close_btn');
const addBookForm = document.querySelector('.input_book_form');

const myLibrary = [];

class Book {
    constructor(id, title, author, totalPages, readStatus) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.totalPages = totalPages;
        this.readStatus = readStatus;
    };
};

// function Book(id, title, author, totalPages, readStatus) {
//     this.id = id;
//     this.title = title;
//     this.author = author;
//     this.totalPages = totalPages;
//     this.readStatus = readStatus;
// }

function addBookToLibrary(title, author, totalPages, readStatus) {
    const book = new Book(crypto.randomUUID(), title, author, totalPages, readStatus)
    myLibrary.push(book);
}


function refreshLibrary() {
    mainContainer.innerHTML = "";
    for(let i = 0; i < myLibrary.length; i++) {
        createBookCard(myLibrary[i]);
    };
};

function createBookCard(bookObject) {
    // card container
    const cardContainter = document.createElement('div');
    cardContainter.id = bookObject.id;

    // book title
    const title = document.createElement('h2');
    title.textContent = bookObject.title;

    // book info
    const bookInfoContainer = document.createElement('div');
    bookInfoContainer.classList.add('book-info');

    const authorLeftSide = document.createElement('p');
    const authorRightSide = document.createElement('p');
    const totalPagesLeftSide = document.createElement('p');
    const totalPagesRightSide  = document.createElement('p');
    const statusLeftSide = document.createElement('p');
    const statusRightSide = document.createElement('p');

    authorLeftSide.textContent = "Author:";
    authorRightSide.textContent = bookObject.author;
    totalPagesLeftSide.textContent = "Total Pages:";
    totalPagesRightSide.textContent = bookObject.totalPages;
    statusLeftSide.textContent = "Status:";
    statusRightSide.textContent = bookObject.readStatus;

    bookInfoContainer.append(
        authorLeftSide,
        authorRightSide,
        totalPagesLeftSide,
        totalPagesRightSide,
        statusLeftSide,
        statusRightSide,);

    // buttons
    const btnContainer = document.createElement('div');

    const statusBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    statusBtn.classList.add('status_btn');
    deleteBtn.classList.add('delete_btn');

    statusBtn.textContent = "Change Status";
    deleteBtn.textContent = "Delete Book";

    btnContainer.append(statusBtn, deleteBtn);

    // Append all
    cardContainter.append(title, bookInfoContainer, btnContainer);
    mainContainer.appendChild(cardContainter);
}

addBookBtn.addEventListener('click', ()=> {
    if(addBookPopup.classList.contains('invisible')) {
        addBookPopup.classList.remove('invisible');
    } else if(!addBookPopup.classList.contains('invisible')) {
        addBookPopup.classList.add('invisible');
    };
});

popupCloseBtn.addEventListener('click', ()=> {
    addBookPopup.classList.add('invisible');
});

addBookForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    const bookTitle = document.querySelector('#title');
    const bookAuthor = document.querySelector('#author');
    const bookTotalPages = document.querySelector('#total_pages');
    const bookStatus = document.querySelector('input[name="read_status"]:checked')

    // Checking duplicate
    const duplicateTitle = myLibrary.findIndex(book => book.title === bookTitle.value);
    const duplicateAuthor = myLibrary.findIndex(book => book.author === bookAuthor.value);

    if(duplicateTitle >= 0 && duplicateAuthor >= 0) {
        alert("This book has been added to the library.");
    } else {
        // addBookToLibrary(title, author, totalPages, readStatus)
        addBookToLibrary(bookTitle.value, bookAuthor.value, bookTotalPages.value, bookStatus.value);
    };
    
    bookTitle.value = "";
    bookAuthor.value = "";
    bookTotalPages.value = "";
    bookStatus.value = "";
    refreshLibrary();
});

mainContainer.addEventListener('click', (e)=> {
    if(e.target.classList.contains('status_btn')) {
        const bookId = e.target.parentNode.parentNode.id;
        const bookIndex = myLibrary.findIndex(book => book.id === bookId);
        if(myLibrary[bookIndex].readStatus === "plan to read") {
            myLibrary[bookIndex].readStatus = "completed";
        } else if (myLibrary[bookIndex].readStatus === "completed") {
            myLibrary[bookIndex].readStatus = "plan to read";
        };
    } else if(e.target.classList.contains('delete_btn')) {
        const bookId = e.target.parentNode.parentNode.id;
        const bookIndex = myLibrary.findIndex(book => book.id === bookId);
        myLibrary.splice(bookIndex, 1);
    };
    refreshLibrary();
});