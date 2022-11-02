import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';
import Button from '@material-ui/core/Button';

import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import useStyles from './useStyles';

const ImageCropper = ({ onSave, onCancel, fileAsBase64 }) => {
  const styles = useStyles();

  const DEFAULT_CROP_PARAMS = {
    aspect: 1,
    width: 150,
    height: 150,
    minWidth: 100,
    minHeight: 100,
    x: 20,
    y: 20,
  };

  const [cropParams, changeCropParams] = useState(DEFAULT_CROP_PARAMS);
  const [image, changeImage] = useState(null);

  const getActualCropParameters = (width, height, params) => ({
    cropX: (params.x * width) / 100,
    cropY: (params.y * height) / 100,
    cropWidth: (params.width * width) / 100,
    cropHeight: (params.height * height) / 100,
  });

  const handleCropComplete = (newCrop, newPercentageCrop) => changeCropParams(newPercentageCrop);
  const handleCropChange = (_, newCropParams) => changeCropParams(newCropParams);

  const handleImageLoaded = (loadedImage) => {
    const newCropParams = makeAspectCrop(cropParams, loadedImage.width, loadedImage.height);
    changeCropParams(newCropParams);
    changeImage(loadedImage);
  };

  const handleSave = () => {
    const { naturalWidth: width, naturalHeight: height } = image;
    const actualCropParams = getActualCropParameters(width, height, cropParams);

    onSave(actualCropParams);
  };

  return (
    <>
      <div className={styles.crop}>
        <ReactCrop
          src={fileAsBase64}
          crop={cropParams}
          onImageLoaded={handleImageLoaded}
          onComplete={handleCropComplete}
          onChange={handleCropChange}
          keepSelection
        />
      </div>
      <div className={styles.buttonsContainer}>
        <Button variant="outlined" size="small" color="primary" disabled={isNil(image)} onClick={handleSave}>
          Save image
        </Button>
        <Button variant="outlined" size="small" disabled={isNil(image)} onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </>
  );
};

ImageCropper.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  fileAsBase64: PropTypes.string.isRequired,
};

export default ImageCropper;
