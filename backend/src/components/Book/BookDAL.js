import * as dbUtil from '../../util/databaseUtil';
import { ERRORS } from '../../constant';
import { filename } from 'winston-daily-rotate-file';

export const getAllBook = async () => {
    const sql = 'SELECT * FROM books';
    return dbUtil.query(sql, []);
};

export const createBook = async ({ id, author_id, rack_id , isbn ,  price , title , subject , publisher , publish_date , date_purchase , language , number_of_pages , status , borrow_date , due_date }) => {
    const check = await checkBookExist(id);
    if (check) {
        return Promise.reject(ERRORS.BOOK_EXIST);
    }
    const sql = 'INSERT INTO books(id, author_id,rack_id , isbn ,  price , title , subject , publisher , publish_date , date_purchase , language , number_of_pages , status , borrow_date , due_date ) VALUES (?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?)';
    await dbUtil.query(sql, [id, author_id, rack_id , isbn ,  price , title , subject , publisher , publish_date , date_purchase , language , number_of_pages , status , borrow_date , due_date ]);
    const book = await getBookById(id);
    return book;
};

export const updateBook = async ({ id, author_id, rack_id , isbn ,  price , title , subject , publisher , publish_date , date_purchase , language , number_of_pages , status , borrow_date , due_date }) => {
    const check = await checkBookExist(id);
    if (check) {
        const bookData = { id, author_id, rack_id , isbn ,  price , title , subject , publisher , publish_date , date_purchase , language , number_of_pages , status , borrow_date , due_date }
        const sql = 'UPDATE books SET ? WHERE id = ?';
        await dbUtil.query(sql, [bookData, id]);
        const book = await getBookById(id);
        return book;
    } else {
        return Promise.reject(ERRORS.BOOK_NOT_EXIST);
    }
};

export const deleteBook = async (id) => {
    const sql = 'DELETE FROM books WHERE id = ? LIMIT 1';
    const { affectedRows } = await dbUtil.query(sql, [id]);
    if (affectedRows === 0) {
        return Promise.reject(ERRORS.BOOK_NOT_EXIST);
    }
};

export const checkBookExist = async (id) => {
    const sql = 'SELECT * FROM books WHERE id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};

export const getBookById = async (id) => {
    const sql = 'SELECT * FROM books WHERE id = ?';
    const book = await dbUtil.queryOne(sql, [id]);
    return book;
};

export const searchBook = async (author_id,title,subject) => {
    // SELECT * FROM library_management.books WHERE author LIKE '%a' OR title LIKE '%a';

    // var numPerPage = 20;
    // var skip = (page - 1) * numPerPage;
    // var limit = skip + ',' + numPerPage; // Here we compute the LIMIT parameter for MySQL query
    // sql.query('SELECT count(*) as numRows FROM users', function (err, rows, fields) {
    //     if (err) {
    //         console.log("error: ", err);
    //         result(err, null);
    //     } else {
    //         var numRows = rows[0].numRows;
    //         var numPages = Math.ceil(numRows / numPerPage);
    //         sql.query('SELECT * FROM users LIMIT ' + limit, function (err, rows, fields) {
    //             if (err) {
    //                 console.log("error: ", err);
    //                 result(err, null);
    //             } else {
    //                 console.log(rows)
    //                 result(null, rows, numPages);
    //             }
    //         });
    //     }
    // });

    const sql = 'SELECT * from books WHERE ? = ?';
    var fieldName = 1;
    var fieldValue = 1;
    if(author_id !=null){
        const sql2 = 'SELECT * from books,author WHERE books.author_id = author.id AND books.author_id = ?';
        const books2 = await dbUtil.queryOne(sql, [author_id]);
        return books2;
    }else if(title != null){
        fieldName = "title";
        fieldValue = title;
    }else if(subject != null){
        fieldName = "subject";
        fieldValue = subject;
    }
    const books = await dbUtil.queryOne(sql, [fieldName,fieldValue]);
    return books;
};