import React, { useEffect, Suspense } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { Provider as StoreProvider } from 'react-redux';
import './App.scss';
import { history, Router } from './services/history/history';
import { Routes } from './components/Routes';
import { store } from './redux/store';
import { profileFetchStart } from './redux/user/actions';
import AppNotification from './components/AppNotification';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#58adc4',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ea5b25',
    },
    error: {
      main: '#b00020',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
  overrides: {
    MuiStepIcon: {
      root: {
        color: '#eaeaea',
        '&$active': {
          color: '#ea5b25',
        },
        '&$completed': {
          color: '#ea5b25',
        },
      },
    },
    MuiStepLabel: {
      label: {
        color: '#eaeaea',
        '&$active': {
          color: '#ea5b25',
        },
        '&$completed': {
          color: '#ea5b25',
        },
      },
    },
  },
});

const App = () => {
  useEffect(() => {
    store.dispatch(profileFetchStart());
  }, []);
  return (
    <MuiThemeProvider theme={theme}>
      <AppNotification />
      <StoreProvider store={store}>
        <Router history={history}>
          <Suspense fallback={<h3>Loading...</h3>}>
            <Routes />
          </Suspense>
        </Router>
      </StoreProvider>
    </MuiThemeProvider>
  );
};

export default App;
