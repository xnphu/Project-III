import {
    ACTION_SAVE_FEEDBACK,
    ACTION_ADD_FEEDBACK,
    ACTION_EDIT_FEEDBACK,
    ACTION_DELETE_FEEDBACK
} from '../constants';

export const saveFeedback = feedback => ({
    type: ACTION_SAVE_FEEDBACK,
    payload: {
        ...feedback
    }
});

export const addFeedback = feedback => ({
    type: ACTION_ADD_FEEDBACK,
    payload: {
        ...feedback
    }
});

export const editFeedback = feedback => ({
    type: ACTION_EDIT_FEEDBACK,
    payload: {
        ...feedback
    }
});

export const deleteFeedback = id => ({
    type: ACTION_DELETE_FEEDBACK,
    payload: {
        ...id
    }
});