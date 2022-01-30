import { Dispatch, SetStateAction } from 'react';
import { FormSubmitResult, RedProfile } from '@talent-connect/shared-types';
import { createComponentForm } from '@talent-connect/shared-utils';

import { requestMentorship } from '../../services/api/api'

interface ComponentFormProps {
  setSubmitResult: Dispatch<SetStateAction<FormSubmitResult>>
  setShow: Dispatch<SetStateAction<boolean>>
  id: RedProfile['id'];
  profilesFetchOneStart: (is: string) => void;
}

export const componentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    applicationText: yup.string()
      .required('Write at least 250 characters to introduce yourself to your mentee.')
      .min(250, 'Write at least 250 characters to introduce yourself to your mentee.')
      .max(600, 'The introduction text can be up to 600 characters long.'),
    expectationText: yup.string()
      .required('Write at least 250 characters about your expectations.')
      .min(250, 'Write at least 250 characters about your expectations.')
      .max(600, 'The expectations text can be up to 600 characters long.'),
    dataSharingAccepted: yup.boolean()
      .required()
      .oneOf([true], 'Sharing profile data with your mentor is required'),
  }))
  .initialValues(() => ({
    applicationText: '',
    expectationText: '',
    dataSharingAccepted: false,
  }))
  .formikConfig({
    enableReinitialize: true,
  })
  .onSubmit(async (
    { applicationText, expectationText },
    actions,
    { setSubmitResult, id, profilesFetchOneStart, setShow }
  ) => {
    setSubmitResult('submitting')
    try {
      await requestMentorship(applicationText, expectationText, id)
      setShow(false)
      profilesFetchOneStart(id)
    } catch (error) {
      setSubmitResult('error')
    }
  })