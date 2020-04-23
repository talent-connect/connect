import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { LogMentoringSessionDialog } from './LogMentoringSessionDialog'

interface LogMentoringSessionBtnProps {
  dispatch: Function
  menteeId: string
}

export const LogMentoringSessionBtn = connect()(
  ({ dispatch, menteeId }: LogMentoringSessionBtnProps) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    return (
      <>
        <Button
          color="primary"
          variant="contained"
          onClick={e => {
            e.stopPropagation()
            setDialogOpen(true)
          }}
        >
          Log mentoring session
        </Button>
        <LogMentoringSessionDialog
          menteeId={menteeId}
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      </>
    )
  }
)
