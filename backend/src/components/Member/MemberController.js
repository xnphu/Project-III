/* eslint-disable no-unused-vars */
import * as dbAccess from './MemberDAL';

export const getAllMember = async (req, res) => {
  const members = await dbAccess.getAllMember();
  res.send(members);
};

export const getMemberById = async (req, res) => {
    const { id } = req.params;
    const member = await dbAccess.getMemberById(id);
    res.send(member);
};

export const createMember = async (req, res) => {
    const { id, password, name , email , phone , sex , date_of_birth , street , city , zip_code , country , status } = req.body;
    const member = await dbAccess.createMember({ id, password, name , email , phone , sex , date_of_birth , street , city , zip_code , country , status });
    res.status(201).json(member);
};

export const updateMember = async (req, res) => {
    const { id } = req.params;
    const { password, name , email , phone , sex , date_of_birth , street , city , zip_code , country , status } = req.body;
    const member = await dbAccess.updateMember({ id, password, name , email , phone , sex , date_of_birth , street , city , zip_code , country , status });
    res.status(200).json(member);
};

export const deleteMember = async (req, res) => {
    const { id } = req.params;
    const member = await dbAccess.deleteMember(id);
    res.status(202).json({ success: 1 });
};