/* eslint-disable no-unused-vars */
import * as dbAccess from './LibraryCardDAL';

export const getAllLibraryCard = async (req, res) => {
    const libraryCard = await dbAccess.getAllLibraryCard();
    res.send(libraryCard);
};

export const getLibraryCardById = async (req, res) => {
    const { id } = req.params;
    const libraryCard = await dbAccess.getLibraryCardById(id);
    res.send(libraryCard);
};

export const getLibraryCardByUserId = async (req, res) => {
    const id = req.userId;
    const libraryCard = await dbAccess.getLibraryCardByUserId(id);
    res.send(libraryCard);
};

export const createLibraryCard = async (req, res) => {
    const member_id = req.userId;
    const libraryCard = await dbAccess.createLibraryCard({ member_id });
    res.status(201).json(libraryCard);
};

export const updateLibraryCard = async (req, res) => {
    const { id } = req.params;
    const { member_id, issue_date, active_flg } = req.body;
    const libraryCard = await dbAccess.updateLibraryCard({ id, member_id, issue_date, active_flg });
    res.status(200).json(libraryCard);
};

export const deleteLibraryCard = async (req, res) => {
    const { id } = req.params;
    const libraryCard = await dbAccess.deleteLibraryCard(id);
    res.status(202).json({ success: 1 });
};