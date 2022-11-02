import React from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';
import Button from '@material-ui/core/Button';

import TaskPresenter from 'presenters/TaskPresenter';
import ImageUploaderWithCropper from 'components/ImageUploaderWithCropper';
import useStyles from './useStyles';

const TaskImageField = ({ task, onImageSave, onImageRemove }) => {
  const styles = useStyles();
  const taskImageUrl = TaskPresenter.imageUrl(task);
  const taskHasImage = () => isNil(taskImageUrl);

  const handleAttachImage = (imageUploadInfo) => onImageSave(imageUploadInfo);
  const handleRemoveImage = () => onImageRemove();

  return taskHasImage() ? (
    <div className={styles.imageUploadContainer}>
      <ImageUploaderWithCropper onUpload={handleAttachImage} />
    </div>
  ) : (
    <div className={styles.imagePreviewContainerWrapper}>
      <div className={styles.imagePreviewContainer}>
        <a
          className={styles.imagePreviewLink}
          href={taskImageUrl}
          target="_blank"
          title="View full image"
          rel="noreferrer"
        >
          <img className={styles.imagePreview} src={taskImageUrl} alt="Attachment" />
        </a>
      </div>

      <Button variant="outlined" size="small" color="secondary" onClick={handleRemoveImage}>
        Remove image
      </Button>
    </div>
  );
};

TaskImageField.propTypes = {
  task: TaskPresenter.shape().isRequired,
  onImageSave: PropTypes.func.isRequired,
  onImageRemove: PropTypes.func.isRequired,
};

export default TaskImageField;
