import React from 'react'
import Button from '@mui/material/Button'
import { buildApproveOrRejectButton } from './component-factories/build-approve-or-decline-button'

export const DeclineButton = buildApproveOrRejectButton('DECLINE')
