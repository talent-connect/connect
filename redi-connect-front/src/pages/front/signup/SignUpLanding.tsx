import React from 'react';
import { LoggedOutLayout } from '../../../layouts/LoggedOutLayout';
import { Link } from 'react-router-dom';

export default function SignUpLanding() {
  return (
    <LoggedOutLayout>
      <div>hello signup landing</div>
      <Link to="/front/signup/mentee">mentee</Link>
      <br />
      <Link to="/front/signup/mentor">mentor</Link>
    </LoggedOutLayout>
  );
}
