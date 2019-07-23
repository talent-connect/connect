import DateFnsUtils from '@date-io/moment';
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Theme,
  withStyles,
  TextField,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from '@material-ui/core';
import classNames from 'classnames';
import { Formik, FormikActions, FormikProps } from 'formik';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import {
  mentoringSessionDurationOptions,
  reportProblemCategories,
} from '../config/config';
import {
  mentoringSessionsClearAsyncResult,
  mentoringSessionsCreateStart,
} from '../redux/mentoringSessions/actions';
import {
  MentoringSessionsClearAsyncResultAction,
  MentoringSessionsCreateStartAction,
} from '../redux/mentoringSessions/types';
import { RootState } from '../redux/types';
import { FormSubmitResult } from '../types/FormSubmitResult';
import { RedMentoringSession } from '../types/RedMentoringSession';
import { FullScreenCircle } from '../hooks/WithLoading';
import { ReportProblemBtnProps } from './ReportProblemBtn';
import { reportProblem } from '../services/api/api';
import { RedProfile } from '../types/RedProfile';
import { RedProblemReportDto } from '../types/RedProblemReportDto';
import { profilesFetchOneStart } from '../redux/profiles/actions';

type ReportProblemDialogProps = {
  redProfileId: string;
  type: ReportProblemBtnProps['type'];
  isOpen: boolean;
  onClose: () => void;
  asyncResult: FormSubmitResult;

  // Replace dispatch with something proper imported from redux typings file
  /*
  dispatch: (
    action:
      | MentoringSessionsCreateStartAction
      | MentoringSessionsClearAsyncResultAction
  ) => void;
  */
};
/*
const mapState = (state: RootState) => ({
  asyncResult: state.mentoringSessions.asyncResult,
});
*/
/*
const submit = async (
    values: FormValues,
    actions: FormikActions<FormValues>
  ) => {*/

const ReportProblemDialogConnected = connect()((props: any) => {
  const { isOpen, onClose, type, redProfileId } = props;
  const dispatch: any = (props as any).dispatch;
  /*useEffect(() => {
      dispatch(mentoringSessionsClearAsyncResult());
    }, [isOpen]);*/

  const [formSubmitResult, setFormSubmitResult] = useState<FormSubmitResult>(
    'notSubmitted'
  );

  const submit = async (
    values: FormValues,
    actions: FormikActions<FormValues>
  ) => {
    if (values.ifFromMentor_cancelMentorshipImmediately) {
      const userIsCertain = confirm(
        'Are you sure you want to cancel this mentorship?'
      );
      if (!userIsCertain) return actions.setSubmitting(false);
    }
    setFormSubmitResult('submitting');
    try {
      const report: RedProblemReportDto = {
        problemDescription: values.problemDescription,
        reportType:
          type === 'mentee'
            ? 'mentor-report-about-mentee'
            : 'mentee-report-about-mentor',
        reporteeId: redProfileId,
      };
      if (type === 'mentee') {
        report.ifFromMentor_cancelMentorshipImmediately =
          values.ifFromMentor_cancelMentorshipImmediately;
      }
      await reportProblem(report);
      setFormSubmitResult('success');
      // TODO: can this be decoupled? Here the component "knows" that it's inside a <Profile>
      // and triggers a refresh of that <Profile>
      dispatch(profilesFetchOneStart(redProfileId));
    } catch (err) {
      setFormSubmitResult('error');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <FullScreenCircle loading={formSubmitResult === 'submitting'} />
      <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth="sm"
        fullWidth={true}
        onBackdropClick={e => e.stopPropagation()}
      >
        <DialogTitle>Report problem</DialogTitle>
        <DialogContent />
        <DialogActions>
          <Grid container>
            <Formik
              render={props => (
                <Form
                  {...props}
                  submitResult={formSubmitResult}
                  onClose={onClose}
                  type={type}
                />
              )}
              onSubmit={submit}
              initialValues={initialFormValues}
              validationSchema={validationSchema}
            />
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
});

export const ReportProblemDialog = (props: any) => (
  <ReportProblemDialogConnected {...props} />
);

const initialFormValues: FormValues = {
  problemDescription: '',
  ifFromMentor_cancelMentorshipImmediately: false,
};

const validationSchema = Yup.object({
  problemDescription: Yup.string()
    .required()
    .label('Problem description')
    .max(1000),
});

interface FormValues {
  problemDescription: string;
  ifFromMentor_cancelMentorshipImmediately: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    submitResult: {
      padding: theme.spacing.unit,
      color: 'white',
    },
    submitError: {
      backgroundColor: theme.palette.error.main,
    },
    submitSuccess: {
      backgroundColor: theme.palette.primary.main,
    },
    margin: {
      margin: '6px 0',
    },
  });

type FormProps = {
  classes: {
    submitResult: string;
    submitError: string;
    submitSuccess: string;
    margin: string;
  };
  type: RedProfile['userType'];
  submitResult: FormSubmitResult;
  onClose: () => void;
};

const Form = withStyles(styles)(
  ({
    isSubmitting,
    submitResult,
    values: { problemDescription, ifFromMentor_cancelMentorshipImmediately },
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
    isValid,
    classes,
    onClose,
    type,
  }: FormikProps<FormValues> & FormProps) => {
    const change = (name: any, e: any) => {
      e.persist();
      handleChange(e);
      setFieldTouched(name, true, false);
    };

    return (
      <>
        {submitResult === 'error' && (
          <Paper
            className={classNames(classes.submitError, classes.submitResult)}
          >
            An error occurred, please try again.
          </Paper>
        )}
        {submitResult === 'success' && <>The problem report was sent.</>}
        {submitResult !== 'success' && (
          <>
            <TextField
              className={classes.margin}
              id="problemDescription"
              name="problemDescription"
              label="Problem description"
              error={
                touched.problemDescription && Boolean(errors.problemDescription)
              }
              helperText={
                touched.problemDescription
                  ? errors.problemDescription
                  : 'Please describe the problem'
              }
              value={problemDescription}
              multiline
              fullWidth
              rows="4"
              onChange={change.bind(null, 'problemDescription')}
            />
            {type === 'mentee' && (
              <>
                <FormControlLabel
                  label="Immediately cancel mentorship with this mentee"
                  control={
                    <Checkbox
                      id="ifFromMentor_cancelMentorshipImmediately"
                      name="ifFromMentor_cancelMentorshipImmediately"
                      checked={ifFromMentor_cancelMentorshipImmediately}
                      onChange={change.bind(
                        null,
                        'ifFromMentor_cancelMentorshipImmediately'
                      )}
                      disabled={isSubmitting}
                    />
                  }
                />
                {ifFromMentor_cancelMentorshipImmediately && (
                  <FormHelperText style={{ marginBottom: '1em' }}>
                    <em>
                      Not ReDI? We regret you want to cancel this mentorship.
                      Someone from our Career Department will be in touch with
                      both you and your mentee
                    </em>
                  </FormHelperText>
                )}
              </>
            )}
            <Grid item xs={6}>
              <Button onClick={() => onClose()} color="primary" fullWidth>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => handleSubmit()}
                disabled={!isValid || isSubmitting}
                color="primary"
                variant="contained"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </>
        )}
      </>
    );
  }
);
