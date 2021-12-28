import {
  ACTION_UPDATE_BOOKMARK
} from '../constants';

export const updateBookmark = mention => ({
  type: ACTION_UPDATE_BOOKMARK,
  payload: {
    mention,
  },
});