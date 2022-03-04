import * as dbUtil from '../../util/databaseUtil';
import * as generateIdUtil from '../../util/generateIdUtil';
import { ERRORS, TYPE_ID, DATABASE_NAME, FORMAT, LENDING_STATUS, FINE_PER_WEEK } from '../../constant';
import moment from 'moment';
import { checkBookExist, getBookById } from '../Book/BookDAL';

export const getAllBookLend = async () => {
    const sql = `
        SELECT bl.*, 
        mi.name, mi.email, mi.phone 
        FROM ${DATABASE_NAME}.book_lending bl
        LEFT JOIN ${DATABASE_NAME}.member_info mi ON mi.id = bl.member_id
    `;
    return dbUtil.query(sql, []);
};

export const createBookLend = async ({ member_id, book_id }) => {
    const check = await checkLibraryCardMemberIdExist(member_id);
    const checkMemberInfo = await checkMemberInfoExist(member_id);
    if (!check) {
        return Promise.reject({ error: 1, message: ERRORS.LIBRARYCARD_EXIST });
    } else if (!checkMemberInfo) {
        return Promise.reject({ error: 2, message: ERRORS.USER_NOT_EXIST });
    } else if (!checkBookExist) {
        return Promise.reject({ error: 3, message: ERRORS.BOOK_NOT_EXIST });
    }

    const sql = 'INSERT INTO book_lending(id, book_id,  member_id, create_date, due_date, fine_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const id = await generateIdUtil.generate(TYPE_ID.BOOK_LEND);
    const create_date = moment(Date.now()).format(FORMAT.DATETIME);
    // due_date = create_date + 7 days
    const due_date = moment(Date.now()).add(7, 'd').format(FORMAT.DATETIME);
    const fine_amount = 0;
    const status = LENDING_STATUS.LOAN;
    await dbUtil.query(sql, [id, book_id,  member_id, create_date, due_date, fine_amount, status]);

    const bookLend = await getBookLendById(id);
    return bookLend;
};

export const updateBookLend = async ({ id, book_id,  member_id, create_date, due_date, return_date, fine_amount, status }) => {
    const check = await checkBookLendExist(id);
    if (check) {
        // check book lend over due fine
        var fine = await calculateFine(book_id, fine_amount, due_date, return_date, status);
        const bookLendData = { id, book_id,  member_id, create_date, due_date, return_date, fine_amount: fine, status };
        const sql = 'UPDATE book_lending SET ? WHERE id = ?';
        await dbUtil.query(sql, [bookLendData, id]);
        const libraryCard = await getBookLendById(id);
        return libraryCard;
    } else {
        return Promise.reject(ERRORS.BOOK_LEND_NOT_EXIST);
    }
};

export const calculateFine = async (book_id, fine_amount, due_date, return_date, status) => {
    var fine = 0;

    if (status === LENDING_STATUS.FINISHED) {
        return fine_amount;
    }

    var dateFrom = new Date(due_date);
    var dateTo = return_date != null ? new Date(return_date) : new Date();
    
    // To calculate the time difference of two dates
    var differenceInTime = dateTo.getTime() - dateFrom.getTime();
    
    // To calculate the no. of days between two dates
    var differenceInDays = differenceInTime / (1000 * 3600 * 24);
    console.log('lala ', differenceInDays);

    if (differenceInDays <= 0) {
        return fine;
    } else if (differenceInDays > 0 && differenceInDays <= 30) {
        return fine + Math.floor(differenceInDays / 7 + 1) * FINE_PER_WEEK;
    } else {
        const book = await getBookById(book_id);
        return fine + book.price;
    };
};

export const deleteBookLend = async (id) => {
    const sql = 'DELETE FROM book_lending WHERE id = ? LIMIT 1';
    const { affectedRows } = await dbUtil.query(sql, [id]);
    if (affectedRows === 0) {
        return Promise.reject(ERRORS.BOOK_LEND_NOT_EXIST);
    }
};

export const checkBookLendExist = async (id) => {
    const sql = 'SELECT * FROM book_lending WHERE id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};

export const getBookLendById = async (id) => {
    const sql = `
        SELECT bl.*, 
        mi.name, mi.email, mi.phone 
        FROM ${DATABASE_NAME}.book_lending bl
        LEFT JOIN ${DATABASE_NAME}.member_info mi ON mi.id = bl.member_id
        WHERE bl.id = ?
    `;
    const libraryCard = await dbUtil.queryOne(sql, [id]);
    return libraryCard;
};

export const checkLibraryCardMemberIdExist = async (id) => {
    const sql = 'SELECT * FROM library_card WHERE member_id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};

export const getBookLendByUserId = async (id) => {
    const check = await checkLibraryCardMemberIdExist(id);
    if (!check) {
        return Promise.reject(ERRORS.LIBRARYCARD_NOT_EXIST);
    }
    const sql = `
        SELECT bl.*, 
        b.title 
        FROM ${DATABASE_NAME}.book_lending bl
        LEFT JOIN ${DATABASE_NAME}.books b ON b.id = bl.book_id
        WHERE bl.member_id = ?
    `;
    const list = await dbUtil.query(sql, [id]);
    return list;
};

export const checkMemberInfoExist = async (id) => {
    const sql = 'SELECT * FROM member_info WHERE id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};