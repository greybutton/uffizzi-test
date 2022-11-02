import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { changeColumn } from '@asseinfo/react-kanban';
import { propEq } from 'ramda';

import TasksRepository from 'repositories/TasksRepository';
import TaskPresenter, { STATES } from 'presenters/TaskPresenter';

const initialState = {
  board: {
    columns: STATES.map((column) => ({
      id: column.key,
      title: column.value,
      cards: [],
      meta: {},
    })),
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadColumnSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;
      const column = state.board.columns.find(propEq('id', columnId));

      state.board = changeColumn(state.board, column, {
        cards: items,
        meta,
      });

      return state;
    },
    loadColumnMoreSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;
      const column = state.board.columns.find(propEq('id', columnId));
      const cards = column.cards.concat(items);

      state.board = changeColumn(state.board, column, {
        cards,
        meta,
      });

      return state;
    },
  },
});

const { loadColumnSuccess, loadColumnMoreSuccess } = tasksSlice.actions;

export const useTasksActions = () => {
  const dispatch = useDispatch();

  const getTasksByState = (taskState, page, perPage) =>
    TasksRepository.index({
      q: { stateEq: taskState },
      page,
      perPage,
    });

  const loadColumn = (taskState, page = 1, perPage = 5) =>
    getTasksByState(taskState, page, perPage).then(({ data }) => {
      dispatch(loadColumnSuccess({ ...data, columnId: taskState }));
    });

  const loadColumnMore = (taskState, page = 1, perPage = 5) =>
    getTasksByState(taskState, page, perPage).then(({ data }) => {
      dispatch(loadColumnMoreSuccess({ ...data, columnId: taskState }));
    });

  const updateTaskState = (task, source, destination) => {
    const transition = TaskPresenter.transitions(task).find(({ to }) => destination.toColumnId === to);
    if (!transition) {
      return null;
    }

    return TasksRepository.update(task.id, { stateEvent: transition.event }).then(() => {
      loadColumn(destination.toColumnId);
      loadColumn(source.fromColumnId);
    });
  };

  const updateTask = (task, params) =>
    TasksRepository.update(TaskPresenter.id(task), params).then(() => {
      loadColumn(TaskPresenter.state(task));
    });

  const attachTaskImage = (task, params) => TasksRepository.uploadImage(task.id, params);
  const removeTaskImage = (task) => TasksRepository.deleteImage(task.id);

  const createTask = (params) =>
    TasksRepository.create(params).then(({ data: { task } }) => {
      loadColumn(TaskPresenter.state(task));
    });

  const loadTask = (taskId) => TasksRepository.show(taskId).then(({ data: { task } }) => task);

  const destroyTask = (task) =>
    TasksRepository.destroy(task.id).then(() => {
      loadColumn(TaskPresenter.state(task));
    });

  const loadBoard = () => STATES.map(({ key }) => loadColumn(key));

  return {
    loadBoard,
    updateTaskState,
    loadColumnMore,
    loadTask,
    updateTask,
    createTask,
    destroyTask,
    attachTaskImage,
    removeTaskImage,
  };
};

export default tasksSlice.reducer;
