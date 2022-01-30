import { FC } from 'react'
import { connect } from 'react-redux'

import { FormSelect } from '@talent-connect/shared-atomic-design-components'
import { Editable } from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '@talent-connect/shared-types'

import { profileSaveStart } from '../../redux/user/actions'

import { LANGUAGES } from '@talent-connect/shared-config'
import { ReadLanguages } from '../molecules'
import { mapOptionsArray } from '@talent-connect/typescript-utilities'
import { mapStateToProps } from '../../helpers';
import { ComponentFormProps, componentForm } from './EditableLanguages.form';

const formLanguages = mapOptionsArray(LANGUAGES)

interface Props {
  profile: RedProfile
  profileSaveStart: ComponentFormProps['profileSaveStart']
}

const EditableLanguages: FC<Props> = ({
  profile,
  profileSaveStart
}) => {

  const formik = componentForm({
    profile,
    profileSaveStart,
  })

  return (
    <Editable
      title="Languages"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadLanguages.Me />}
    >
      <FormSelect
        label="Which of these languages do you speak?*"
        name="languages"
        items={formLanguages}
        multiSelect
        {...formik}
      />
    </Editable>
  )
}

const mapDispatchToProps = (dispatch: Function) => ({
  profileSaveStart: (profile: Partial<RedProfile>) =>
    dispatch(profileSaveStart(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditableLanguages)
