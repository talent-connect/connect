import React, { useState } from 'react'
import { Columns, Heading, Element } from 'react-bulma-components'
import { getRedProfile } from '../../services/auth/auth'
import { RedMatch } from '../../types/RedMatch'
// import { Avatar } from '../../../components/Avatar'
import { useHistory } from 'react-router-dom'

import './ApplicationCard.scss'

interface Props {
  application: RedMatch & { createdAt?: string }
}

export const ApplicationCard = ({ application }: Props) => {
  const history = useHistory()
  const profile = getRedProfile()
  const [showDetails, setShowDetails] = useState(false)
  const applicationDate = new Date(application.createdAt || '')
  const applicationUser = profile.userType === 'mentee' ? application.mentor : application.mentee

  return (<>
    <div className="application-card">
      <Columns vCentered>
        <Columns.Column size={1}>
          avatar
          {/* will be delivered separatly */}
        </Columns.Column>

        <Columns.Column size={4}>
          {applicationUser && `${applicationUser.firstName} ${applicationUser.lastName}`}
        </Columns.Column>

        <Columns.Column size={2}>
          {`${applicationDate.getDay()}.${applicationDate.getMonth()}.${applicationDate.getFullYear()}`}
        </Columns.Column>

        <Columns.Column size={2}>
          {application.status}
        </Columns.Column>

        <Columns.Column size={2}>
          <span className="application-card__link" onClick={() => history.push(`/app/profile/${applicationUser && applicationUser.id}`)}>See Profile</span>
        </Columns.Column>

        <Columns.Column size={1}>
          <span className={`application-card-dropdown application-card-dropdown--${showDetails ? 'up' : 'down'}`} onClick={() => setShowDetails(!showDetails)}></span>
        </Columns.Column>
      </Columns>
    </div>

    <div className={`application-card-details application-card-details--${showDetails ? 'show' : 'hide'}`}>
      <Heading
        size={5}
        weight="normal"
        renderAs="h3"
        subtitle
        textTransform="uppercase"
      >
        Motivation
      </Heading>
      <Element>
        {application.applicationText}
      </Element>
    </div>
  </>
  )
}
