const library = [];

function addBook(title, author) {
    const book = {
        title: title,
        author: author
    };

    library.push(book);

    console.log(`Book "${title}" added successfully.`);
}


function findBook(title) {
    const book = library.find(book => book.title === title);

    if (book) {
        console.log("Book Found:", book);
        return book;
    } else {
        console.log(`Book "${title}" not found.`);
        return null;
    }
}


addBook("The Alchemist", "Paulo Coelho");

addBook("Wings of Fire", "A.P.J. Abdul Kalam");

addBook("Harry Potter", "J.K. Rowling");


findBook("Wings of Fire");

findBook("The Alchemist");

findBook("Unknown Book");


console.log("\nLibrary:", library);