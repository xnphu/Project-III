import {
    ACTION_SAVE_BOOK
} from '../constants';

export const saveBook = book => ({
    type: ACTION_SAVE_BOOK,
    payload: {
        ...book
    }
});