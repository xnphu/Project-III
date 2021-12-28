import { API, API_V1, withToken } from '.';
import qs from 'qs';

export default {
  getReport: (token, {id}) =>
    withToken(token, API_V1.get, `alerts/${id}/mentions/`),
  getAlert: token => withToken(token, API_V1.get, 'alerts'),
  getAlertDetail: (token, { id }) => withToken(token, API_V1.get, `/alerts/${id}/?format=json`),
  postAlert: (
    token,
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
      sentimentality_filter
    }
  ) => withToken(
    token,
    API_V1.post,
    'alerts/?format=json',
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
      sentimentality_filter
    }
  ),
  postAlertScheduler: (
    token,
    {
      alert,
      notification_type,
      notification_weekday,
      notification_duration,
      notification_channel,
    }
  ) => withToken(
    token,
    API_V1.post,
    'schedulers/?format=json',
    {
      alert,
      notification_type,
      notification_weekday,
      notification_duration,
      notification_channel,
    }
  ),
  getAlertsMentionsStatistics: (token, {id,duration,num_of_point}) =>
    withToken(token, API_V1.get, `alerts/${id}/mentions/statistics?duration=${duration}&num_of_point=${num_of_point}&format=json`),
  editAlert: (
    token,
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
      sentimentality_filter
    }
  ) => withToken(
    token,
    API_V1.patch,
    `/alerts/${id}/?format=json`,
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
      sentimentality_filter
    }
  ),
  editAlertScheduler: (
    token,
    {
      id,
      alert,
      notification_type,
      notification_weekday,
      notification_duration,
      notification_channel,
    }
  ) => withToken(
    token,
    API_V1.patch,
    `/schedulers/${id}/?format=json`,
    {
      alert,
      notification_type,
      notification_weekday,
      notification_duration,
      notification_channel,
    }
  ),
  deleteAlert: (token, { id }) => withToken(token, API_V1.delete, `/alerts/${id}/?format=json`)
};
