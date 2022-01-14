import createError from 'http-errors';
import { LIMIT } from './type';

export const ERRORS = {
  BAD_STRUCTURE: createError.BadRequest('Bad Structure'),
  USER_NOTFOUND_ERROR: createError.BadRequest('Không tìm thấy người dùng!'),
  UNAUTHORIZED_ERROR: createError.Unauthorized('Không được cấp quyền!'),
  INVALID_PASSWORD_ERROR: createError.BadRequest('Mật khẩu sai!'),
  NOTHING_CHANGED: createError.BadGateway('Không có gì thay đổi'),
  USER_EXIST: createError.BadRequest('User is exist'),
  USER_NOT_EXIST: createError.BadRequest('User is not exist'),
  BOOK_EXIST: createError.BadRequest('Book is exist'),
  BOOK_NOT_EXIST: createError.BadRequest('Book is not exist'),
  BOOK_STATUS_NOT_AVAILABLE: createError.BadRequest('Book is not ready to reserved'),
  LIBRARYCARD_EXIST: createError.BadRequest('Library card is exist'),
  LIBRARYCARD_NOT_EXIST: createError.BadRequest('Library card is not exist'),
  LIBRARYCARD_NOT_EXIST_OR_ACTIVE: createError.BadRequest('Library card is not exist or not actived by Admin/Librarian'),
  AUTHOR_EXIST: createError.BadRequest('Author is exist'),
  AUTHOR_NOT_EXIST: createError.BadRequest('Author is not exist'),
  BOOK_RESERVE_REACH_LIMIT: createError.BadRequest(`Number of books you reserve reach limit (${LIMIT.RESERVATION} times)`),
  BOOK_RESERVE_BY_MEMBER_BEFORE: createError.BadRequest('You reserved this book before, please wait for Admin/ Librarian process your request'),
  BOOK_RESERVE_NOT_EXIST: createError.BadRequest('Book reserve information is not exist'),
};
