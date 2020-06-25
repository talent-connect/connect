import React, { useState } from 'react'
import { Icon } from '../../atoms'
import { Module } from '../../molecules'
import { Content, Element } from 'react-bulma-components'
import { RedMentoringSession } from '../../../types/RedMentoringSession'
import moment from 'moment'
import { LogMentoringSessionDialog } from '../../LogMentoringSessionDialog'

import './MSessions.scss'

interface SessionRow {
  session: RedMentoringSession
}

const SessionRow = ({ session }: SessionRow) => (
  <li className="m-sessions__list__item">
    {moment(session.date).format('DD.MM.YYYY')} - <Element renderAs="span" textColor="grey">{session.minuteDuration} min</Element>
  </li>
)

interface AddSessionProps {
  onClickHandler: Function
}

const AddSession = ({ onClickHandler }: AddSessionProps) => (
  <Icon icon="plus" className="m-sessions__add" onClick={() => onClickHandler(true)}/>
)

interface MSessions {
  sessions: RedMentoringSession[]
  menteeId: string
  editable?: boolean
}

const MSessions = ({ sessions, menteeId, editable }: MSessions) => {
  const [showAddSession, setShowAddSession] = useState(false)

  return (
    <Module
      title={`Sessions ${sessions.length ? `(${sessions.length})` : ''}`}
      className="m-sessions"
      buttons={editable && <AddSession onClickHandler={setShowAddSession}/>}
    >
      {(sessions.length > 0)
        ? <ul className="m-sessions__list">
          {sessions.map(session => <SessionRow session={session} />)}
        </ul>
        : <Content textColor="grey-dark" italic>Log your first session with your mentee.</Content>
      }
      <LogMentoringSessionDialog
        menteeId={menteeId}
        isOpen={showAddSession}
        onClose={() => setShowAddSession(false)}
      />
    </Module>
  )
}

export default MSessions
