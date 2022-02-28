import {
    ACTION_SAVE_BOOK_RESERVE
} from '../constants';

export const saveBookReserve = bookReserve => ({
    type: ACTION_SAVE_BOOK_RESERVE,
    payload: {
        ...bookReserve
    }
});