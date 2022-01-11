import createError from 'http-errors';

export const ERRORS = {
  BAD_STRUCTURE: createError.BadRequest('Bad Structure'),
  USER_NOTFOUND_ERROR: createError.BadRequest('Không tìm thấy người dùng!'),
  UNAUTHORIZED_ERROR: createError.Unauthorized('Không được cấp quyền!'),
  INVALID_PASSWORD_ERROR: createError.BadRequest('Mật khẩu sai!'),
  NOTHING_CHANGED: createError.BadGateway('Không có gì thay đổi'),
  USER_EXIST: createError.BadRequest('Tài khoản đã tồn tại'),
  USER_NOT_EXIST: createError.BadRequest('Tài khoản không tồn tại'),
  BOOK_EXIST: createError.BadRequest('Sách đã tồn tại'),
  BOOK_NOT_EXIST: createError.BadRequest('Sách không tồn tại'),
  BOOK_STATUS_NOT_AVAILABLE: createError.BadRequest('Trạng thái sách chưa sẵn sàng để đặt'),
  LIBRARYCARD_EXIST: createError.BadRequest('Thẻ thư viện đã tồn tại'),
  LIBRARYCARD_NOT_EXIST: createError.BadRequest('Thẻ thư viện không tồn tại'),
  LIBRARYCARD_NOT_EXIST_OR_ACTIVE: createError.BadRequest('Thẻ thư viện không tồn tại hoặc chưa kích hoạt'),
  AUTHOR_EXIST: createError.BadRequest('Tác giả đã tồn tại'),
  AUTHOR_NOT_EXIST: createError.BadRequest('Tác giả không tồn tại'),
  BOOK_RESERVE_REACH_LIMIT: createError.BadRequest('Đặt sách đạt giới hạn'),
  BOOK_RESERVE_NOT_EXIST: createError.BadRequest('Thông tin đặt sách không tồn tại'),
};
