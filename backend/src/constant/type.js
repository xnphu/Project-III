export const TYPE_ID = {
    MEMBER: 1,
    BOOK: 2,
    AUTHOR: 3,
    RACK: 4,
    LIBRARY_CARD: 5,
    BOOK_RESERVE: 6,
    BOOK_LEND: 7,
    FEEDBACK: 8,
};

export const ROLE = {
    ADMIN: 0,
    LIBRARIAN: 1,
    MEMBER: 2,
};

export const LIBRARY_CARD = {
    INACTIVE: 0,
    ACTIVE: 1,
};

export const FORMAT = {
    DATE: 'YYYY-MM-DD',
    DATETIME: 'YYYY-MM-DD HH:mm'
};

export const BOOK_STATUS = {
    AVAILABLE: 1,
    RESERVED: 2,
    LOANED: 3,
    LOST: 4,
};

export const RESERVATION_STATUS = {
    WAITING: 1,
    PENDING: 2,
    COMPLETED: 3,
    CANCELED: 4,
    VERIFIED: 5,
};

export const LIMIT = {
    RESERVATION: 5,
    LENDING: 5,
};