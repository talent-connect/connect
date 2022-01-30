import { FC } from 'react'
import { connect } from 'react-redux'

import { FormSelect } from '@talent-connect/shared-atomic-design-components'
import { Editable } from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '@talent-connect/shared-types'

import { profileSaveStart } from '../../redux/user/actions'
import { ReadRediClass } from '../molecules'
import { courses } from '../../config/config'
import { mapOptions } from '@talent-connect/typescript-utilities';
import { mapStateToProps } from '../../helpers';
import { componentForm, ComponentFormProps } from './EditableRediClass.form';

const formCourses = mapOptions(courses)

interface Props {
  profile: RedProfile
  profileSaveStart: ComponentFormProps['profileSaveStart']
}

const EditableRediClass: FC<Props> = ({
  profile: { id, mentee_currentlyEnrolledInCourse },
  profileSaveStart
}) => {
  
  const formik = componentForm({
    id,
    mentee_currentlyEnrolledInCourse,
    profileSaveStart
  })

  return (
    <Editable
      title="Redi Class"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadRediClass.Me />}
    >
      <FormSelect
        label="Which course are you taking at ReDI?"
        name="mentee_currentlyEnrolledInCourse"
        items={formCourses}
        {...formik}
      />
    </Editable>
  )
}

const mapDispatchToProps = (dispatch: Function) => ({
  profileSaveStart: (profile: Partial<RedProfile>) =>
    dispatch(profileSaveStart(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditableRediClass)
