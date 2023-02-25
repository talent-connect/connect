import { Module } from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '@talent-connect/shared-types'
import classnames from 'classnames'
import { ReactNode } from 'react'

import './MContacts.scss'

interface ContactRow {
  label: string
  children: ReactNode
}
const ContactRow = ({ label, children }: ContactRow) =>
  children ? (
    <div className="m-contacts__row">
      <div className="m-contacts__row__label">{label}</div>
      <div className="m-contacts__row__content">{children}</div>
    </div>
  ) : null

interface MContact {
  profile: RedProfile
  className?: string
}

const MContacts = ({ profile, className }: MContact) => {
  const { contactEmail, telephoneNumber, linkedInProfileUrl, slackUsername } =
    profile

  return (
    <Module
      title="Contact Info"
      className={classnames('m-contacts', { [`${className}`]: className })}
    >
      <ContactRow label="Email">
        {contactEmail && <a href={`mailto:${contactEmail}`}>{contactEmail}</a>}
      </ContactRow>
      <ContactRow label="Phone">{telephoneNumber}</ContactRow>
      <ContactRow label="LinkedIn">
        {linkedInProfileUrl && (
          <a
            href={linkedInProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkedInProfileUrl}
          </a>
        )}
      </ContactRow>
      <ContactRow label="Slack">{slackUsername}</ContactRow>
    </Module>
  )
}

export default MContacts
