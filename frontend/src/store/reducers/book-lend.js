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
    const { type, payload } = action;

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
        return {
            ...state,
            bookLends: state.bookLends.map(e=> e.id === payload.id ? { ...payload} : e)
        };
    }

    if (type === ACTION_DELETE_BOOK_LEND) {
        var bookLendFilter = state.bookLends.filter((e) => e.id != payload.id);
        return {
            ...state,
            bookLends: bookLendFilter,
        };
    }

    if (type === ACTION_LOGOUT) {
        return defaultState;
    }

    return state;
};