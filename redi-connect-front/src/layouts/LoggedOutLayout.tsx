import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import { CssBaseline, Button, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

import rediLogo from '../assets/rediLogo.svg';

interface Props {
  children: React.ReactNode;
}

export const LoggedOutLayout = ({ children }: Props) => (
  <>
    <CssBaseline />
    <AppBar position="static">
      <Toolbar>
        <Button
          style={{ margin: 0, padding: 0 }}
          component={props => <Link {...props} to="/front/home" />}
        >
          <img
            src={rediLogo}
            style={{ height: '36px', width: '96px' }}
            alt="redi logo"
          />
        </Button>
      </Toolbar>
    </AppBar>
    <div style={{ margin: '12px' }}>{children}</div>
  </>
);
