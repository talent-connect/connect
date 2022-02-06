import { connect } from 'react-redux'

import { TextInput } from '@talent-connect/shared-atomic-design-components'
import { Editable } from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '@talent-connect/shared-types'
import { profileSaveStart } from '../../redux/user/actions'
import { ReadContactDetails } from '../molecules'
import { mapStateToProps } from '../../helpers';
import { ComponentFormProps, componentForm } from './EditableContactDetails.form';

interface Props {
  profile: RedProfile
  profileSaveStart: ComponentFormProps['profileSaveStart']
}

function EditableContactDetails ({
  profile,
  profileSaveStart,
}: Props) {

  const formik = componentForm({
    profile,
    profileSaveStart
  })

  return (
    <Editable
      title="Contact Details"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadContactDetails.Me />}
    >
      <TextInput
        name="firstName"
        placeholder="First name"
        label="First name"
        {...formik}
      />
      <TextInput
        name="lastName"
        placeholder="Last name"
        label="Last name"
        {...formik}
      />
      <TextInput
        name="contactEmail"
        type="email"
        placeholder="Email"
        label="E-mail address"
        {...formik}
      />
      <TextInput
        name="telephoneNumber"
        placeholder="Telephone number"
        label="Telephone number"
        {...formik}
      />
    </Editable>
  )
}

// TODO repeated
const mapDispatchToProps = (dispatch: Function) => ({
  profileSaveStart: (profile: Partial<RedProfile>) =>
    dispatch(profileSaveStart(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditableContactDetails)
