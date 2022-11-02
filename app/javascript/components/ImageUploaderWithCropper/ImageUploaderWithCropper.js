import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { path } from 'ramda';

import ImageUploader from './ImageUploader';
import ImageCropper from './ImageCropper';
import useStyles from './useStyles';

const ImageUploaderWithCropper = ({ onUpload }) => {
  const styles = useStyles();
  const [fileAsBase64, changeFileAsBase64] = useState(null);
  const [file, changeFile] = useState(null);

  const handleSave = (cropParams) => onUpload({ attachment: { ...cropParams, image: file } });
  const handleCancel = () => changeFile(null);

  const handleLoadFile = (e) => {
    e.preventDefault();
    const [acceptedFile] = e.target.files;
    changeFile(acceptedFile);
  };

  const readImage = () => {
    if (!file) {
      changeFileAsBase64(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (result) => changeFileAsBase64(path(['target', 'result'], result));
    fileReader.readAsDataURL(file);
  };

  useEffect(() => readImage(), [file]);

  return fileAsBase64 ? (
    <ImageCropper onSave={handleSave} onCancel={handleCancel} fileAsBase64={fileAsBase64} />
  ) : (
    <div className={styles.singleButtonWrapper}>
      <ImageUploader onChange={handleLoadFile} />
    </div>
  );
};

ImageUploaderWithCropper.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default ImageUploaderWithCropper;
