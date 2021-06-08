import React from 'react'
import { Heading, Icon } from '@talent-connect/shared-atomic-design-components'
import { Element } from 'react-bulma-components'
import './Editable.scss'

interface Props {
  title: string
}

export function Editable({ title }: Props) {
  return (
    <div className="profile-section">
      <div className="profile-section--title is-flex is-flex-direction-row">
        <Element
          renderAs="h4"
          textSize={4}
          responsive={{ mobile: { textSize: { value: 7 } } }}
          className="is-flex-grow-1"
          style={{ flexGrow: 1 }}
        >
          {title}
        </Element>
        <div className="icon__button">
          <Icon icon="edit" />
        </div>
      </div>
      <div className="profile-section--body">test</div>
    </div>
  )
}
