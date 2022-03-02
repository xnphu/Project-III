import {
    ACTION_SAVE_FEEDBACK,
    ACTION_EDIT_FEEDBACK,
} from '../constants';

export const saveFeedback = feedback => ({
    type: ACTION_SAVE_FEEDBACK,
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