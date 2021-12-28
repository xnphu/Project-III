import {
  REQUEST_MENTION_DETAILS,
  ACTION_UPDATE_MENTION_DETAILS
} from '../constants';

export const getMentionDetails = ({id},callback) => ({
  type: REQUEST_MENTION_DETAILS,
  args: [{
    id
  },
  callback
]
});
export const updateMentionDetails = (mentionDetails) => ({
  type: ACTION_UPDATE_MENTION_DETAILS,
  payload: {
    mentionDetails
  },
});
