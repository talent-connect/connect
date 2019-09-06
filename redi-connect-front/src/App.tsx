import React, { useEffect } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { Provider as StoreProvider } from 'react-redux';
import { rootReducer } from './redux/reducers';

import { rootEpic } from './redux/epics';
import logo from './logo.svg';
import './App.css';
import { history, Router } from './services/history/history';
import { Routes } from './components/Routes';
import { store } from './redux/store';
import { UserActionType } from './redux/user/types';
import { profileFetchStart } from './redux/user/actions';

const mainColour = '#58adc4';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: mainColour,
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
    store.dispatch(profileFetchStart())
  }, [])
  return (
    <MuiThemeProvider theme={theme}>
      <StoreProvider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </StoreProvider>
    </MuiThemeProvider>
  );
};

export default App;
