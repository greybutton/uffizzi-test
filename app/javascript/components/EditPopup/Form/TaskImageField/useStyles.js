import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  imagePreviewContainerWrapper: {
    margin: '10px auto 0 auto',

    '& button': {
      margin: '5px auto 0 auto',
      width: '100%',
    },
  },

  imagePreviewContainer: {
    maxWidth: 200,
    maxHeight: 200,
  },
  imagePreview: {
    maxWidth: 'inherit',
    maxHeight: 'inherit',
  },
  imagePreviewLink: {
    maxWidth: 'inherit',
    maxHeight: 'inherit',
  },
}));

export default useStyles;
