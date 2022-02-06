import { useState } from 'react'
import { connect } from 'react-redux'
import {
  Caption,
  TextArea,
  Checkbox,
  Button,
} from '@talent-connect/shared-atomic-design-components'
import { Modal } from '@talent-connect/shared-atomic-design-components'
import { Content, Form } from 'react-bulma-components'
import { FormSubmitResult, RedProfile } from '@talent-connect/shared-types'

import { RootState } from '../../redux/types'
import { profilesFetchOneStart } from '../../redux/profiles/actions'
import { componentForm } from './ApplyForMentor.form';

interface Props {
  mentor: RedProfile
  profilesFetchOneStart: (is: string) => void
}

function ApplyForMentor ({
  mentor: { id, lastName, firstName },
  profilesFetchOneStart
}: Props) {
  const [submitResult, setSubmitResult] = useState<FormSubmitResult>('notSubmitted')
  const [show, setShow] = useState(false)
  
  const formik = componentForm({
    id,
    setSubmitResult,
    profilesFetchOneStart,
    setShow,
  })

  const handleCancel = () => {
    setShow(false)
    formik.resetForm()
  }

  return (
    <>
      <Button onClick={() => setShow(true)}>Apply for this mentor</Button>
      <Modal
        show={show}
        stateFn={setShow}
        title={`Application to ${firstName} ${lastName}`}
      >
        <Modal.Body>
          <form>
            {submitResult === 'success'
              ? (<>Your application was successfully submitted.</>)
              : (
              <>
                <Caption>Motivation </Caption>
                <Content>
                  <p>
                    Write an application to the {firstName}{' '}
                    {lastName} in which you describe why you think that
                    the two of you are a great fit.
                  </p>
                </Content>
                <TextArea
                  name="applicationText"
                  className="oneandhalf-bs"
                  rows={4}
                  placeholder={`Dear ${firstName}...`}
                  minChar={250}
                  maxChar={600}
                  {...formik}
                />

                <Caption>Expectation </Caption>
                <Content>
                  <p>
                    Please also write a few words about your expectations on the
                    mentorship with this mentor.
                  </p>
                </Content>
                <TextArea
                  name="expectationText"
                  rows={4}
                  placeholder="My expectations for this mentorship…"
                  minChar={250}
                  maxChar={600}
                  {...formik}
                />

                <Form.Help
                  color="danger"
                  className={submitResult === 'error' ? 'help--show' : ''}
                >
                  {submitResult === 'error' &&
                    'An error occurred, please try again.'}
                </Form.Help>

                <Checkbox.Form
                  name="dataSharingAccepted"
                  checked={formik.values.dataSharingAccepted}
                  {...formik}
                >
                  I understand that my profile data will be shared with this
                  mentor
                </Checkbox.Form>
              </>
            )}
          </form>
        </Modal.Body>

        <Modal.Foot>
          <Button
            onClick={() => formik.handleSubmit()}
            disabled={!(formik.dirty && formik.isValid)}
          >
            Send application
          </Button>

          <Button onClick={handleCancel} simple>
            Cancel
          </Button>
        </Modal.Foot>
      </Modal>
    </>
  )
}

const mapStateToProps = ({ profiles }: RootState) => ({ mentor: profiles.oneProfile })

const mapDispatchToProps = (dispatch: Function) => ({
  profilesFetchOneStart: (profileId: string) =>
    dispatch(profilesFetchOneStart(profileId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplyForMentor)
