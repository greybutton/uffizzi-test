import { useSelector } from 'react-redux';
import { useTasksActions } from 'slices/TasksSlice';

const useTasks = () => {
  const board = useSelector((state) => state.TasksSlice.board);
  const {
    loadBoard,
    updateTaskState,
    loadColumnMore,
    loadTask,
    updateTask,
    createTask,
    destroyTask,
    attachTaskImage,
    removeTaskImage,
  } = useTasksActions();

  return {
    board,
    loadBoard,
    loadColumnMore,
    updateTaskState,
    loadTask,
    updateTask,
    createTask,
    destroyTask,
    attachTaskImage,
    removeTaskImage,
  };
};

export default useTasks;
