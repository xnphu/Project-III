import * as dbUtil from '../../util/databaseUtil';
import { ERRORS } from '../../constant';

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