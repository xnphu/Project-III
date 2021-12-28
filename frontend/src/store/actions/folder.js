import {
  ACTION_GET_FOLDERS,
  ACTION_GET_DETAIL_FOLDERS,
  ACTION_SAVE_FOLDERS,
  ACTION_POST_FOLDERS,
  ACTION_EDIT_FOLDERS,
  ACTION_DELETE_FOLDERS,
  ACTION_SET_FOLDER_PICKER,
} from '../constants';

export const getFolder = callback => ({
  type: ACTION_GET_FOLDERS,
  args: [callback]
});

export const saveFolder = folder => ({
  type: ACTION_SAVE_FOLDERS,
  payload: {
    ...folder
  }
});

export const getDetailFolder = id => ({
  type: ACTION_GET_DETAIL_FOLDERS,
  args: [{ id }]
});

export const postFolder = ({ name, parent_folder }, callback) => ({
  type: ACTION_POST_FOLDERS,
  args: [
    {
      name, parent_folder,
    },
    callback
  ]
});

export const editFolder = ({ id, name, parent_folder }, callback) => ({
  type: ACTION_EDIT_FOLDERS,
  args: [
    {
      id, name, parent_folder,
    },
    callback
  ]
});

export const deleteFolder = ({ id }, callback) => ({
  type: ACTION_DELETE_FOLDERS,
  args: [
    { id },
    callback
  ]
});

export const setFolderPicker = (folder_picker) => ({
  type: ACTION_SET_FOLDER_PICKER,
  payload: folder_picker,
});