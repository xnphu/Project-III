import {
    ACTION_SAVE_AUTHOR,
    ACTION_LOGOUT
} from '../constants';

const defaultState = {
    authors: [],
    total: 0
}

export default (state = defaultState, action) => {
    const { type, payload, args } = action;

    if (type === ACTION_SAVE_AUTHOR) {
        return {
            ...payload
        };
    }

    if (type === ACTION_LOGOUT) {
        return defaultState;
    }

    return state;
};