const {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler
} = require('./handler');

const routes = [
    {
        //route menampilkan semua data book
        method: 'GET',
        path: '/books',
        handler : getAllBooksHandler
    },
    {
        //route menampilkan data book berdasarkan id
        method: 'GET',
        path: '/books/{bookId}',
        handler : getBookByIdHandler
    },
    {
        //route menambahkan data book
        method: 'POST',
        path: '/books',
        handler : addBookHandler
    },
    {
        //route mengubah book berdasarkan id
        method: 'PUT',
        path: '/books/{bookId}',
        handler : editBookByIdHandler
    },
    {
        //route menampilkan semua data book
        method: 'DELETE',
        path: '/books/{bookId}',
        handler : deleteBookByIdHandler
    }
]

module.exports = routes;