import {
    ACTION_SAVE_BOOK_LEND
} from '../constants';

export const saveBookLend = bookLend => ({
    type: ACTION_SAVE_BOOK_LEND,
    payload: {
        ...bookLend
    }
});