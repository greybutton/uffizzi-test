import { apiV1TaskPath, apiV1TasksPath, apiV1TaskImagePath } from 'routes/ApiRoutes';
import FetchHelper from 'utils/fetchHelper';

export default {
  index(params) {
    const path = apiV1TasksPath();
    return FetchHelper.get(path, params);
  },

  show(id) {
    const path = apiV1TaskPath(id);
    return FetchHelper.get(path);
  },

  update(id, task = {}) {
    const path = apiV1TaskPath(id);
    return FetchHelper.put(path, { task });
  },

  create(task = {}) {
    const path = apiV1TasksPath();
    return FetchHelper.post(path, { task });
  },

  destroy(id) {
    const path = apiV1TaskPath(id);
    return FetchHelper.delete(path);
  },

  uploadImage(taskId, attachment) {
    const path = apiV1TaskImagePath(taskId);
    return FetchHelper.putFormData(path, attachment);
  },

  deleteImage(taskId) {
    const path = apiV1TaskImagePath(taskId);
    return FetchHelper.delete(path);
  },
};
