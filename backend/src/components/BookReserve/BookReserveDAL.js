import * as dbUtil from '../../util/databaseUtil';
import * as generateIdUtil from '../../util/generateIdUtil';
import { ERRORS, TYPE_ID, FORMAT, BOOK_STATUS, RESERVATION_STATUS, LIMIT } from '../../constant';
import moment from 'moment';
import { checkMemberInfoExist } from '../Member/MemberDAL';
import { checkLibraryCardExistAndActive } from '../LibraryCard/LibraryCardDAL';
import { checkBookAvailable } from '../Book/BookDAL';

export const getAllBookReserve = async () => {
    const sql = 'SELECT * FROM book_reservation';
    return dbUtil.query(sql, []);
};

export const requestBookReserve = async ({ member_id, book_id }) => {
    const check = await checkLibraryCardExistAndActive(member_id);
    const checkMemberInfo = await checkMemberInfoExist(member_id);
    const checkBookStatus = await checkBookAvailable(book_id);
    const checkBookReserveLimit = await checkMemberReserveReachLimit(member_id);

    if (!check) {
        return Promise.reject({ error: 1, message: ERRORS.LIBRARYCARD_NOT_EXIST_OR_ACTIVE });
    } else if (!checkMemberInfo) {
        return Promise.reject({ error: 2, message: ERRORS.USER_NOT_EXIST });
    } else if (!checkBookStatus) {
        return Promise.reject({ error: 3, message: ERRORS.BOOK_STATUS_NOT_AVAILABLE });
    } else if (checkBookReserveLimit) {
        return Promise.reject({ error: 4, message: ERRORS.BOOK_RESERVE_REACH_LIMIT });
    }

    const sql = 'INSERT INTO book_reservation(id, book_id, member_id, create_date, status) VALUES (?, ?, ?, ?, ?)';
    const id = await generateIdUtil.generate(TYPE_ID.BOOK_RESERVE);
    const create_date = moment(Date.now()).format(FORMAT.DATETIME);
    const status = RESERVATION_STATUS.WAITING;
    await dbUtil.query(sql, [id, book_id, member_id, create_date, status]);

    const changeStatusBookSql = `UPDATE books SET status = ${BOOK_STATUS.RESERVED} WHERE id = ?`;
    await dbUtil.query(changeStatusBookSql, [id]);

    const info = await getBookReserveById(id);
    return info;
};

export const updateBookReserve = async ({ id, book_id, member_id, create_date, status }) => {
    const check = await checkLibraryCardExist(id);
    if (check) {
        const libraryCardData = { id, book_id, member_id, create_date, status };
        const sql = 'UPDATE book_reservation SET ? WHERE id = ?';
        await dbUtil.query(sql, [libraryCardData, id]);
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
    const sql = 'SELECT * FROM book_reservation WHERE member_id = ?';
    const list = await dbUtil.query(sql, [id]);
    return list;
};

export const checkMemberReserveReachLimit = async (id) => {
    const sql = `
        SELECT COUNT(member_id) as count 
        FROM book_reservation WHERE member_id = ? 
        AND status = ${RESERVATION_STATUS.WAITING} 
        OR status = ${RESERVATION_STATUS.PENDING}
    `;
    const result = await dbUtil.queryOne(sql, [id]);
    if (result.count >= LIMIT.RESERVATION) {
        return true;
    }
    return false;
};