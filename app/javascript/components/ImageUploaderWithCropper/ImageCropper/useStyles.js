import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  crop: {
    maxWidth: 400,
    maxHeight: 200,
    padding: 15,
    margin: '0 auto',
    width: 'fit-content',

    '& img': {
      maxWidth: 400,
      maxHeight: 200,
    },
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& button+button': {
      margin: 5,
    },
  },
}));

export default useStyles;
