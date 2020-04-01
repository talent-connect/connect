import {
  Button,
  Checkbox,
  createStyles,
  FormControlLabel,
  Paper,
  TextField,
  Theme,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import { Formik, FormikHelpers as FormikActions, FormikProps } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { requestMentorship } from '../../../../services/api/api';
import { FormSubmitResult } from '../../../../types/FormSubmitResult';

const styles = (theme: Theme) =>
  createStyles({
    submitResult: {
      padding: theme.spacing(1),
      color: 'white',
    },
    submitError: {
      backgroundColor: theme.palette.error.main,
    },
    submitSuccess: {
      backgroundColor: theme.palette.primary.main,
    },
  });

interface ConnectionRequestFormValues {
  applicationText: string;
  dataSharingAccepted: boolean;
}

const initialValues = {
  applicationText: '',
  dataSharingAccepted: false,
};

const validationSchema = Yup.object({
  applicationText: Yup.string()
    .required()
    .min(250)
    .max(600)
    .label('Application message'),
  dataSharingAccepted: Yup.boolean()
    .required()
    .oneOf([true], 'Sharing profile data with your mentor is required'),
});

interface Props {
  mentorId: string;
}

export const ConnectionRequestForm = ({ mentorId }: Props) => {
  const [submitResult, setSubmitResult] = useState<FormSubmitResult>(
    'notSubmitted'
  );
  const submit = async (
    values: ConnectionRequestFormValues,
    actions: FormikActions<ConnectionRequestFormValues>
  ) => {
    setSubmitResult('submitting');
    try {
      await requestMentorship(values.applicationText, mentorId);
      setSubmitResult('success');
    } catch (error) {
      setSubmitResult('error');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      render={props => <Form {...props} submitResult={submitResult} />}
      onSubmit={submit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    />
  );
};

const Form = ({
  isSubmitting,
  submitResult,
  values: { applicationText, dataSharingAccepted },
  errors,
  touched,
  handleChange,
  handleSubmit,
  setFieldTouched,
  isValid,
}: FormikProps<ConnectionRequestFormValues> & {
  submitResult: FormSubmitResult;
}) => {
  const change = (name: any, e: any) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };
  // TODO: Ugly way of getting classes -- fix this
  const GetClasses = withStyles(styles)((props: any) =>
    props.children(props.classes)
  );
  return (
    <form>
      <h3>Write a short application text message to this mentor</h3>
      {submitResult === 'error' && (
        <GetClasses>
          {(classes: any) => (
            <Paper className={clsx(classes.submitError, classes.submitResult)}>
              An error occurred, please try again.
            </Paper>
          )}
        </GetClasses>
      )}
      {submitResult === 'success' && (
        <GetClasses>
          {(classes: any) => (
            <Paper
              className={clsx(classes.submitSuccess, classes.submitResult)}
            >
              Your application was successfully submitted.
            </Paper>
          )}
        </GetClasses>
      )}
      {submitResult !== 'success' && (
        <>
          <TextField
            id="applicationText"
            name="applicationText"
            helperText={touched.applicationText ? errors.applicationText : ''}
            error={touched.applicationText && Boolean(errors.applicationText)}
            label="Write something about yourself..."
            value={applicationText}
            onChange={change.bind(null, 'applicationText')}
            multiline
            fullWidth
            rows="4"
            disabled={isSubmitting}
          />
          <FormControlLabel
            label="I understand that my profile data will be shared with this mentor"
            control={
              <Checkbox
                id="dataSharingAccepted"
                name="dataSharingAccepted"
                checked={dataSharingAccepted}
                onChange={change.bind(null, 'dataSharingAccepted')}
                disabled={isSubmitting}
              />
            }
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            disabled={!isValid || isSubmitting}
            onClick={() => handleSubmit()}
          >
            Send connection request
          </Button>
        </>
      )}
    </form>
  );
};
