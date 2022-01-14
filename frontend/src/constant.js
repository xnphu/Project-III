export const BASE_API_URL = 'http://localhost:8080';

export const BOOK_STATUS = {
    AVAILABLE: 1,
    RESERVED: 2,
    LOANED: 3,
    LOST: 4,
}

export const BOOK_STATUS_LABEL = {
    AVAILABLE: 'Available',
    RESERVED: 'Reserved',
    LOANED: 'Loaned',
    LOST: 'Lost',
}

export const FORMAT = {
    DATE: 'YYYY-MM-DD',
    DATETIME: 'YYYY-MM-DD HH:mm'
};

export const RESERVATION_STATUS = {
    WAITING: 1,
    PENDING: 2,
    COMPLETED: 3,
    CANCELED: 4,
};

export const RESERVATION_STATUS_LABEL = {
    WAITING: 'Waiting',
    PENDING: 'Pending',
    COMPLETED: 'Completed',
    CANCELED: 'Canceled',
};

export const LIMIT = {
    RESERVATION: 5,
    LENDING: 5,
};