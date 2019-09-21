import React from 'react';
import * as Yup from 'yup';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { SignUpFormValues, SignUpFormType } from '../factory';
import { FormikProps } from 'formik';
import {
  categories as formCategories,
  menteeCountCapacityOptions,
} from '../../../../config/config';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const validationSchema = Yup.object({
  categories: Yup.array().when('formType', {
    is: 'public-sign-up-mentee-pending-review',
    then: Yup.array()
      .compact(v => v === 'dontKnowYet')
      .min(0)
      .max(3),
  }),
  menteeCountCapacity: Yup.number()
    .required()
    .min(1)
    .max(4),
  agreesWithCodeOfConduct: Yup.boolean()
    .required()
    .oneOf([true]),
});

const styles = (theme: any) => ({
  margin: {
    margin: '24px 0',
  },
});

export const Comp = (
  props: FormikProps<SignUpFormValues> & { type: SignUpFormType } & {
    classes: any;
  }
) => {
  const {
    values: { menteeCountCapacity, categories, agreesWithCodeOfConduct },
    errors,
    touched,
    handleChange,
    isSubmitting,
    setFieldTouched,
    setFieldValue,
    classes,
    type
  } = props;

  const change = (name: any, e: any) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const categoriesChange = (name: any, e: any) => {
    e.persist();
    const value = e.target.value;
    let newCategories;
    if (e.target.checked) {
      newCategories = categories.concat(value);
    } else {
      newCategories = categories.filter(cat => cat !== value);
    }
    setFieldValue('categories', newCategories);
    setFieldTouched(name, true, false);
  };

  return (
    <>
      {type === 'public-sign-up-mentee-pending-review' && (
        <h2>
          Please select all the topics you would like help with from your mentor
          (max 3).
        </h2>
      )}
      {type === 'public-sign-up-mentor-pending-review' && (
        <h2>
          How would you like to support your mentee? Please select the topics
          that apply.
        </h2>
      )}
      <Grid container>
        {formCategories.map(({ id, label }) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={id}>
            <FormControlLabel
              label={label}
              control={
                <Checkbox
                  id={`categories-${id}`}
                  name={`categories-${id}`}
                  checked={categories.includes(id)}
                  value={id}
                  onChange={categoriesChange.bind(null, "categories")}
                  disabled={isSubmitting}
                />
              }
            />
          </Grid>
        ))}
      </Grid>
      {type === 'public-sign-up-mentor-pending-review' && (
        <FormControl className={classes.margin} fullWidth>
          <InputLabel htmlFor="menteeCountCapacity">
            How many mentees would you be willing to mentor this semester?
          </InputLabel>
          <Select
            value={menteeCountCapacity}
            error={
              touched.menteeCountCapacity && Boolean(errors.menteeCountCapacity)
            }
            onChange={change.bind(null, 'menteeCountCapacity')}
            inputProps={{
              name: "menteeCountCapacity",
              id: "menteeCountCapacity"
            }}
          >
            {menteeCountCapacityOptions.map(menteeCountCapacity => (
              <MenuItem key={menteeCountCapacity} value={menteeCountCapacity}>
                {menteeCountCapacity}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <FormControlLabel
        label={
          <label htmlFor="agreesWithCodeOfConduct">
            I agree to follow the{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://connect.redi-school.org/downloadeables/redi-connect-code-of-conduct.pdf"
            >
              ReDI Connect Code of Conduct
            </a>
          </label>
        }
        control={
          <Checkbox
            id="agreesWithCodeOfConduct"
            name="agreesWithCodeOfConduct"
            checked={agreesWithCodeOfConduct}
            value={true}
            onChange={change.bind(null, 'agreesWithCodeOfConduct')}
            disabled={isSubmitting}
          />
        }
      />
    </>
  );
};

export const Step5Categories = withStyles(styles)(Comp);
