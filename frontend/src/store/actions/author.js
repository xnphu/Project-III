import {
    ACTION_SAVE_AUTHOR
} from '../constants';

export const saveAuthor = author => ({
    type: ACTION_SAVE_AUTHOR,
    payload: {
        ...author
    }
});