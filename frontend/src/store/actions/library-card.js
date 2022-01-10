import {
    ACTION_SAVE_LIBRARY_CARD
} from '../constants';

export const saveLibraryCard = libraryCard => ({
    type: ACTION_SAVE_LIBRARY_CARD,
    payload: {
        ...libraryCard
    }
});