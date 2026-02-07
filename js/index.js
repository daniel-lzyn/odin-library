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