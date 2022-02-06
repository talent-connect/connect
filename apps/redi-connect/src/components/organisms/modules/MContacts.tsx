import { ReactNode } from 'react'
import classnames from 'classnames'
import { RedProfile } from '@talent-connect/shared-types'
import { Module } from '@talent-connect/shared-atomic-design-components'

import './MContacts.scss'

interface ContactRow {
  label: string
  children?: ReactNode
}

function ContactRow ({ label, children }: ContactRow) {
  return children ? (
    <div className="m-contacts__row">
      <div className="m-contacts__row__label">{label}</div>
      <div className="m-contacts__row__content">{children}</div>
    </div>
  ) : (
    <></>
  )
}

interface MContactProps {
  profile: RedProfile
  className?: string
}

function MContacts ({
  profile: { contactEmail, telephoneNumber, linkedInProfileUrl, slackUsername },
  className
}: MContactProps) {

  return (
    <Module
      title="Contact Info"
      className={classnames('m-contacts', { [`${className}`]: className })}
    >
      <ContactRow label="Email">
        {contactEmail &&
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>}
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
