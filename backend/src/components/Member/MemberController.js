/* eslint-disable no-unused-vars */
import * as dbAccess from './MemberDAL';
import { ERRORS, FORMAT } from '../../constant';
import moment from 'moment';

export const getAllMember = async (req, res) => {
    var members = await dbAccess.getAllMember();
    for (let i = 0; i < members.length; i++) {
        members[i].date_of_birth = moment(members[i].date_of_birth).format(FORMAT.DATE);
    }
    res.send(members);
};

export const getMemberById = async (req, res) => {
    const { userId } = req;
    const member = await dbAccess.getMemberById(userId);
    res.send(member);
};

export const createMember = async (req, res) => {
    const id = req.userId;
    if (!id) {
        return Promise.reject(ERRORS.UNAUTHORIZED_ERROR);
    }
    const { student_id, name, email, phone, sex, date_of_birth, street, city, country, status } = req.body;
    const member = await dbAccess.createMember({ id, student_id, name, email, phone, sex, date_of_birth, street, city, country, status });
    res.status(201).json(member);
};

export const updateMember = async (req, res) => {
    const { id } = req.params;
    const { password, name, email, phone, sex, date_of_birth, street, city, zip_code, country, status } = req.body;
    const member = await dbAccess.updateMember({ id, password, name, email, phone, sex, date_of_birth, street, city, zip_code, country, status });
    res.status(200).json(member);
};

export const deleteMember = async (req, res) => {
    const { id } = req.params;
    const member = await dbAccess.deleteMember(id);
    res.status(202).json({ success: 1 });
};