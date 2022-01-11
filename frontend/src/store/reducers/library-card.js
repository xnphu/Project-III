import {
    ACTION_SAVE_LIBRARY_CARD,
    ACTION_LOGOUT
} from '../constants';

const defaultState = {

}

export default (state = defaultState, action) => {
    const { type, payload, args } = action;

    if (type === ACTION_SAVE_LIBRARY_CARD) {
        return {
            ...payload
        };
    }

    if (type === ACTION_LOGOUT) {
        return defaultState;
    }

    return state;
};