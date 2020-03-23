import React from 'react';
import { LoggedOutLayout } from '../../../layouts/LoggedOutLayout';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <LoggedOutLayout>
      <div>hello home</div>
      <Link to="/front/login">LOGIN</Link> <br />
      <Link to="/front/signup/landing">SIGN UP</Link>
    </LoggedOutLayout>
  );
}
