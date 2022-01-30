import { courses } from '../../config/config'
import { createComponentForm } from '@talent-connect/shared-utils';
import { CourseKey } from '@talent-connect/shared-config';

interface RediClassFormValues {
  mentee_currentlyEnrolledInCourse: string
}

export interface ComponentFormProps {
  mentee_currentlyEnrolledInCourse: CourseKey;
  profileSaveStart: (arg: RediClassFormValues & { id: string; }) => void;
  id: string;
}

export const componentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    mentee_currentlyEnrolledInCourse: yup.string()
      .required()
      .oneOf(courses.map(({ id }) => id))
      .label('Currently enrolled in course'),
  }))
  .initialValues(({ mentee_currentlyEnrolledInCourse }) => ({
    mentee_currentlyEnrolledInCourse
  }))
  .formikConfig({
    enableReinitialize: true,
  })
  .onSubmit((rediClass, _, { id, profileSaveStart }) => {
    profileSaveStart({ ...rediClass, id })
  })