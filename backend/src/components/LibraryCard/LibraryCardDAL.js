import * as dbUtil from '../../util/databaseUtil';
import { ERRORS } from '../../constant';

export const getAllLibraryCard = async () => {
    const sql = 'SELECT * FROM library_card';
    return dbUtil.query(sql, []);
};

export const createLibraryCard = async ({ id , member_id , issue_date , active_flg}) => {
    const check = await checkLibraryCardExist(id);
    if (check) {
        return Promise.reject(ERRORS.LIBRARYCARD_EXIST);
    }
    const sql = 'INSERT INTO library_card(id , member_id , issue_date , active_flg) VALUES (?, ?, ?,?)';
    await dbUtil.query(sql, [id , member_id , issue_date , active_flg]);
    const libraryCard = await getLibraryCardById(id);
    return libraryCard;
};

export const updateLibraryCard = async ({id , member_id , issue_date , active_flg }) => {
    const check = await checkLibraryCardExist(id);
    if (check) {
        const libraryCardData = { id , member_id , issue_date , active_flg};
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

export const getLibraryCardById = async (id) => {
    const sql = 'SELECT * FROM library_card WHERE id = ?';
    const libraryCard = await dbUtil.queryOne(sql, [id]);
    return libraryCard;
};