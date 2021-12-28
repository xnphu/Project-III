import createError from 'http-errors';

export const ERRORS = {
  BAD_STRUCTURE: createError.BadRequest('Bad Structure'),
  USER_NOTFOUND_ERROR: createError.BadRequest('Không tìm thấy người dùng!'),
  UNAUTHORIZED_ERROR: createError.Unauthorized('Không được cấp quyền!'),
  INVALID_PASSWORD_ERROR: createError.BadRequest('Mật khẩu sai!'),
  NOTHING_CHANGED: createError.BadGateway('Không có gì thay đổi'),
  USER_EXIST: createError.BadRequest('Tài khoản đã tồn tại'),
  CUSTOMER_NOT_EXIST: createError.BadRequest('Khách hàng không tồn tại'),
  BOOK_EXIST: createError.BadRequest('Sách đã tồn tại'),
  BOOK_NOT_EXIST: createError.BadRequest('Sách không tồn tại'),
  SERVICE_EXIST: createError.BadRequest('Dịch vụ đã tồn tại'),
  SERVICE_NOT_EXIST: createError.BadRequest('Dịch vụ không tồn tại'),
  LIBRARYCARD_EXIST: createError.BadRequest('Thẻ thư viện đã tồn tại'),
  LIBRARYCARD_NOT_EXIST: createError.BadRequest('Thẻ thư viện không tồn tại'),
  BILL_EXIST: createError.BadRequest('Hóa đơn đã tồn tại'),
  BILL_NOT_EXIST: createError.BadRequest('Hóa đơn không tồn tại'),
};
