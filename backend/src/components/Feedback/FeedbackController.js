/* eslint-disable no-unused-vars */
import * as dbAccess from './FeedbackDAL';

export const getAllFeedbacks = async (req, res) => {
    const feedback = await dbAccess.getAllFeedbacks();
    res.send(feedback);
};

export const getFeedbackById = async (req, res) => {
    const { id } = req.params;
    const feedback = await dbAccess.getFeedbackById(id);
    res.send(feedback);
};

export const getFeedbackByMemberId = async (req, res) => {
    const { id } = req.params;
    const feedback = await dbAccess.getFeedbackByMemberId(id);
    res.send(feedback);
};

export const createFeedback = async (req, res) => {
    const member_id = req.userId;
    const { content, answer } = req.body;
    const feedback = await dbAccess.createFeedback({ member_id, content, answer });
    res.status(201).json(feedback);
};

export const updateFeedback = async (req, res) => {
    const { id } = req.params;
    const member_id = req.userId;
    const { content, answer } = req.body;
    const feedback = await dbAccess.updateFeedback({ id, member_id, content, answer });
    res.status(200).json(feedback);
};

export const deleteFeedback = async (req, res) => {
    const { id } = req.params;
    const feedback = await dbAccess.deleteFeedback(id);
    res.status(202).json({ success: 1 });
};