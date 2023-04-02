function findAccountById(accounts, id) {
  // INSTRUCTIONS: This function takes in an array of account objects and a string of the ID of an account as parameters.
  // INSTRUCTIONS: Returns the account object that has the matching ID
  // Finds an account object in the accounts array where the ID of the account matches the ID input into the function
  let foundAccount = accounts.find((accountItem) => accountItem.id === id)
  return foundAccount;
}

function sortAccountsByLastName(accounts) {
  // INSTRUCTIONS: This function takes in an array of account objects as parameters.
  // INSTRUCTIONS: Returns a sorted array of the provided account objects - sorted alphabetically by last name.
  // Sorts the account objects by last name alphabetically
  accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1 );

  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  // INSTRUCTIONS: This function takes in an account object and an array of all book objects as parameters.
  // INSTRUCTIONS: It returns a *number* that represents the number of times the account's ID appears in any book's 'borrows' array.
  // The helper function getTotalNumberOfBorrowsOfBook was created to take in the ID from the account object and the array of borrows from the books
  // The getTotalNumberOfBorrowsOfBook helper function returns the length of a new array of borrows where the input account ID matches the ID in the borrow object.
  // The reduce() method is then used that takes in an accumulator (starting with 0) as well as a book and adds the length of borrows from the getTotalNumberOfBorrowsofBook to the accumulator for each book
  // The reduce() method returns the total number of borrows for books where the account ID matches the ID in the borrows object for each book
  
  // let result = 0;
  // for (let i = 0; i < books.length; i++) {
  //     const book = books[i];
  //     result += getTotalNumberOfBorrowsOfBook(account.id, book.borrows);
  // }

  const result = books.reduce((accumulator, currentBook) => accumulator += getTotalNumberOfBorrowsOfBook(account, currentBook), 0 );
  return result;
}

function getTotalNumberOfBorrowsOfBook({id}, {borrows}) {
  // This is a helper function for the getTotalNumberOfBorrows function - see lines 19 to 24
  return borrows.filter((borrow) => borrow.id === id).length;
}
  

  // let totalBookBorrows = 0;
//   for (let i = 0; i < borrows.length; i++) {
//     const bookBorrow = borrows[i];
//     if (bookBorrow.id === id) {
//       totalBookBorrows += 1;
//     }
// }
// return totalBookBorrows;



function getBooksPossessedByAccount(account, books, authors) {
  /*
  1. Get the books that have not been returned for the account
  1.1. Get the books that are checked out
  1.2. Among the book that are checked out, take the ones that are checked out by the account
  2. Add the author information to the books
  3. Return the books with author information that have not been returned for the account
  */

  // INSTRUCTIONS: This function has three parameters: an account object, an array of all book objects, an array of all author objects
  // INSTRUCTIONS: It returns an array of book objects, *including author information*, that represents all books *currently checked out* by the given account. 
  // NOTE: The author object should also be nestled inside of the book objects that are returned for each book
  // 1. The helper function isBookCheckedOutByAccount was created to  take in the borrows array for each book and an account object and filter all of the borrows for each book and return true if the book was not returned (book.returned === false) and the book ID matched the account ID, otherwise return false
  // 2. This helper function was then used to filter the array of book objects into a new array that included the book objectss that have not been returned and where the account name matches the borrows ID
  // 3. The map() and find() methods were then used to find the authors from the authors array where the ID matched the authorID in the books for each book and then return a new book object that included the author object for that book within the same object. 
  // This resulted in a new array of book objects that had the author object information nestled inside of them.

  const checkedOutBooksByAccount = books.filter((book) => isBookCheckedOutByAccount(book, account));

  const booksWithAuthors = checkedOutBooksByAccount.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return { ...book, author }
  });

  return booksWithAuthors;

}

function isBookCheckedOutByAccount({borrows}, account) {
  const checkedOutBooks = borrows.filter((book) => book.returned === false && book.id === account.id);
  return (checkedOutBooks.length > 0);
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
