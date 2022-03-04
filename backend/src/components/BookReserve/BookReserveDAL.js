import * as dbUtil from '../../util/databaseUtil';
import * as generateIdUtil from '../../util/generateIdUtil';
import { ERRORS, TYPE_ID, FORMAT, BOOK_STATUS, RESERVATION_STATUS, LIMIT, DATABASE_NAME } from '../../constant';
import moment from 'moment';
import { checkMemberInfoExist } from '../Member/MemberDAL';
import { checkLibraryCardExistAndActive } from '../LibraryCard/LibraryCardDAL';
import { checkBookAvailable, checkBookAvailableForReserve } from '../Book/BookDAL';
import { createBookLend } from '../BookLend/BookLendDAL';

export const getAllBookReserve = async () => {
    const sql = `
        SELECT br.*, 
        mi.name, mi.email, mi.phone 
        FROM ${DATABASE_NAME}.book_reservation br
        LEFT JOIN ${DATABASE_NAME}.member_info mi ON mi.id = br.member_id
    `;
    return dbUtil.query(sql, []);
};

export const requestBookReserve = async ({ member_id, book_id }) => {
    const check = await checkLibraryCardExistAndActive(member_id);
    const checkMemberInfo = await checkMemberInfoExist(member_id);
    // const checkBookStatus = await checkBookAvailable(book_id);
    const checkBookReserve = await checkBookAvailableForReserve(book_id);
    const checkBookReserveLimit = await checkMemberReserveReachLimit(member_id);
    const checkReserveBefore = await checkMemberReserveBookBefore(book_id, member_id);

    if (!check) {
        return Promise.reject({ error: 1, message: ERRORS.LIBRARYCARD_NOT_EXIST_OR_ACTIVE });
    } else if (!checkMemberInfo) {
        return Promise.reject({ error: 2, message: ERRORS.USER_NOT_EXIST });
    } else if (!checkBookReserve) {
        return Promise.reject({ error: 3, message: ERRORS.BOOK_NUMBER_RESERVE_NOT_AVAILABLE });
    } else if (checkBookReserveLimit) {
        return Promise.reject({ error: 4, message: ERRORS.BOOK_RESERVE_REACH_LIMIT });
    } else if (checkReserveBefore) {
        return Promise.reject({ error: 5, message: ERRORS.BOOK_RESERVE_BY_MEMBER_BEFORE });
    }

    const sql = 'INSERT INTO book_reservation(id, book_id, member_id, create_date, status) VALUES (?, ?, ?, ?, ?)';
    const id = await generateIdUtil.generate(TYPE_ID.BOOK_RESERVE);
    const create_date = moment(Date.now()).format(FORMAT.DATETIME);
    const status = RESERVATION_STATUS.COMPLETED;
    await dbUtil.query(sql, [id, book_id, member_id, create_date, status]);

    const changeNumBookReserveSql = `UPDATE books SET remain = remain - 1 WHERE id = ?`;
    await dbUtil.query(changeNumBookReserveSql, [book_id]);

    const info = await getBookReserveById(id);
    return info;
};

export const updateBookReserve = async ({ id, book_id, member_id, create_date, status }) => {
    const check = await checkLibraryCardExist(id);
    if (check) {
        const bookReserveData = { id, book_id, member_id, create_date, status };
        const sql = 'UPDATE book_reservation SET ? WHERE id = ?';
        await dbUtil.query(sql, [bookReserveData, id]);

        // if admin verify book reserve -> user start lending book
        if(status = RESERVATION_STATUS.VERIFIED) {
            await createBookLend({ book_id, member_id });
        }

        const info = await getBookReserveById(id);
        return info;
    } else {
        return Promise.reject(ERRORS.BOOK_RESERVE_NOT_EXIST);
    }
};

export const deleteBookReserve = async (id) => {
    const sql = 'DELETE FROM book_reservation WHERE id = ? LIMIT 1';
    const { affectedRows } = await dbUtil.query(sql, [id]);
    if (affectedRows === 0) {
        return Promise.reject(ERRORS.BOOK_RESERVE_NOT_EXIST);
    }
};

export const checkLibraryCardExist = async (id) => {
    const sql = 'SELECT * FROM book_reservation WHERE id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};

export const checkLibraryCardMemberIdExist = async (id) => {
    const sql = 'SELECT * FROM book_reservation WHERE member_id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};

export const getBookReserveById = async (id) => {
    const sql = 'SELECT * FROM book_reservation WHERE id = ?';
    const info = await dbUtil.queryOne(sql, [id]);
    return info;
};

export const getBookReserveByUserId = async (id) => {
    const check = await checkLibraryCardMemberIdExist(id);
    if (!check) {
        return Promise.reject(ERRORS.LIBRARYCARD_NOT_EXIST);
    }
    const sql = `
        SELECT br.*, 
        b.title 
        FROM ${DATABASE_NAME}.book_reservation br
        LEFT JOIN ${DATABASE_NAME}.books b ON b.id = br.book_id
        WHERE br.member_id = ?
    `;
    const list = await dbUtil.query(sql, [id]);
    return list;
};

export const getBookReserveByBookId = async (book_id) => {
    const sql = `
        SELECT br.*, 
        mi.name, mi.email, mi.phone 
        FROM ${DATABASE_NAME}.book_reservation br
        LEFT JOIN ${DATABASE_NAME}.member_info mi ON mi.id = br.member_id
        WHERE br.book_id = ? 
        AND NOT (br.status = ${RESERVATION_STATUS.VERIFIED})
    `;
    return dbUtil.query(sql, [book_id]);
};

// check when user serve book before
export const checkMemberReserveBookBefore = async (book_id, member_id) => {
    const sql = `
        SELECT * FROM book_reservation 
        WHERE book_id = ? 
        AND member_id = ?
        AND status = ${RESERVATION_STATUS.COMPLETED} 
    `;
    const result = await dbUtil.query(sql, [book_id, member_id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};

export const checkMemberReserveReachLimit = async (id) => {
    const sql = `
        SELECT COUNT(member_id) as count 
        FROM book_reservation WHERE member_id = ? 
        AND status = ${RESERVATION_STATUS.COMPLETED} 
    `;
    const result = await dbUtil.queryOne(sql, [id]);
    if (result.count >= LIMIT.RESERVATION) {
        return true;
    }
    return false;
};