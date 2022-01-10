import {
    ACTION_SAVE_LIBRARY_CARD
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

    return state;
};