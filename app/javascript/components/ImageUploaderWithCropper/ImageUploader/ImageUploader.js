import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Image from '@material-ui/icons/Image';

const ImageUploader = ({ onChange }) => (
  <label htmlFor="imageUpload">
    <Button variant="contained" size="small" color="primary" component="span" startIcon={<Image />}>
      Add Image
    </Button>

    <input accept="image/*" id="imageUpload" type="file" onChange={onChange} hidden />
  </label>
);

ImageUploader.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ImageUploader;
