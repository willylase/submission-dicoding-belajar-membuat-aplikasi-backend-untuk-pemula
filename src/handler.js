const {nanoid} = require('nanoid');
const books = require('./books');

//handler untuk create book
const addBookHandler = (request, h ) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    //error untuk menampilkan apabila name pada book tidak diisi
    if (!name){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    }

    //error untuk menampilkan apabila readpage > pagecount
    if (readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }

    //untuk menampung data buku
    const newBook = {
        id, name, year, author, summary, publisher, pageCount,  finished, readPage, reading,  insertedAt, updatedAt
    };
    //mengirimkan data yanh ada pada new book
    books.push(newBook);
    //mengecek new book jika sudah dikirim atau dipush
    const isSuccess = books.filter((book) => book.id === id).length > 0;
    //kondisi untuk mengecek apakah sukses atau gagal
    if (isSuccess){
        const response = h.response({
            status: "success",
            message: "Book berhasil ditambahkan",
            data: {
                bookId: id
            }
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: "error",
        message: "Buku gagal ditambahkan"
    });
    response.code(500);
    return response;
};

//1. handler get all books
const getAllBooksHandler = (request, h) => {
    const {name, reading, finished} = request.query;


    if (name){
        const book = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
        const response = h.response({
            status: "success",
            books: book.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        });
        response.code(200);
        return response;
    }


    if (reading){
        const book = books.filter((book) => Number(book.reading) === Number(reading));
        const response = h.response({
            status: "success",
            data:{
                books: book.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }


    if (finished){
        const book = books.filter((book) => Number(book.finished) === Number(finished));
        const response = h.response({
            status: "success",
            data:{
                books: book.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }

    const response = h.response({
       status: "success",
        data: {
           books :books.map((book) => ({
              id: book.id,
               name: book.name,
               publisher: book.publisher
           })),
        }
    });
    response.code(200);
    return  response;

};

//handler nemampilkan notes berdasarkan id
const getBookByIdHandler = (request, h) => {
    const {bookId} = request.params;
    const book = books.filter((bookk) => bookk.id === bookId)[0];
    if (book !== undefined){
        return {
            status: "success",
            data : {
                book
            }
        }
    }
    const response = h.response({
       status: "fail",
       message: "Buku tidak ditemukan"
    });
    response.code(404);
    return response;
};

const editBookByIdHandler = (request, h) => {
    //mengambil id dari parameter
    const {bookId} = request.params;

    //mengambil data dari request body
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    const updatedAt = new Date().toISOString();
    const finished = pageCount === readPage;
    const index = books.findIndex((book) => book.id === bookId);

    //error untuk menampilkan apabila name pada book tidak diisi
    if (!name){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    }
    //error untuk menampilkan apabila readpage > pagecount
    if (readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }


    if (index !== -1){
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt
        }
        const response = h.response({
           status: "success",
           message: "Buku berhasil diperbarui"
        });
        response.code(200);
        return  response;
    }
    const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan"
    });
    response.code(404);
    return  response;
};

const deleteBookByIdHandler = (request, h) => {
    const {bookId} = request.params;
    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1){
        books.splice(index, 1);
        const response = h.response({
            status: "success",
            message: "Buku berhasil dihapus"
        });
        response.code(200);
        return  response;
    }
    const response = h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan"
    });
    response.code(404);
    return  response;
};

module.exports =  {
  addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler
};