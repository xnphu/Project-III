import {
    ACTION_SAVE_BOOK_LEND,
    ACTION_EDIT_BOOK_LEND,
    ACTION_DELETE_BOOK_LEND,
} from '../constants';

export const saveBookLend = bookLend => ({
    type: ACTION_SAVE_BOOK_LEND,
    payload: {
        ...bookLend
    }
});

export const editBookLend = feedback => ({
    type: ACTION_EDIT_BOOK_LEND,
    payload: {
        ...feedback
    }
});

export const deleteBookLend = id => ({
    type: ACTION_DELETE_BOOK_LEND,
    payload: {
        ...id
    }
});