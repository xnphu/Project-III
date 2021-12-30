import * as dbUtil from '../../util/databaseUtil';
import { ERRORS, FORMAT } from '../../constant';
import moment from 'moment';

export const getAllMember = async () => {
    const sql = 'SELECT mi.*, m.username, m.role FROM member_info mi, member m where mi.id = m.id';
    return dbUtil.query(sql, []);
};

export const createMember = async ({ id, student_id, name , email , phone , sex , date_of_birth , street , city , country , status }) => {
    const check = await checkMemberExist(id);
    if (check) {
        return Promise.reject(ERRORS.USER_EXIST);
    }
    const sql = 'INSERT INTO member_info(id, student_id, name , email , phone , sex , date_of_birth , street , city , country , status ) VALUES (?, ?, ?,?, ?, ?,?, ?, ?,?, ?)';
    await dbUtil.query(sql, [id, student_id, name , email , phone , sex , date_of_birth , street , city , country , status ]);
    const member = await getMemberById(id);
    return member;
};

export const updateMember = async ({ id, student_id, name , email , phone , sex , date_of_birth , street , city , country , status }) => {
    const check = await checkMemberExist(id);
    if (check) {
        const memberData = { id, student_id, name , email , phone , sex , date_of_birth , street , city , country , status }
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
    const sql = 'SELECT * FROM member_info WHERE id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};

export const getMemberById = async (id) => {
    const sql = `SELECT * FROM 
                    (SELECT mi.*, m.username, m.role  
                        FROM library_management.member_info mi, library_management.member m 
                        where mi.id = m.id) a 
                    WHERE a.id = ?
                `;
    var member = await dbUtil.queryOne(sql, [id]);
    if (member) {
        member.date_of_birth = moment(member.date_of_birth).format(FORMAT.DATE);
    }
    return member;
};