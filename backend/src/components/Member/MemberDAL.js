import * as dbUtil from '../../util/databaseUtil';
import { ERRORS } from '../../constant';

export const getAllMember = async () => {
    const sql = 'SELECT * FROM member';
    return dbUtil.query(sql, []);
};

export const createMember = async ({ id, password, name , email , phone , sex , date_of_birth , street , city , zip_code , country , status }) => {
    const check = await checkMemberExist(id);
    if (check) {
        return Promise.reject(ERRORS.USER_EXIST);
    }
    const sql = 'INSERT INTO member(id, password, name , email , phone , sex , date_of_birth , street , city , zip_code , country , status ) VALUES (?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?)';
    await dbUtil.query(sql, [id, password, name , email , phone , sex , date_of_birth , street , city , zip_code , country , status ]);
    const member = await getMemberById(id);
    return member;
};

export const updateMember = async ({ id, password, name , email , phone , sex , date_of_birth , street , city , zip_code , country , status }) => {
    const check = await checkMemberExist(id);
    if (check) {
        const memberData = { id, password, name , email , phone , sex , date_of_birth , street , city , zip_code , country , status }
        const sql = 'UPDATE member SET ? WHERE id = ?';
        await dbUtil.query(sql, [memberData, id]);
        const member = await getMemberById(id);
        return member;
    } else {
        return Promise.reject(ERRORS.CUSTOMER_NOT_EXIST);
    }
};

export const deleteMember = async (id) => {
    const sql = 'DELETE FROM member WHERE id = ? LIMIT 1';
    const { affectedRows } = await dbUtil.query(sql, [id]);
    if (affectedRows === 0) {
        return Promise.reject(ERRORS.CUSTOMER_NOT_EXIST);
    }
};

export const checkMemberExist = async (id) => {
    const sql = 'SELECT * FROM member WHERE id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};

export const getMemberById = async (id) => {
    const sql = 'SELECT * FROM member WHERE id = ?';
    const member = await dbUtil.queryOne(sql, [id]);
    return member;
};