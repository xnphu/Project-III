import { ACTION_SAVE_FOLDERS, ACTION_DELETE_FOLDERS, ACTION_SET_FOLDER_PICKER, ACTION_LOGOUT} from '../constants';

const defaultState = {
  folder: {},
  folderItemPicker: [],
};

export default (state = defaultState, action) => {
  const { type, payload, args } = action;

  if (type === ACTION_SAVE_FOLDERS) {
    const folderItemPicker = [];
    const result = payload.results[0];
    // folderItemPicker.push({ label: 'Chưa phân loại', value: result.pk, })
    if (result != '') {
      for (var i = 0; i < result.child_folders.length; i++) {
        var array = result.child_folders[i];
        var item = { label: array.name, value: `${array.pk}` };
        folderItemPicker.push(item);
      }
    }
    return {
      ...state,
      folder: { ...payload.results },
      folderItemPicker
    };
  }
  if (type === ACTION_SET_FOLDER_PICKER) {
    const folderItemPicker = [];
    // folderItemPicker.push({ label: 'Chưa phân loại', value: payload.pk, })
    if (payload != '') {
      for (var i = 0; i < payload.child_folders.length; i++) {
        var array = payload.child_folders[i];
        var item = { label: array.name, value: `${array.pk}` };
        folderItemPicker.push(item);
      }
    }
    // console.log("folderItemPicker", folderItemPicker);
    return {
      ...state,
      folderItemPicker
    };
  }
  if (type === ACTION_DELETE_FOLDERS) {
    // console.log('args', args[0].id);
    const folderItemPicker = state.folderItemPicker.slice();
    const filterFolder = folderItemPicker.filter(item => item.value != args[0].id);
    return {
      ...state,
      folderItemPicker: filterFolder,
    };
  }
  if (type === ACTION_LOGOUT) {
    return defaultState;
  }
  return state;
};