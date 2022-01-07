/* eslint-disable no-unused-vars */
import * as dbAccess from './AuthorDAL';

export const getAllAuthors = async (req, res) => {
    const authors = await dbAccess.getAllAuthors();
    res.send(authors);
};

export const getAuthorById = async (req, res) => {
    const { id } = req.params;
    const author = await dbAccess.getAuthorById(id);
    res.send(author);
};

export const createAuthor = async (req, res) => {
    const { name, description } = req.body;
    const author = await dbAccess.createAuthor({ name, description });
    res.status(201).json(author);
};

export const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const author = await dbAccess.updateAuthor({ id, name, description });
    res.status(200).json(author);
};

export const deleteAuthor = async (req, res) => {
    const { id } = req.params;
    const author = await dbAccess.deleteAuthor(id);
    res.status(202).json({ success: 1 });
};