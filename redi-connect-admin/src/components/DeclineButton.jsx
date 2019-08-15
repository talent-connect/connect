import React from 'react';
import Button from '@material-ui/core/Button';
import { buildApproveOrRejectButton } from './component-factories/build-approve-or-decline-button';

export const DeclineButton = buildApproveOrRejectButton('DECLINE');
