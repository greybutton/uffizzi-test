import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

import store from 'store';
import TaskBoard from 'containers/TaskBoard';

const theme = createTheme();

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <TaskBoard />
    </ThemeProvider>
  </Provider>
);

export default App;
