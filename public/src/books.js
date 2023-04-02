function findAuthorById(authors, id) {
  // INSTRUCTIONS: This function takes in an array of author objects and an integer ID of a single author object as parameters.
  // INSTRUCTIONS: Returns the author object that has the matching ID.
  // The find() method was used to find the author object where the ID matched the ID input into the function. 

  let foundAuthor = authors.find((author) => author.id === id);
  return foundAuthor;

}

function findBookById(books, id) {
  // INSTRUCTIONS: This function takes in an array of book objects and a string ID of a single object as parameters.
  // INSTRUCTIONS: Returns the book object that has the matching ID.
  // The find() method was used to find the book object where the ID matched the ID input into the function.

  let foundBook = books.find((book) => book.id === id);
  return foundBook;

}

function partitionBooksByBorrowedStatus(books) {
  // INSTRUCTIONS: Takes in an array of book objects as the only parameter.
  // INSTRUCTIONS: Returns an array with two arrays inside of it. All of the inputted books are present in either the first or second array.
  // INSTRUCTIONS: The first array should contain book objects that represent the books that are *currently checked out*, while the second array should contain book objects that represent the books that *have been returned*.
  // NOTE: The return status can be found in the 'borrows' array contained within each book object.
  // 1. Two helper functions isBookCheckedOut() and isBookReturned() were created that each take in an array of borrows from each book.
  // 1.1 The isBookCheckedOut() function returns true if the book has not been returned (book.returned === false) and otherwise returns false
  // 1.2 The isBookReturned() function returns true if the book has been returned (*every* book.returned === true) and otherwise returns false
  // 2. The book objects were then filtered into two separate arrays for each helper function.
  // NOTE: This could also have been done with only one helper function by using the same function again and returning the ones that do NOT return true, since these are mutually exclusive.
  // NOTE EXAMPLE: const allReturnedBooks = books.filter((book) => !isBookCheckedOut(book));
  // 3. The partitionBooksByBorrowedStatus() function then returns a new array containing the new arrays of allCheckedoutBooks and allReturnedBooks.

  const allCheckedOutBooks = books.filter((book) => isBookCheckedOut(book));
  const allReturnedBooks = books.filter((book) => isBookReturned(book));
  return [allCheckedOutBooks, allReturnedBooks];

}

function isBookCheckedOut({borrows}){
  const checkedOutBooks = borrows.filter((book) => book.returned === false);
  return (checkedOutBooks.length > 0);
}

function isBookReturned({borrows}){
  const returnedBooks = borrows.every((book) => book.returned === true);
  return returnedBooks;
}

function getBorrowersForBook(book, accounts) {
  // INSTRUCTIONS: This function takes in a book object and an array of all account objects as parameters.
  // INSTRUCTIONS: Returns an array of ten or fewer account objects that represents the accounts given by the IDs in the provided book's 'borrows' array.
  // NOTE: However, each account object should include the 'returned' entry from the corresponding transaction object in the 'borrows' array.
  // 1. The helper function didAccountBorrowBook() was created to determine whether an account borrowed a specific book
  // 1.1 The helper functions was used to create a new array of borrows where the borrow ID matches the account ID.
  // 2. An empty array accountList was created
  // 2.1 A for loop was used to cycle through the accounts and use the didAccountBorrowBook() function to determine if the account borrowed the book for each account. 
  // 3. The account and returned status were then pushed to a new object within the accountList array when the account borrowed the book.
  // 4. This for loop continues as long as the length of the accountList array is less than 10 and the index is less than the lenth of the array of the accounts. 

  let accountList = [];
  for (let index = 0; accountList.length < 10 && index < accounts.length; index++){
    const account = accounts[index];
    if (didAccountBorrowBook(book, account)){
      const {returned} = book.borrows.find((borrow) => borrow.id === account.id)
      accountList.push({...account, returned});
    }
  }

  return accountList;

}

function didAccountBorrowBook({borrows}, account){
  // Returns a boolean (true or false) if one of the borrow IDs matches the account ID
  const bookBorrowers = borrows.some((borrow) => borrow.id === account.id);
  return bookBorrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
