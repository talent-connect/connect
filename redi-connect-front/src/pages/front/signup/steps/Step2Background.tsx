import React from 'react';
import * as Yup from 'yup';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  withStyles,
} from '@material-ui/core';
import { SignUpFormValues, SignUpFormType } from '../factory';
import { FormikProps } from 'formik';
import {
  educationLevels,
  courses,
  menteeOccupationCategories,
} from '../../../../config/config';

export const validationSchema = Yup.object({
  mentor_occupation: Yup.string().when('formType', {
    is: 'public-sign-up-mentor-pending-review',
    then: Yup.string()
      .required()
      .max(255)
      .label('Occupation'),
  }),
  mentor_workPlace: Yup.string()
    .max(255)
    .label('Work place'),
  mentee_occupationCategoryId: Yup.string().when('formType', {
    is: 'public-sign-up-mentee-pending-review',
    then: Yup.string()
      .required()
      .oneOf(menteeOccupationCategories.map(v => v.id))
      .label('Current occupation'),
  }),
  mentee_occupationJob_placeOfEmployment: Yup.string()
    .max(255)
    .label('Where are you employed'),
  mentee_occupationJob_position: Yup.string()
    .max(255)
    .label('At what university do you study'),
  mentee_occupationStudent_studyPlace: Yup.string()
    .max(255)
    .label('Where do you study'),
  mentee_occupationStudent_studyName: Yup.string()
    .max(255)
    .label('What do you study'),
  mentee_occupationLookingForJob_what: Yup.string()
    .max(255)
    .label('What kind of job'),
  mentee_occupationOther_description: Yup.string()
    .max(255)
    .label('What are you currently doing'),
  mentee_highestEducationLevel: Yup.string()
    .oneOf(educationLevels.map(level => level.id))
    .label('Highest Education Level'),
  mentee_currentlyEnrolledInCourse: Yup.string().when('formType', {
    is: 'public-sign-up-mentee-pending-review',
    then: Yup.string()
      .required()
      .oneOf(courses.map(level => level.id))
      .label('Currently enrolled in course'),
  }),
});

const styles = (theme: any) => ({
  margin: {
    margin: '6px 0',
  },
});

export const Comp = (
  props: FormikProps<SignUpFormValues> & { type: SignUpFormType } & {
    classes: any;
  }
) => {
  const {
    values: {
      mentor_occupation,
      mentor_workPlace,
      mentee_occupationCategoryId,
      mentee_occupationJob_placeOfEmployment,
      mentee_occupationJob_position,
      mentee_occupationStudent_studyPlace,
      mentee_occupationStudent_studyName,
      mentee_occupationLookingForJob_what,
      mentee_occupationOther_description,
      mentee_highestEducationLevel,
      mentee_currentlyEnrolledInCourse,
    },
    errors,
    touched,
    handleChange,
    // isValid,
    setFieldTouched,
    // setFieldValue,
    type,
    classes,
  } = props;

  const change = (name: any, e: any) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <>
      {type === 'public-sign-up-mentee-pending-review' && (
        <p>We would like to know more about what you study.</p>
      )}
      {type === 'public-sign-up-mentor-pending-review' && (
        <p>We would like to know more about your work.</p>
      )}
      {type === 'public-sign-up-mentor-pending-review' && (
        <>
          <TextField
            id="mentor_occupation"
            name="mentor_occupation"
            helperText={
              touched.mentor_occupation ? errors.mentor_occupation : ''
            }
            error={
              touched.mentor_occupation && Boolean(errors.mentor_occupation)
            }
            label="What is your occupation?*"
            value={mentor_occupation}
            onChange={change.bind(null, 'mentor_occupation')}
            fullWidth
            margin="normal"
          />
          <TextField
            id="mentor_workPlace"
            name="mentor_workPlace"
            helperText={touched.mentor_workPlace ? errors.mentor_workPlace : ''}
            error={touched.mentor_workPlace && Boolean(errors.mentor_workPlace)}
            label="What is your work place?"
            value={mentor_workPlace}
            onChange={change.bind(null, 'mentor_workPlace')}
            fullWidth
            margin="normal"
          />
        </>
      )}
      {type === 'public-sign-up-mentee-pending-review' && (
        <>
          <FormControl className={classes.margin} fullWidth>
            <InputLabel htmlFor="mentee_occupationCategoryId">
              What is your current occupation?*
            </InputLabel>
            <Select
              value={mentee_occupationCategoryId}
              error={
                touched.mentee_occupationCategoryId &&
                Boolean(errors.mentee_occupationCategoryId)
              }
              onChange={change.bind(null, 'mentee_occupationCategoryId')}
              inputProps={{
                name: 'mentee_occupationCategoryId',
                id: 'mentee_occupationCategoryId',
              }}
            >
              {menteeOccupationCategories.map(cat => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {mentee_occupationCategoryId === 'job' && (
            <>
              <TextField
                id="mentee_occupationJob_placeOfEmployment"
                name="mentee_occupationJob_placeOfEmployment"
                helperText={
                  touched.mentee_occupationJob_placeOfEmployment
                    ? errors.mentee_occupationJob_placeOfEmployment
                    : ''
                }
                error={
                  touched.mentee_occupationJob_placeOfEmployment &&
                  Boolean(errors.mentee_occupationJob_placeOfEmployment)
                }
                label="Where are you employed?"
                value={mentee_occupationJob_placeOfEmployment}
                onChange={change.bind(
                  null,
                  'mentee_occupationJob_placeOfEmployment'
                )}
                fullWidth
                margin="normal"
              />
              <TextField
                id="mentee_occupationJob_position"
                name="mentee_occupationJob_position"
                helperText={
                  touched.mentee_occupationJob_position
                    ? errors.mentee_occupationJob_position
                    : ''
                }
                error={
                  touched.mentee_occupationJob_position &&
                  Boolean(errors.mentee_occupationJob_position)
                }
                label="What is your position?"
                value={mentee_occupationJob_position}
                onChange={change.bind(null, 'mentee_occupationJob_position')}
                fullWidth
                margin="normal"
              />
            </>
          )}
          {mentee_occupationCategoryId === 'student' && (
            <>
              <TextField
                id="mentee_occupationStudent_studyPlace"
                name="mentee_occupationStudent_studyPlace"
                helperText={
                  touched.mentee_occupationStudent_studyPlace
                    ? errors.mentee_occupationStudent_studyPlace
                    : ''
                }
                error={
                  touched.mentee_occupationStudent_studyPlace &&
                  Boolean(errors.mentee_occupationStudent_studyPlace)
                }
                label="At what university do you study?"
                value={mentee_occupationStudent_studyPlace}
                onChange={change.bind(
                  null,
                  'mentee_occupationStudent_studyPlace'
                )}
                fullWidth
                margin="normal"
              />
              <TextField
                id="mentee_occupationStudent_studyName"
                name="mentee_occupationStudent_studyName"
                helperText={
                  touched.mentee_occupationStudent_studyName
                    ? errors.mentee_occupationStudent_studyName
                    : ''
                }
                error={
                  touched.mentee_occupationStudent_studyName &&
                  Boolean(errors.mentee_occupationStudent_studyName)
                }
                label="What do you study?"
                value={mentee_occupationStudent_studyName}
                onChange={change.bind(
                  null,
                  'mentee_occupationStudent_studyName'
                )}
                fullWidth
                margin="normal"
              />
            </>
          )}
          {mentee_occupationCategoryId === 'lookingForJob' && (
            <TextField
              id="mentee_occupationLookingForJob_what"
              name="mentee_occupationLookingForJob_what"
              helperText={
                touched.mentee_occupationLookingForJob_what
                  ? errors.mentee_occupationLookingForJob_what
                  : ''
              }
              error={
                touched.mentee_occupationLookingForJob_what &&
                Boolean(errors.mentee_occupationLookingForJob_what)
              }
              label="What kind of job?"
              value={mentee_occupationLookingForJob_what}
              onChange={change.bind(
                null,
                'mentee_occupationLookingForJob_what'
              )}
              fullWidth
              margin="normal"
            />
          )}
          {mentee_occupationCategoryId === 'other' && (
            <TextField
              id="mentee_occupationOther_description"
              name="mentee_occupationOther_description"
              helperText={
                touched.mentee_occupationOther_description
                  ? errors.mentee_occupationOther_description
                  : ''
              }
              error={
                touched.mentee_occupationOther_description &&
                Boolean(errors.mentee_occupationOther_description)
              }
              label="What are you currently doing?"
              value={mentee_occupationOther_description}
              onChange={change.bind(null, 'mentee_occupationOther_description')}
              fullWidth
              margin="normal"
            />
          )}
          <FormControl className={classes.margin} fullWidth>
            <InputLabel htmlFor="mentee_highestEducationLevel">
              What is your highest Education Level?
            </InputLabel>
            <Select
              value={mentee_highestEducationLevel}
              error={
                touched.mentee_highestEducationLevel &&
                Boolean(errors.mentee_highestEducationLevel)
              }
              onChange={change.bind(null, 'mentee_highestEducationLevel')}
              inputProps={{
                name: 'mentee_highestEducationLevel',
                id: 'mentee_highestEducationLevel',
              }}
            >
              {educationLevels.map(mentee_highestEducationLevel => (
                <MenuItem
                  key={mentee_highestEducationLevel.id}
                  value={mentee_highestEducationLevel.id}
                >
                  {mentee_highestEducationLevel.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.margin} fullWidth>
            <InputLabel htmlFor="mentee_currentlyEnrolledInCourse">
              Which course are you taking at ReDI?*
            </InputLabel>
            <Select
              value={mentee_currentlyEnrolledInCourse}
              error={
                touched.mentee_currentlyEnrolledInCourse &&
                Boolean(errors.mentee_currentlyEnrolledInCourse)
              }
              onChange={change.bind(null, 'mentee_currentlyEnrolledInCourse')}
              inputProps={{
                name: 'mentee_currentlyEnrolledInCourse',
                id: 'mentee_currentlyEnrolledInCourse',
              }}
            >
              {courses.map(course => (
                <MenuItem key={course.id} value={course.id}>
                  {course.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
    </>
  );
};

export const Step2Background = withStyles(styles)(Comp);
