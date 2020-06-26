import React, { ReactNode } from 'react'
import { Columns, Content, Element } from 'react-bulma-components'
import { RedProfile } from '../../../types/RedProfile'
import { Module } from '../../molecules'

import './MContacts.scss'

interface ContactRow {
  label: string
  children: string
}
const ContactRow = ({ label, children }: ContactRow) => (
  children
    ? <div className="m-contacts__row">
      <div className="m-contacts__row__label">{label}</div>
      <div className="m-contacts__row__content">{children}</div>
    </div>
    : <></>
)

interface MContact {
  profile: RedProfile
}

const MContacts = ({ profile }: MContact) => (
  <Module title="Contact Info" className="m-contacts">
    <ContactRow label="Email">{profile.contactEmail}</ContactRow>
    <ContactRow label="Phone">{profile.telephoneNumber}</ContactRow>
    <ContactRow label="LinkedIn">{profile.linkedInProfileUrl}</ContactRow>
    <ContactRow label="Slack">{profile.slackUsername}</ContactRow>
  </Module>
)

export default MContacts
