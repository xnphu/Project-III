import * as dbUtil from '../../util/databaseUtil';
import * as generateIdUtil from '../../util/generateIdUtil';
import { ERRORS, TYPE_ID, LIBRARY_CARD, DATABASE_NAME, FORMAT } from '../../constant';
import moment from 'moment';

export const getAllLibraryCard = async () => {
    const sql = `
        SELECT lc.*, 
        mi.name, mi.email, mi.phone 
        FROM ${DATABASE_NAME}.library_card lc
        LEFT JOIN ${DATABASE_NAME}.member_info mi ON mi.id = lc.member_id
    `;
    return dbUtil.query(sql, []);
};

export const createLibraryCard = async ({ member_id }) => {
    const check = await checkLibraryCardMemberIdExist(member_id);
    const checkMemberInfo = await checkMemberInfoExist(member_id);
    if (check) {
        return Promise.reject({ error: 1, message: ERRORS.LIBRARYCARD_EXIST });
    } else if (!checkMemberInfo) {
        return Promise.reject({ error: 2, message: ERRORS.USER_NOT_EXIST });
    }
    const sql = 'INSERT INTO library_card(id , member_id , issue_date , active_flg) VALUES (?, ?, ?, ?)';
    const id = await generateIdUtil.generate(TYPE_ID.LIBRARY_CARD);
    const issue_date = moment(Date.now()).format(FORMAT.DATE);
    const active_flg = LIBRARY_CARD.INACTIVE;
    await dbUtil.query(sql, [id, member_id, issue_date, active_flg]);
    const libraryCard = await getLibraryCardById(id);
    return libraryCard;
};

export const updateLibraryCard = async ({ id, member_id, issue_date, active_flg }) => {
    const check = await checkLibraryCardExist(id);
    if (check) {
        const libraryCardData = { id, member_id, issue_date, active_flg };
        const sql = 'UPDATE library_card SET ? WHERE id = ?';
        await dbUtil.query(sql, [libraryCardData, id]);
        const libraryCard = await getLibraryCardById(id);
        return libraryCard;
    } else {
        return Promise.reject(ERRORS.LIBRARYCARD_NOT_EXIST);
    }
};

export const deleteLibraryCard = async (id) => {
    const sql = 'DELETE FROM library_card WHERE id = ? LIMIT 1';
    const { affectedRows } = await dbUtil.query(sql, [id]);
    if (affectedRows === 0) {
        return Promise.reject(ERRORS.LIBRARYCARD_NOT_EXIST);
    }
};

export const checkLibraryCardExist = async (id) => {
    const sql = 'SELECT * FROM library_card WHERE id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};

export const checkLibraryCardMemberIdExist = async (id) => {
    const sql = 'SELECT * FROM library_card WHERE member_id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};

export const getLibraryCardById = async (id) => {
    const sql = 'SELECT * FROM library_card WHERE id = ?';
    const libraryCard = await dbUtil.queryOne(sql, [id]);
    return libraryCard;
};

export const getLibraryCardByUserId = async (id) => {
    const check = await checkLibraryCardMemberIdExist(id);
    if (!check) {
        return Promise.reject(ERRORS.LIBRARYCARD_NOT_EXIST);
    }
    const sql = 'SELECT * FROM library_card WHERE member_id = ?';
    const libraryCard = await dbUtil.queryOne(sql, [id]);
    return libraryCard;
};

export const checkMemberInfoExist = async (id) => {
    const sql = 'SELECT * FROM member_info WHERE id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};

export const checkLibraryCardExistAndActive = async (id) => {
    const sql = `SELECT * FROM library_card WHERE member_id = ? AND active_flg = ${LIBRARY_CARD.ACTIVE} LIMIT 1`;
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};