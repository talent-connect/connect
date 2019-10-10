import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import { CssBaseline } from '@material-ui/core';

import rediLogo from '../assets/rediLogo.svg';

interface Props {
  children: React.ReactNode;
}

export const LoggedOutLayout = ({ children }: Props) => (
  <>
    <CssBaseline />
    <AppBar position="static">
      <img
        src={rediLogo}
        style={{ height: '36px', width: '96px', margin: '12px' }}
        alt="redi logo"
      />
    </AppBar>
    <div style={{ margin: '12px' }}>{children}</div>
  </>
);
