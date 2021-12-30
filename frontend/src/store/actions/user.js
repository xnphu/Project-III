import {
  REQUEST_ME,
  ACTION_SAVE_USER_ID,
  ACTION_SAVE_ME,
  ACTION_SAVE_ME1,
  ACTION_REMOVE_ME,
  REQUEST_UPDATE_PROFILE,
  ACTION_UPDTATE_ME,
  ACTION_UPDATE_AVATAR,
  ACTION_SUCCESS_UPDTATE_PW
} from '../constants';


// lay du lieu cua user
export const me = callback => ({
  type: REQUEST_ME,
  args: [callback]
});
// xep du lieu vao store profile
export const updateProfile = profile => ({
  type: ACTION_SAVE_ME,
  payload: {
    ...profile
  }
});
export const saveMe1 = profile => ({
  type: ACTION_SAVE_ME1,
  payload: {
    ...profile
  }
});

export const updateUserId = ({ id }) => ({
  type: ACTION_SAVE_USER_ID,
  payload: {
    id
  }
});

// export const updateProfile = ({ username, root_folder, first_name, last_name, profile , id}, callback) => ({
//   type: REQUEST_UPDATE_PROFILE,
//   args: [
//     {
//       username,
//       root_folder,
//       first_name,
//       last_name,
//       profile,
//       id
//     },
//     callback
//   ]
// });


export const updateMe = profile => ({
  type: ACTION_UPDTATE_ME,
  payload: {
    ...profile
  }
});

export const removeMe = ({ id }, callback) => ({
  type: ACTION_REMOVE_ME,
  args: [
    {
      id
    },
    callback
  ]
});

export const savePW = ({ password }, callback) => ({
  type: ACTION_SUCCESS_UPDTATE_PW,
  args: [
    {
      password
    },
    callback
  ]
});





