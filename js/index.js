const myLibrary = [];

function Book(id, title, author, totalPages, readStatus) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.readStatus = readStatus;
}

function addBookToLibrary(title, author, totalPages, readStatus) {
    const book = new Book(crypto.randomUUID(), title, author, totalPages, readStatus)
    myLibrary.push(book);
}

addBookToLibrary("Makanya, Mikir!", "Abigail Limuria", 295, false)
console.log(myLibrary)

function createBookCard(bookObject) {
    // card container
    const cardContainter = document.createElement('div');

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
}