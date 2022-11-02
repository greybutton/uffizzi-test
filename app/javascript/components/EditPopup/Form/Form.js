import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { has } from 'ramda';
import TextField from '@material-ui/core/TextField';

import CircularProgress from '@material-ui/core/CircularProgress';

import TaskPresenter from 'presenters/TaskPresenter';
import UserSelect from 'components/UserSelect';
import TaskImageField from './TaskImageField';
import useStyles from './useStyles';

const Form = ({ errors, onChange, task, onCardImageAttach, onCardImageRemove }) => {
  const [isImageLoading, changeIsImageLoading] = useState(false);

  const handleChangeTextField = (fieldName) => (event) => onChange({ ...task, [fieldName]: event.target.value });
  const handleChangeSelect = (fieldName) => (user) => onChange({ ...task, [fieldName]: user });
  const handleImageChange = (imageUrl) => {
    onChange({ ...task, imageUrl });
    changeIsImageLoading(false);
  };

  const handleImageAttach = (params) => {
    changeIsImageLoading(true);

    return onCardImageAttach(task, params)
      .then(({ data }) => {
        const imageUrl = data.task.imageUrl ?? null;
        handleImageChange(imageUrl);
      })
      .catch((e) => {
        changeIsImageLoading(false);
        alert(`Unable to save image! Error: ${e}`);
      });
  };

  const handleImageRemove = () => {
    changeIsImageLoading(true);

    return onCardImageRemove(task)
      .then(() => handleImageChange(null))
      .catch((e) => {
        changeIsImageLoading(false);
        alert(`Unable to remove image! Error: ${e}`);
      });
  };

  const styles = useStyles();

  return (
    <form className={styles.root}>
      <UserSelect
        label="Author"
        value={TaskPresenter.author(task)}
        onChange={handleChangeSelect('author')}
        isDisabled
        isRequired
        error={has('author', errors)}
        helperText={errors.author}
      />
      <UserSelect
        label="Assignee"
        value={TaskPresenter.assignee(task)}
        onChange={handleChangeSelect('assignee')}
        isDisabled={false}
        isRequired
        error={has('assignee', errors)}
        helperText={errors.assignee}
      />
      <TextField
        error={has('name', errors)}
        helperText={errors.name}
        onChange={handleChangeTextField('name')}
        value={TaskPresenter.name(task)}
        label="Name"
        required
        margin="dense"
      />
      <TextField
        error={has('description', errors)}
        helperText={errors.description}
        onChange={handleChangeTextField('description')}
        value={TaskPresenter.description(task)}
        label="Description"
        required
        multiline
        margin="dense"
      />
      {isImageLoading ? (
        <CircularProgress />
      ) : (
        <TaskImageField task={task} onImageSave={handleImageAttach} onImageRemove={handleImageRemove} />
      )}
    </form>
  );
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  task: TaskPresenter.shape().isRequired,
  errors: PropTypes.shape({
    name: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.arrayOf(PropTypes.string),
    assignee: PropTypes.arrayOf(PropTypes.string),
  }),
  onCardImageAttach: PropTypes.func.isRequired,
  onCardImageRemove: PropTypes.func.isRequired,
};

Form.defaultProps = {
  errors: {},
};

export default Form;
