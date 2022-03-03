import {
    ACTION_SAVE_BOOK_LEND,
    ACTION_EDIT_BOOK_LEND,
    ACTION_DELETE_BOOK_LEND,
    ACTION_LOGOUT
} from '../constants';
import update from 'react-addons-update';

const defaultState = {
    bookLends: [],
    member: []
}

export default (state = defaultState, action) => {
    const { type, payload, args } = action;

    if (type === ACTION_SAVE_BOOK_LEND) {
        return {
            ...state,
            ...payload
        };
    }

    if (type === ACTION_EDIT_BOOK_LEND) {
        console.log('lala ', payload);
        update(state, {
            bookLends: {
                [payload.index]: {
                    due_date: { $set: payload.due_date },
                    return_date: { $set: payload.return_date },
                    fine_amount: { $set: payload.fine_amount },
                    status: { $set: payload.status }
                }
            }
        });
    }

    if (type === ACTION_DELETE_BOOK_LEND) {
        var feedbackFilter = state.feedbacks.filter((e) => e.id != payload.id);
        console.log('lala ', payload);
        console.log('lala2 ', feedbackFilter);
        return {
            ...state,
            feedbacks: feedbackFilter,
            total: state.total
        };
    }

    if (type === ACTION_LOGOUT) {
        return defaultState;
    }

    return state;
};