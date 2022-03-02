import {
    ACTION_SAVE_FEEDBACK,
    ACTION_EDIT_FEEDBACK,
    ACTION_LOGOUT
} from '../constants';
import update from 'react-addons-update';

const defaultState = {
    feedbacks: [],
    total: 0
}

export default (state = defaultState, action) => {
    const { type, payload } = action;

    if (type === ACTION_SAVE_FEEDBACK) {
        return {
            ...payload
        };
    }

    if (type === ACTION_EDIT_FEEDBACK) {
        update(state, {
            feedbacks: {
                [payload.index]: {
                    answer: { $set: payload.answer }
                }
            }
        });
    }

    if (type === ACTION_LOGOUT) {
        return defaultState;
    }

    return state;
};