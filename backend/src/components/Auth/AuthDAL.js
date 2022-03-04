import * as dbUtil from '../../util/databaseUtil';
import * as generateIdUtil from '../../util/generateIdUtil';
import uuidv4 from 'uuid/v4';
import { ERRORS, REDIS, TOKEN, TYPE_ID } from '../../constant';
import redisUtil from '../../util/redisUtil';
import * as common from './common';

export const getUserByUsername = async (username) => {
  const sql = 'SELECT id,username,password,role FROM member WHERE username = ? LIMIT 1';
  return dbUtil.queryOne(sql, [username]);
};

export const signUp = async ({ username, passwordHash, role }) => {
  const check = await checkUserExist(username);
  if (check) {
    return Promise.reject(ERRORS.USER_EXIST);
  }
  const sql = 'INSERT INTO member(id, username, password, role) VALUES (?, ?, ?, ?)';
  const id = await generateIdUtil.generate(TYPE_ID.MEMBER);
  await dbUtil.query(sql, [id, username, passwordHash, role]);
};

export const updateRole = async ({ id, username, role }) => {
  const check = await checkUserExist(username);
  if (check) {
    const memberData = { id, username, role }
    const sql = 'UPDATE member SET ? WHERE id = ?';
    await dbUtil.query(sql, [memberData, id]);
    const member = await getUserById(id);
    return member;
  } else {
    return Promise.reject(ERRORS.USER_NOT_EXIST);
  }
};

export const checkUserExist = async (username) => {
  const sql = 'SELECT username FROM member WHERE username = ?';
  const result = await dbUtil.query(sql, [username]);
  if (result.length > 0) {
    return true;
  }
  return false;
};

export const getUserById = async (userId) => {
  const sql = 'SELECT * FROM member WHERE id = ?';
  const user = await dbUtil.queryOne(sql, [userId]);
  return user;
};


// export const getRefreshToken = async (token) => {
//   const refreshToken = uuidv4();
//   redisUtil.setAsync(`${REDIS.REFRESH_TOKEN_PREFIX}:${refreshToken}`, token, 'ex', TOKEN.REFRESH_TOKEN_EXPIRED).catch(() => { });
//   return refreshToken;
// };

// export const refreshToken = async (oldRefreshToken) => {
//   const oldToken = await redisUtil.getAsync(`${REDIS.REFRESH_TOKEN_PREFIX}:${oldRefreshToken}`);
//   const { id } = await common.getUserInfoFromToken(oldToken);
//   const newToken = await common.generateToken(id);
//   const newRefreshToken = uuidv4();
//   await Promise.all([
//     redisUtil.delAsync(`${REDIS.REFRESH_TOKEN_PREFIX}:${oldRefreshToken}`),
//     redisUtil.setAsync(`${REDIS.REFRESH_TOKEN_PREFIX}:${newRefreshToken}`, newToken, 'ex', TOKEN.REFRESH_TOKEN_EXPIRED),
//   ]);
//   return { token: newToken, refreshToken: newRefreshToken };
// };
