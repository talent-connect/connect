import React from 'react'
import { LoggedIn } from '../../../components/templates'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { Element } from 'react-bulma-components'
import { Heading } from '@talent-connect/shared-atomic-design-components'

export function BrowseJobseeker() {
  const { data: profile } = useTpJobseekerProfileQuery()

  return (
    <LoggedIn>
      <Element
        renderAs="h4"
        textSize={3}
        responsive={{ mobile: { textSize: { value: 7 } } }}
        className="is-flex-grow-1"
        style={{ flexGrow: 1 }}
      >
        Congratulations!
      </Element>
      <Element
        renderAs="p"
        textSize={4}
        responsive={{ mobile: { textSize: { value: 5 } } }}
        className="oneandhalf-bs"
      >
        Your profile has been matched with xxx open job positions.
      </Element>
      <Element
        renderAs="p"
        textSize={5}
        responsive={{ mobile: { textSize: { value: 6 } } }}
        className="oneandhalf-bs"
      >
        Now you can view the job posting and the company profile to get ready
        for your interview.
      </Element>
    </LoggedIn>
  )
}
