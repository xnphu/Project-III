import * as jwtUtil from '../util/jwtUtil';
import { logger } from '../util/logUtil';
import { ERRORS, ROLE } from '../constant';

export const authMiddleware = async (req, res, next) => {
  req.isLogged = false;
  const { authorization } = req.headers;
  if (authorization && authorization.match(/^Bearer /g)) {
    const token = authorization.split(' ')[1];
    if (token) {
      try {
        const tokenDecoded = await jwtUtil.verifyToken(token);
        req.isLogged = true;
        req.userId = tokenDecoded.id;
        req.role = tokenDecoded.role;
        req.token = token;
      } catch (error) {
        logger.error(error);
      }
    }
  }
  next();
};

export const requireLogin = async (req, res, next) => {
  if (req.isLogged) {
    next();
  } else {
    next(ERRORS.UNAUTHORIZED_ERROR);
  }
};

export const requireAdminRole = async (req, res, next) => {
  if (req.role == ROLE.ADMIN) {
    next();
  } else {
    next(ERRORS.UNAUTHORIZED_ERROR);
  }
};

export const checkNotUserRole = async (req, res, next) => {
  if (req.role == ROLE.ADMIN || req.role == ROLE.LIBRARIAN) {
    next();
  } else {
    next(ERRORS.UNAUTHORIZED_ERROR);
  }
};