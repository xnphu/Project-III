import {
    ACTION_SAVE_BOOK,
    ACTION_LOGOUT
} from '../constants';

const defaultState = {
    books: [],
    total: 0
}

export default (state = defaultState, action) => {
    const { type, payload, args } = action;

    if (type === ACTION_SAVE_BOOK) {
        return {
            ...payload
        };
    }

    if (type === ACTION_LOGOUT) {
        return defaultState;
    }

    return state;
};