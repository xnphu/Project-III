/* eslint-disable no-unused-vars */
import * as dbAccess from './BookLendDAL';

export const getAllBookLend = async (req, res) => {
    const bookLend = await dbAccess.getAllBookLend();
    res.send(bookLend);
};

export const getBookLendById = async (req, res) => {
    const { id } = req.params;
    const bookLend = await dbAccess.getBookLendById(id);
    res.send(bookLend);
};

export const getBookLendByUserId = async (req, res) => {
    const id = req.userId;
    const bookLend = await dbAccess.getBookLendByUserId(id);
    res.send(bookLend);
};

export const getBookLendByBookId = async (req, res) => {
    const { book_id } = req.params;
    const list = await dbAccess.getBookLendByBookId(book_id);
    res.send(list);
};

export const createBookLend = async (req, res) => {
    const member_id = req.userId;
    const { book_id } = req.body;
    const bookLend = await dbAccess.createBookLend({ member_id, book_id });
    res.status(201).json(bookLend);
};

export const updateBookLend = async (req, res) => {
    const { id } = req.params;
    const { book_id,  member_id, create_date, due_date, return_date, fine_amount, status } = req.body;
    const bookLend = await dbAccess.updateBookLend({ id, book_id,  member_id, create_date, due_date, return_date, fine_amount, status });
    res.status(200).json(bookLend);
};

export const deleteBookLend = async (req, res) => {
    const { id } = req.params;
    const bookLend = await dbAccess.deleteBookLend(id);
    res.status(202).json({ success: 1 });
};