
import * as jwtUtil from '../../util/jwtUtil';
import * as bcryptUtil from '../../util/bcryptUtil';

import { TOKEN as TOKEN_CONSTANTS } from '../../constant';

export const generateToken = (id, username, password, role) => jwtUtil.generateToken({ id, username, password, role }, { expiresIn: TOKEN_CONSTANTS.TOKEN_EXPIRED });

export const checkPassword = async (password, passwordHash) => bcryptUtil.compare(password, passwordHash);

export const getUserInfoFromToken = async (token) => {
  const { id } = await jwtUtil.verifyToken(token);
  return { id };
};
