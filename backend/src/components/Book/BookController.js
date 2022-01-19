/* eslint-disable no-unused-vars */
import * as dbAccess from './BookDAL';
import { ERRORS, FORMAT } from '../../constant';
import moment from 'moment';

export const getAllBook = async (req, res) => {
    const { query } = req;
    var books = await dbAccess.getAllBook(query.sortBy);
    for (let i = 0; i < books.length; i++) {
        books[i].publish_date = moment(books[i].publish_date).format(FORMAT.DATE);
        books[i].date_purchase = moment(books[i].date_purchase).format(FORMAT.DATE);
    }
    res.send(books);
};

export const getBookById = async (req, res) => {
    const { id } = req.params;
    const book = await dbAccess.getBookById(id);
    res.send(book);
};

export const createBook = async (req, res) => {
    const { author_id, rack_id, isbn, price, title, description, subject, publisher, publish_date, date_purchase, language, number_of_pages, status } = req.body;
    const book = await dbAccess.createBook({ author_id, rack_id, isbn, price, title, description, subject, publisher, publish_date, date_purchase, language, number_of_pages, status });
    res.status(201).json(book);
};

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { author_id, rack_id, isbn, price, title, subject, publisher, publish_date, date_purchase, language, number_of_pages, status, borrow_date, due_date } = req.body;
    const book = await dbAccess.updateBook({ id, author_id, rack_id, isbn, price, title, subject, publisher, publish_date, date_purchase, language, number_of_pages, status, borrow_date, due_date });
    res.status(200).json(book);
};

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    const book = await dbAccess.deleteBook(id);
    res.status(202).json({ success: 1 });
};

export const searchBook = async (req, res) => {
    const { author_id, title, subject } = req.body;
    const books = await dbAccess.searchBook({ author_id, title, subject });
    res.status(201).json(books);
};