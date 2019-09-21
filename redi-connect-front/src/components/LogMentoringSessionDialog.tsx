import MomentUtils from '@date-io/moment';
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
} from '@material-ui/core';
import classNames from 'classnames';
import { Formik, FormikActions, FormikProps } from 'formik';
import { DatePicker, MuiPickersUtilsProvider, MaterialUiPickersDate } from '@material-ui/pickers';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { mentoringSessionDurationOptions } from '../config/config';
import {
  mentoringSessionsClearAsyncResult,
  mentoringSessionsCreateStart
} from "../redux/mentoringSessions/actions";
import {
  MentoringSessionsClearAsyncResultAction,
  MentoringSessionsCreateStartAction
} from "../redux/mentoringSessions/types";
import { RootState } from "../redux/types";
import { FormSubmitResult } from "../types/FormSubmitResult";
import { RedMentoringSession } from "../types/RedMentoringSession";
import { FullScreenCircle } from "../hooks/WithLoading";

interface LogMentoringSessionDialogProps {
  menteeId: string;
  isOpen: boolean;
  onClose: () => void;
  asyncResult: FormSubmitResult;
  // Replace dispatch with something proper imported from redux typings file
  dispatch: (
    action:
      | MentoringSessionsCreateStartAction
      | MentoringSessionsClearAsyncResultAction
  ) => void;
}

const mapState = (state: RootState) => ({
  asyncResult: state.mentoringSessions.asyncResult
});

/*
const submit = async (
    values: FormValues,
    actions: FormikActions<FormValues>
  ) => {*/

export const LogMentoringSessionDialog = connect(mapState)(
  ({
    isOpen,
    onClose,
    asyncResult,
    menteeId,
    dispatch
  }: LogMentoringSessionDialogProps) => {
    useEffect(() => {
      dispatch(mentoringSessionsClearAsyncResult());
    }, [isOpen]);
    const submit = (values: FormValues, actions: FormikActions<FormValues>) => {
      const mentoringSession: RedMentoringSession = {
        date: values.date,
        minuteDuration: Number(values.minuteDuration),
        menteeId: menteeId
      };
      dispatch(mentoringSessionsCreateStart(mentoringSession));
    };
    return (
      <>
        <FullScreenCircle loading={asyncResult === "submitting"} />
        <Dialog
          open={isOpen}
          onClose={onClose}
          maxWidth="sm"
          fullWidth={true}
          onClick={e => e.stopPropagation()}
          onBackdropClick={e => e.stopPropagation()}
        >
          <DialogTitle>Log mentoring session</DialogTitle>
          <DialogContent />
          <DialogActions>
            <Grid container>
              <Formik
                render={props => (
                  <Form
                    {...props}
                    submitResult={asyncResult}
                    onClose={onClose}
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
  }
);

const initialFormValues: FormValues = {
  date: new Date(),
  minuteDuration: 60
};

const validationSchema = Yup.object({
  date: Yup.date()
    .required()
    .label("Date"),
  minuteDuration: Yup.number()
    .required()
    .oneOf(mentoringSessionDurationOptions, "Please select a duration")
});

interface FormValues {
  date: Date;
  minuteDuration?: number;
}

const styles = (theme: Theme) =>
  createStyles({
    submitResult: {
      padding: theme.spacing(1),
      color: 'white',
    },
    submitError: {
      backgroundColor: theme.palette.error.main
    },
    submitSuccess: {
      backgroundColor: theme.palette.primary.main
    },
    margin: {
      margin: "6px 0"
    }
  });

interface FormProps {
  classes: {
    submitResult: string;
    submitError: string;
    submitSuccess: string;
    margin: string;
  };
  submitResult: FormSubmitResult;
  onClose: () => void;
}

const Form = withStyles(styles)(
  ({
    isSubmitting,
    submitResult,
    values: { date, minuteDuration },
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
    isValid,
    classes,
    onClose,
    validateForm
  }: FormikProps<FormValues> & FormProps) => {
    const change = (name: any, e: any) => {
      e.persist();
      handleChange(e);
      setFieldTouched(name, true, false);
    };
    const changeDate = (date: MaterialUiPickersDate) => {
      setFieldTouched('date');
      setFieldValue('date', date);
    };
    useEffect(() => {
      validateForm();
    }, []);

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {submitResult === 'error' && (
          <Paper
            className={classNames(classes.submitError, classes.submitResult)}
          >
            An error occurred, please try again.
          </Paper>
        )}
        {submitResult === "success" && (
          <>The mentoring session was successfully logged.</>
        )}
        {submitResult !== "success" && (
          <>
            <DatePicker
              id="date"
              name="date"
              label="Pick a date"
              helperText={touched.date ? errors.date : ""}
              error={touched.date && Boolean(errors.date)}
              value={date}
              onChange={changeDate}
              fullWidth
              disabled={isSubmitting}
            />
            <FormControl className={classes.margin} fullWidth>
              <InputLabel
                htmlFor="minuteDuration"
                shrink={Boolean(minuteDuration)}
              >
                How long did your mentoring session last? (round up)
              </InputLabel>
              <Select
                value={minuteDuration}
                type="number"
                error={touched.minuteDuration && Boolean(errors.minuteDuration)}
                onChange={change.bind(null, "minuteDuration")}
                disabled={isSubmitting}
                inputProps={{
                  name: "minuteDuration",
                  id: "minuteDuration"
                }}
              >
                {mentoringSessionDurationOptions.map(minuteDuration => (
                  <MenuItem key={minuteDuration} value={minuteDuration}>
                    {minuteDuration} minutes
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                Log
              </Button>
            </Grid>
          </>
        )}
      </MuiPickersUtilsProvider>
    );
  }
);
