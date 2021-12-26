import { FunctionComponent } from 'react'
import { FormSelect } from '@talent-connect/shared-atomic-design-components'
import { Editable } from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '@talent-connect/shared-types'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'

import { profileSaveStart } from '../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'

import { ReadRediClass } from '../molecules'
import { courses } from '../../config/config'

const formCourses = courses.map((course) => ({
  value: course.id,
  label: course.label,
}))

export interface RediClassFormValues {
  mentee_currentlyEnrolledInCourse: string
}

const validationSchema = Yup.object({
  mentee_currentlyEnrolledInCourse: Yup.string()
    .required()
    .oneOf(courses.map((level) => level.id))
    .label('Currently enrolled in course'),
})

interface Props {
  profile: RedProfile
  profileSaveStart: Function
}

const EditableRediClass: FunctionComponent<Props> = ({
  profile: { id, mentee_currentlyEnrolledInCourse },
  profileSaveStart
}) => {
  
  const submitForm = async (values: FormikValues) => {
    const rediClass = values as Partial<RedProfile>
    profileSaveStart({ ...rediClass, id })
  }

  const initialValues: RediClassFormValues = {
    mentee_currentlyEnrolledInCourse,
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
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

const mapStateToProps = ({ user: { profile }}: RootState) => ({ profile })

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) =>
    dispatch(profileSaveStart(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditableRediClass)
