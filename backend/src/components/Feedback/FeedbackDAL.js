import * as dbUtil from '../../util/databaseUtil';
import * as generateIdUtil from '../../util/generateIdUtil';
import { ERRORS, TYPE_ID } from '../../constant';

export const getAllFeedbacks = async () => {
    const sql = 'SELECT * FROM feedback';
    return dbUtil.query(sql, []);
};

export const createFeedback = async ({ member_id, content, answer }) => {
    const id = await generateIdUtil.generate(TYPE_ID.FEEDBACK);
    const sql = 'INSERT INTO feedback(id, member_id, content, answer) VALUES (?, ?, ?, ?)';
    await dbUtil.query(sql, [id, member_id, content, answer]);
    const feedback = await getFeedbackById(id);
    return feedback;
};

export const updateFeedback = async ({ id, member_id, content, answer }) => {
    const check = await checkFeedbackExist(id);
    if (check) {
        const feedbackData = { id, member_id, content, answer };
        const sql = 'UPDATE feedback SET ? WHERE id = ?';
        await dbUtil.query(sql, [feedbackData, id]);
        const feedback = await getFeedbackById(id);
        return feedback;
    } else {
        return Promise.reject(ERRORS.FEEDBACK_NOT_EXIST);
    }
};

export const deleteFeedback = async (id) => {
    const sql = 'DELETE FROM feedback WHERE id = ? LIMIT 1';
    const { affectedRows } = await dbUtil.query(sql, [id]);
    if (affectedRows === 0) {
        return Promise.reject(ERRORS.FEEDBACK_NOT_EXIST);
    }
};

export const checkFeedbackExist = async (id) => {
    const sql = 'SELECT * FROM feedback WHERE id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};

export const getFeedbackById = async (id) => {
    const sql = 'SELECT * FROM feedback WHERE id = ?';
    const feedback = await dbUtil.queryOne(sql, [id]);
    return feedback;
};

export const getFeedbackByMemberId = async (id) => {
    const sql = 'SELECT * FROM feedback WHERE member_id = ?';
    return dbUtil.query(sql, [id]);
};