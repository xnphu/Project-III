import * as dbUtil from '../../util/databaseUtil';
import * as generateIdUtil from '../../util/generateIdUtil';
import { ERRORS, TYPE_ID } from '../../constant';

export const getAllAuthors = async () => {
    const sql = 'SELECT * FROM author';
    return dbUtil.query(sql, []);
};

export const createAuthor = async ({ name, description }) => {
    const id = await generateIdUtil.generate(TYPE_ID.AUTHOR);
    const sql = 'INSERT INTO author(id, name, description) VALUES (?, ?, ?)';
    await dbUtil.query(sql, [id, name, description]);
    const author = await getAuthorById(id);
    return author;
};

export const updateAuthor = async ({ id, name, description }) => {
    const check = await checkAuthorExist(id);
    if (check) {
        const authorData = { id, name, description };
        const sql = 'UPDATE author SET ? WHERE id = ?';
        await dbUtil.query(sql, [authorData, id]);
        const author = await getAuthorById(id);
        return author;
    } else {
        return Promise.reject(ERRORS.AUTHOR_NOT_EXIST);
    }
};

export const deleteAuthor = async (id) => {
    const sql = 'DELETE FROM author WHERE id = ? LIMIT 1';
    const { affectedRows } = await dbUtil.query(sql, [id]);
    if (affectedRows === 0) {
        return Promise.reject(ERRORS.AUTHOR_NOT_EXIST);
    }
};

export const checkAuthorExist = async (id) => {
    const sql = 'SELECT * FROM author WHERE id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};

export const getAuthorById = async (id) => {
    const sql = 'SELECT * FROM author WHERE id = ?';
    const author = await dbUtil.queryOne(sql, [id]);
    return author;
};