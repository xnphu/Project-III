import * as dbUtil from '../../util/databaseUtil';
import * as generateIdUtil from '../../util/generateIdUtil';
import { ERRORS, TYPE_ID, DATABASE_NAME, BOOK_STATUS } from '../../constant';

export const getAllBook = async (sortBy) => {
    var orderBy;
    switch (sortBy) {
        case 'Titles':
            orderBy = 'b.title';
            break;
        case 'Authors':
            orderBy = 'author_name';
            break;
        case 'Subjects':
            orderBy = 'b.subject';
            break;
        default:
            break;
    }
    const sql = `
        SELECT b.*, 
        a.name as "author_name", a.description as "author_description",
        r.number as "location_number"    
        FROM ${DATABASE_NAME}.books b
        LEFT JOIN ${DATABASE_NAME}.author a ON a.id = b.author_id
        LEFT JOIN ${DATABASE_NAME}.rack r ON r.id = b.rack_id
        ORDER BY ${orderBy != undefined ? orderBy : 'b.id'}    
    `;
    return dbUtil.query(sql, []);
};

export const getBookSuggest = async () => {
    const sql = `
        SELECT b.*, 
        a.name as "author_name", a.description as "author_description",
        r.number as "location_number"    
        FROM ${DATABASE_NAME}.books b
        LEFT JOIN ${DATABASE_NAME}.author a ON a.id = b.author_id
        LEFT JOIN ${DATABASE_NAME}.rack r ON r.id = b.rack_id
        ORDER BY RAND() 
        LIMIT 5    
    `;
    return dbUtil.query(sql, []);
};

export const createBook = async ({ author_id, rack_id, isbn, price, title, description, subject, publisher, publish_date, date_purchase, language, number_of_pages, status }) => {
    const sql = 'INSERT INTO books(id, author_id,rack_id , isbn ,  price , title , description, subject , publisher , publish_date , date_purchase , language , number_of_pages, previewUrl , status ) VALUES (?, ?, ?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?)';
    const id = await generateIdUtil.generate(TYPE_ID.BOOK);
    const previewUrl = `https://cft.findbook.tw/image/book/${isbn}/large`;
    await dbUtil.query(sql, [id, author_id, rack_id, isbn, price, title, description, subject, publisher, publish_date, date_purchase, language, number_of_pages, previewUrl, status]);
    const book = await getBookById(id);
    return book;
};

export const updateBook = async ({ id, author_id, rack_id, isbn, price, title, subject, publisher, publish_date, date_purchase, language, number_of_pages, status, borrow_date, due_date }) => {
    const check = await checkBookExist(id);
    if (check) {
        const bookData = { id, author_id, rack_id, isbn, price, title, subject, publisher, publish_date, date_purchase, language, number_of_pages, status, borrow_date, due_date }
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
    const sql = `
        SELECT b.*, 
        a.name as "author_name", a.description as "author_description",
        r.number as "location_number"
        FROM ${DATABASE_NAME}.books b
        LEFT JOIN ${DATABASE_NAME}.author a ON a.id = b.author_id
        LEFT JOIN ${DATABASE_NAME}.rack r ON r.id = b.rack_id 
        WHERE b.id = ?
    `;
    const book = await dbUtil.queryOne(sql, [id]);
    return book;
};

export const searchBook = async (author_id, title, subject) => {
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
    if (author_id != null) {
        const sql2 = 'SELECT * from books,author WHERE books.author_id = author.id AND books.author_id = ?';
        const books2 = await dbUtil.queryOne(sql, [author_id]);
        return books2;
    } else if (title != null) {
        fieldName = "title";
        fieldValue = title;
    } else if (subject != null) {
        fieldName = "subject";
        fieldValue = subject;
    }
    const books = await dbUtil.queryOne(sql, [fieldName, fieldValue]);
    return books;
};

export const checkBookAvailable = async (id) => {
    const sql = 'SELECT * FROM books WHERE id = ?';
    const result = await dbUtil.queryOne(sql, [id]);
    if (result.status == BOOK_STATUS.AVAILABLE) {
        return true;
    }
    return false;
};

export const checkBookAvailableForReserve = async (id) => {
    const sql = 'SELECT * FROM books WHERE id = ?';
    const result = await dbUtil.queryOne(sql, [id]);
    if (result.remain > 0) {
        return true;
    }
    return false;
};