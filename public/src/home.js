function getTotalBooksCount(books) {
  // INSTRUCTIONS: This function takes in an array of book objects as the only parameter.
  // INSTRUCTIONS: Returns a *number* that represents the number of book objects inside of the array.
  // Returns the number of books (books.length)

  return books.length;

}

function getTotalAccountsCount(accounts) {
  // INSTRUCTIONS: This function takes in an array of accounts as the only parameter.
  // INSTRUCTIONS: Returns a *number* that represents the number of account objects inside of the array.
  // Returns the number of accounts (accounts.length)

  return accounts.length;

}

function getBooksBorrowedCount(books) {
  // INSTRUCTIONS: Takes in an array of books as the only parameter.
  // INSTRUCTIONS: Returns a *number* that represents the number of books that *are currently checked out of the library*. 
  // NOTE: The returned status is found in the 'borrows' array of each book. If the book has not been returned ('returned: false'), then the book is currently checked out.
  // Creates an array of books that have not been returned and then gives the number of books that have not been returned (borrowedBooks.length)

  const borrowedBooks = books.filter((book) => book.borrows.some((borrow) => borrow.returned === false));
  return borrowedBooks.length;

}

function getMostCommonGenres(books) {
  // INSTRUCTIONS: Takes in an array of book objects as the only parameter.
  // INSTRUCTIONS: Returns an array containing five or fewer objects that represent the most common occuring genres, ordered from most common to lease.
  // NOTE: Each object in the returned array has two keys: the 'name' which represents the name of the genre, and the 'count' which represents the number of times the genre occurs.
  // 1. The helper function getAllGenres() was created to take in the array of books and generate a new array of all of the genres for the books. 
  // 1.1 NOTE: To avoid duplicates, the getAllGenres() function only pushes a new genre to the array if that genre is not already included in the array.
  // 2. Another helper function getNumberOfBooksByGenre() was created to take in an array of books and a genre as parameters, and returns the number of books in that genre (numberOfBooksByGenre.length)
  // 3. These functions were then called within the getMostCommonGenres() function 
  // 3.1 The map() method was used to declare a new variable 'name' for each genre and uses the getNumberOfBooksByGenre() function to return a new object with the name and count for each genre.
  // 3.2 The sort() method was then used to sort the genres from most common to least common.
  // 3.3 A for loop was then used to limit the results to the top 5, and the function returns the sorted genres (sortedGenres) limited to the top 5 results.

  const allGenres = getAllGenres(books);

  const genres = allGenres.map((genre) => {
    const name = genre;
    const count = getNumberOfBooksByGenre(books, name);

    return { name, count };
  });

  // Orders the list of genre objects from most common to least common
  genres.sort((genreA, genreB) => (genreA.count > genreB.count ? -1 : 1 ));

  // Limits the results to the top 5
  let sortedGenres = [];
  for (let index = 0; sortedGenres.length < 5 && index < genres.length; index++) {
    sortedGenres.push(genres[index]);
  }

  return sortedGenres;

}

function getAllGenres(books) {
  // Creates an array of all of the genres of the books and only adds a genre to the array if that genre is not already in the array.

  let allGenres = [];
  books.forEach((book) => {
    if (!allGenres.includes(book.genre)) {
      allGenres.push(book.genre);
    }
  });

  return allGenres;

}

function getNumberOfBooksByGenre(books, genre) {
  // Creates an array of books where the genre of the book matches the input genre

  const numberOfBooksByGenre = books.filter((book) => book.genre === genre);
  
  return numberOfBooksByGenre.length;

}

function getMostPopularBooks(books) {
  // INSTRUCTIONS: Takes in an array of book objects as the only parameter.
  // INSTRUCTIONS: Returns an array containing five objects or fewer that represents the most popular books in the library. 
  // NOTE: Popularity is represented by the number of times a book has been borrowed.
  // INSTRUCTIONS: Each object in the returned array should have two keys: The 'name' key which represents the title of the book, and the 'count' key which represents the number of times the book has been borrowed.
  // 1. Created the helper function numberOfBorrowsOfBook() to take in a book object as a parameter and return the number of times it has been borrowed (book.borrowed.length)
  // 2. The map() method was used to declare new variables 'name' for the book title and 'count' for the number of times the book has been borrowed.
  // 2.1 This method returns a new object with the name and count for each book
  // 3. The sort() method was used to organize the books from most popular to least popular based on their count.
  // 4. An empty array sortedBooks was created to store the results 
  // 4.1 A for loop was used to push the first 5 most popular books to the sortedBooks array until the length of the sortedBooks array is 5 or the index is no longer less than the length of the mostPopularBooks array.
  // 4.2 This returns an array of up to the 5 most popular book objects containing the name and count. 

   const mostPopularBooks = books.map((book) => {
    const name = book.title;
    const count = numberOfBorrowsOfBook(book);
    return { name, count };
   });

   mostPopularBooks.sort((bookA, bookB) => (bookA.count > bookB.count ? -1 : 1 ));

   let sortedBooks = [];
   for (let index = 0; sortedBooks.length < 5 && index < mostPopularBooks.length; index++) {
    sortedBooks.push(mostPopularBooks[index]);
   }

   return sortedBooks;

}

function numberOfBorrowsOfBook(book) {
  return book.borrows.length; 
}

function getMostPopularAuthors(books, authors) {
  // INSTRUCTIONS: This function takes in an array of book objects and an array of author objects.
  // INSTRUCTIONS: Returns an array containing five objects or fewer that represents the most popular authors whose books have been checked out the most.
  // NOTE: Popularity is represented by findng all of the books written by the author and then added up the number of times those books have been borrowed.
  // INSTRUCTIONS: Each object in the returned array should have two keys: The 'name' key which represents the first and last name of the author, and the 'count' key which represents the number of times the author's books have been borrowed.

  // 1. Created the helper function booksFilteredByAuthor() that takes in the array of all of the books and an author object and returns a new array of all of the books written by that author (book.authorId === author.id) using the filter method.
  // 2. Created the helper function getTotalNumberOfBorrowsOfBook() that takes in an array of books objects and returns the total number of borrows of those books using the reduce() method.
  // 3. Used the map() method assigned to allAuthors to assign the first and last name of the author to the 'name' key and the total number of borrows of their books to the 'count' key.
  // 3.1 The booksFilteredByAuthor() function was called within the map() method and the results were assigned to the variable allBooksByAuthor
  // 3.2 The getTotalNumberOfBorrowsOfBooks() function was called within the map() method to take in the allBooksByAuthor array and the result was assigned to the 'count' variable
  // 4. Used the sort() method to sort the allAuthors array by count (popularity).
  // 5. Created an empty array sortedAuthors
  // 6. Used a for loop to cycle through each item in allAuthors and push up to the first 5 to the sortedAuthors array.
  // 6.1 The for loop will only continue until the length of the sortedAuthors array is no longer less than 5 and/or the index is no longer less than the length of the allAuthors array.

  const allAuthors = authors.map((author) => {
    const allBooksByAuthor = booksFilteredByAuthor(books, author);
    const authorName = author.name;
    const name = `${authorName.first} ${authorName.last}`;
    const count = getTotalNumberOfBorrowsOfBooks(allBooksByAuthor);

    return { name, count };

});

  allAuthors.sort((authorA, authorB) => (authorA.count > authorB.count ? -1 : 1 ));

  let sortedAuthors = [];
  for (let index = 0; sortedAuthors.length < 5 && index < allAuthors.length; index++) {
    sortedAuthors.push(allAuthors[index]);
  }

  return sortedAuthors;

}

function booksFilteredByAuthor(books, author) {
  //  Takes in the array of all of the books and an author object and returns a new array of all of the books written by that author (book.authorId === author.id) using the filter method.
  const booksByAuthor = books.filter((book) => book.authorId === author.id);
  return booksByAuthor;
}

function getTotalNumberOfBorrowsOfBooks(books) {
  // Takes in an array of book objects and returns the total number of borrows of those books using the reduce() method.
  const result = books.reduce((accumulator, currentBook) => accumulator += numberOfBorrowsOfBook(currentBook), 0);

  return result;
}





module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
