import {
    ACTION_SAVE_MEMBER,
    ACTION_EDIT_MEMBER,
    ACTION_DELETE_MEMBER,
} from '../constants';

export const saveMember = bookLend => ({
    type: ACTION_SAVE_MEMBER,
    payload: {
        ...bookLend
    }
});

export const editMember = feedback => ({
    type: ACTION_EDIT_MEMBER,
    payload: {
        ...feedback
    }
});

export const deleteMember = id => ({
    type: ACTION_DELETE_MEMBER,
    payload: {
        ...id
    }
});