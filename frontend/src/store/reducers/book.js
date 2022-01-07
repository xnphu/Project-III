import {
    ACTION_SAVE_BOOK
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

    return state;
};