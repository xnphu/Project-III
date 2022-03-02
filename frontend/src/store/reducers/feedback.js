import {
    ACTION_SAVE_FEEDBACK,
    ACTION_ADD_FEEDBACK,
    ACTION_EDIT_FEEDBACK,
    ACTION_DELETE_FEEDBACK,
    ACTION_LOGOUT
} from '../constants';
import update from 'react-addons-update';

const defaultState = {
    feedbacks: [],
    member: [],
    total: 0
}

export default (state = defaultState, action) => {
    const { type, payload } = action;

    if (type === ACTION_SAVE_FEEDBACK) {
        return {
            ...payload
        };
    }

    if (type === ACTION_ADD_FEEDBACK) {
        var newMember = state.member;
        newMember.push(payload);
        return {
            ...state,
            member: newMember,
        };
    }

    if (type === ACTION_DELETE_FEEDBACK) {
        var feedbackFilter = state.feedbacks.filter((e) => e.id != payload.id);
        console.log('lala ', payload);
        console.log('lala2 ', feedbackFilter);
        return {
            ...state,
            feedbacks: feedbackFilter,
            total: state.total
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