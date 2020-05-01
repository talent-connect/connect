import React from 'react'
import AccountOperation from '../../../components/templates/AccountOperation'
import { Columns, Heading, Content } from 'react-bulma-components'
import Teaser from '../../../components/molecules/Teaser'
import { useParams } from 'react-router'

interface RouteParams {
  type: string
}

export default function SignUpComplete () {
  const { type } = useParams<RouteParams>()

  return (
    <AccountOperation>
      <Columns vCentered>
        <Columns.Column
          size={5}
          responsive={{ mobile: { hide: { value: true } } }}
        >
          <Teaser.Isabelle />
        </Columns.Column>

        <Columns.Column size={5} offset={2}>
          <Heading
            size={1}
            weight="normal"
            renderAs="h1"
            responsive={{ mobile: { textSize: { value: 2 } } }}
            className="title--border"
            spaced={true}
          >
            Welcome to ReDI Connect
          </Heading>

          <Content size="large" renderAs="div">
            {type === 'mentee' && (
              <>
                <p>
                  Thanks for registering! We're thrilled that you're ReDI :) But there
                  is one last step before we can activate your profile because we want
                  to make sure you find the right mentor:
                </p>

                <p>
                  Simply contact Isabelle via e-mail isabelle@redi-school.org to
                  schedule a meeting. Or just turn up anytime between 5 and 8 on a
                  Tuesday at ReDI School.
                </p>
                <p>You can also find and write to Isabelle on the ReDI Slack.</p>
              </>
            )}
            {type === 'mentor' && (
              <p>
                Thanks for registering! We're thrilled that you're ReDI :) We
                promise to review your profile as quickly as possible. We'll send
                you an email once we're done.
              </p>
            )}
          </Content>
        </Columns.Column>
      </Columns>
    </AccountOperation>
  )
}
