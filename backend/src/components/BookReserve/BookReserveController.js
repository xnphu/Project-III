/* eslint-disable no-unused-vars */
import * as dbAccess from './BookReserveDAL';

export const getAllBookReserve = async (req, res) => {
    const list = await dbAccess.getAllBookReserve();
    res.send(list);
};

export const getBookReserveById = async (req, res) => {
    const { id } = req.params;
    const info = await dbAccess.getBookReserveById(id);
    res.send(info);
};

export const getBookReserveByUserId = async (req, res) => {
    const id = req.userId;
    const list = await dbAccess.getBookReserveByUserId(id);
    res.send(list);
};

export const requestBookReserve = async (req, res) => {
    const member_id = req.userId;
    const { book_id } = req.body;
    const info = await dbAccess.requestBookReserve({ member_id, book_id });
    res.status(201).json(info);
};

export const updateBookReserve = async (req, res) => {
    const { id } = req.params;
    const { book_id, member_id, create_date, status } = req.body;
    const info = await dbAccess.updateBookReserve({ id, book_id, member_id, create_date, status });
    res.status(200).json(info);
};

export const deleteBookReserve = async (req, res) => {
    const { id } = req.params;
    const info = await dbAccess.deleteBookReserve(id);
    res.status(202).json({ success: 1 });
};