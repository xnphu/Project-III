import {
  ACTION_GET_ALERTS,
  ACTION_GET_ALERTS_DETAIL,
  ACTION_POST_ALERTS,
  ACTION_EDIT_ALERTS,
  ACTION_DELETE_ALERTS,
  ACTION_POST_ALERT_SCHEDULERS,
  ACTION_EDIT_ALERT_SCHEDULERS,
  REQUEST_ALERT_REPORT,
  ACTION_UPDATE_ALERT_REPORT,
  REQUEST_ALERT_STATISTICS
} from '../constants';

export const getAlertReport = ({ id }, callback) => ({
  type: REQUEST_ALERT_REPORT,
  args: [{
    id
  }, callback]
});
export const getAlertStatistics = ({ id, duration,num_of_point }, callback) => ({
  type: REQUEST_ALERT_STATISTICS,
  args: [{
    id,
    duration,
    num_of_point
  }, callback]
});
export const updateAlertReport = report => ({
  type: ACTION_UPDATE_ALERT_REPORT,
  payload: {
    report,
  },
});

export const postAlert = ({
  name,
  case_insensitive,
  parent_folder,
  keyword_contain,
  keyword_and,
  keyword_not,
  source_filter,
  topic_filter,
  range_filter,
  sentimentality_filter,
}, callback) => ({
  type: ACTION_POST_ALERTS,
  args: [
    {
      name,
      case_insensitive,
      parent_folder,
      keyword_contain,
      keyword_and,
      keyword_not,
      source_filter,
      topic_filter,
      range_filter,
      sentimentality_filter,
    },
    callback
  ]
});

export const postAlertScheduler = ({
  alert,
  notification_type,
  notification_weekday,
  notification_duration,
  notification_channel,
}, callback) => ({
  type: ACTION_POST_ALERT_SCHEDULERS,
  args: [
    {
      alert,
      notification_type,
      notification_weekday,
      notification_duration,
      notification_channel,
    },
    callback
  ]
});

export const getAlert = callback => ({
  type: ACTION_GET_ALERTS,
  args: [callback]
});

export const getAlertDetail = ({ id }, callback) => ({
  type: ACTION_GET_ALERTS_DETAIL,
  args: [
    { id },
    callback
  ]
});

export const editAlert = ({
  id,
  name,
  case_insensitive,
  parent_folder,
  keyword_contain,
  keyword_and,
  keyword_not,
  source_filter,
  topic_filter,
  range_filter,
  sentimentality_filter,
}, callback) => ({
  type: ACTION_EDIT_ALERTS,
  args: [
    {
      id,
      name,
      case_insensitive,
      parent_folder,
      keyword_contain,
      keyword_and,
      keyword_not,
      source_filter,
      topic_filter,
      range_filter,
      sentimentality_filter,
    },
    callback
  ]
});

export const editAlertScheduler = ({
  id,
  alert,
  notification_type,
  notification_weekday,
  notification_duration,
  notification_channel,
}, callback) => ({
  type: ACTION_EDIT_ALERT_SCHEDULERS,
  args: [
    {
      id,
      alert,
      notification_type,
      notification_weekday,
      notification_duration,
      notification_channel,
    },
    callback
  ]
});

export const deleteAlert = ({ id }, callback) => ({
  type: ACTION_DELETE_ALERTS,
  args: [
    { id },
    callback
  ]
});
