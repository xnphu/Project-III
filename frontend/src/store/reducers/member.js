import {
    ACTION_SAVE_MEMBER,
    ACTION_EDIT_MEMBER,
    ACTION_DELETE_MEMBER,
    ACTION_LOGOUT
} from '../constants';

const defaultState = {
    members: []
}

export default (state = defaultState, action) => {
    const { type, payload } = action;

    if (type === ACTION_SAVE_MEMBER) {
        return {
            ...state,
            ...payload
        };
    }

    if (type === ACTION_EDIT_MEMBER) {
        console.log('lala ', payload);
        return {
            ...state,
            members: state.members.map(e=> e.id === payload.id ? { ...payload} : e)
        };
    }

    if (type === ACTION_DELETE_MEMBER) {
        var memberFilter = state.members.filter((e) => e.id != payload.id);
        return {
            ...state,
            members: memberFilter,
        };
    }

    if (type === ACTION_LOGOUT) {
        return defaultState;
    }

    return state;
};