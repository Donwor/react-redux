"use strict"

// Books reducers

export function booksReducers(state={
  books:[{
    _id: 1,
    title: 'this is the book title',
    description: 'this is the book description',
    price: 44.33
  },
  {
    _id: 2,
    title: 'this is the second book title',
    description: 'this is the second book description',
    price: 55
  }]
}, action) {
  switch (action.type) {
    case "GET_BOOKS":
      return {...state, books:[...state.books]};
  break;
      case "POST_BOOK":
        let books = state.books.concat(action.payload);
        return {books:[...state.books, ...action.payload]};
    break;

    case "DELETE_BOOK":
        // create a copy of the current book to delete
        const currentBookToDelete = [...state.books]
        // Determine at which index in ooks array is the book to be deleted
        const indexToDelete = currentBookToDelete.findIndex(
          function(book){
            return book._id.toString() === action.payload;
          }
        )
        // use slice to remove te book at the specified index
        return {books: [...currentBookToDelete.slice(0, indexToDelete),
        ...currentBookToDelete.slice(indexToDelete + 1)]}
    break;

    case "UPDATE_BOOK":
        //create a copy of the current array of books
        const currentBookToUpdate = [...state.books]
        // Determine at which index in books array is the book to be deleted
        const indexToUpdate = currentBookToUpdate.findIndex(
          function(book){
            return book._id === action.payload._id;
          }
        )
        // Create a new book object with the new values and with the same array index of the item we want to replace
        // To achieve this we will use ...spread but we could use concat method too
        const newBookToUpdate = {
          ...currentBookToUpdate[indexToUpdate],
          title: action.payload.title
        }
        // This log has the purpose to show how the newBookToUpdate looks like
        console.log('What is it newBookToUpdate', newBookToUpdate);
        // Use slice to remove the book at specified index, replace with the new object and concatenate with the rest of items in the array
        return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,...currentBookToUpdate.slice(indexToUpdate +1)]}
    break;

  }
  return state
}
