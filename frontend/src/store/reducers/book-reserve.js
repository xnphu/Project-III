import {
    ACTION_SAVE_BOOK_RESERVE,
    ACTION_LOGOUT
} from '../constants';

const defaultState = {
    member: []
}

export default (state = defaultState, action) => {
    const { type, payload, args } = action;

    if (type === ACTION_SAVE_BOOK_RESERVE) {
        return {
            ...payload
        };
    }

    if (type === ACTION_LOGOUT) {
        return defaultState;
    }

    return state;
};