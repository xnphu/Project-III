import {
  REQUEST_NOTIFICATION,
  ACTION_UPDATE_NOTIFICATION,
  ACTION_READ_NOTIFICATION,
  READ_ALL_NOTIFICATION,
  LOAD_MORE_NOTIFICATION,
  ACTION_UPDATE_MORE_NOTIFICATION,
} from '../constants';

export const getNotification = () => ({
  type: REQUEST_NOTIFICATION,
});
export const readAll = () => ({
  type: READ_ALL_NOTIFICATION,
});
export const loadMore = page => ({
  type: LOAD_MORE_NOTIFICATION,
  args: [page],
});
export const updateNotification = data => ({
  type: ACTION_UPDATE_NOTIFICATION,
  payload: {
    data,
  },
});
export const updateMoreNotification = data => ({
  type: ACTION_UPDATE_MORE_NOTIFICATION,
  payload: {
    data,
  },
});
export const readNoti = pk => ({
  type: ACTION_READ_NOTIFICATION,
  args: [pk],
});
