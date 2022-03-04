import {
    ACTION_SAVE_BOOK_LEND,
    ACTION_EDIT_BOOK_LEND,
    ACTION_DELETE_BOOK_LEND,
    ACTION_LOGOUT
} from '../constants';

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