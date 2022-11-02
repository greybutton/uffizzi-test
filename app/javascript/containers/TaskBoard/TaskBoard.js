import React, { useEffect, useState } from 'react';
import KanbanBoard from '@asseinfo/react-kanban';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Task from 'components/Task';
import AddPopup from 'components/AddPopup';
import EditPopup from 'components/EditPopup';
import ColumnHeader from 'components/ColumnHeader';
import TaskForm from 'forms/TaskForm';

import useTasks from 'hooks/store/useTasks';
import useStyles from './useStyles';

const MODES = {
  ADD: 'add',
  EDIT: 'edit',
  NONE: 'none',
};

const TaskBoard = () => {
  const styles = useStyles();

  const {
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
  } = useTasks();

  const [mode, setMode] = useState(MODES.NONE);
  const [openedTaskId, setOpenedTaskId] = useState(null);

  useEffect(() => {
    loadBoard();
  }, []);

  const handleOpenAddPopup = () => {
    setMode(MODES.ADD);
  };

  const handleOpenEditPopup = (task) => {
    setOpenedTaskId(task.id);
    setMode(MODES.EDIT);
  };

  const handleClose = () => {
    setMode(MODES.NONE);
    setOpenedTaskId(null);
  };

  const handleLoadColumnMore = (taskStatus, page = 1) => loadColumnMore(taskStatus, page);

  const handleCardDragEnd = (task, source, destination) => updateTaskState(task, source, destination);

  const handleTaskLoad = (taskId) => loadTask(taskId);

  const handleTaskUpdate = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);
    return updateTask(task, attributes).then(() => handleClose());
  };

  const handleTaskCreate = (params) => {
    const attributes = TaskForm.attributesToSubmit(params);
    return createTask(attributes).then(() => handleClose());
  };

  const handleTaskDestroy = (task) => destroyTask(task).then(() => handleClose());

  return (
    <>
      <Fab onClick={handleOpenAddPopup} className={styles.addButton} color="primary" aria-label="add">
        <AddIcon />
      </Fab>

      <KanbanBoard
        disableColumnDrag
        onCardDragEnd={handleCardDragEnd}
        renderCard={(card) => <Task onClick={handleOpenEditPopup} task={card} />}
        renderColumnHeader={(column) => <ColumnHeader column={column} onLoadMore={handleLoadColumnMore} />}
      >
        {board}
      </KanbanBoard>

      {mode === MODES.ADD && <AddPopup onCreateCard={handleTaskCreate} onClose={handleClose} />}
      {mode === MODES.EDIT && (
        <EditPopup
          onLoadCard={handleTaskLoad}
          onCardDestroy={handleTaskDestroy}
          onCardUpdate={handleTaskUpdate}
          onClose={handleClose}
          cardId={openedTaskId}
          onCardImageAttach={attachTaskImage}
          onCardImageRemove={removeTaskImage}
        />
      )}
    </>
  );
};

export default TaskBoard;
