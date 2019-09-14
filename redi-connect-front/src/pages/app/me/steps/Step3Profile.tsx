import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { FormikProps } from 'formik';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { SignUpFormValues, SignUpFormType } from '../Me';
import {
  genders as formGenders,
  Languages as formLanguages,
  API_URL,
  S3_UPLOAD_SIGN_URL,
} from '../../../../config/config';
import { withStyles, Grid } from '@material-ui/core';
import { useLoading } from '../../../../hooks/WithLoading';
import { Avatar } from '../../../../components/Avatar';
const ReactS3Uploader: any = require('react-s3-uploader');

export const validationSchema = Yup.object({
  profileAvatarImageS3Key: Yup.string().max(255),
  firstName: Yup.string()
    .required()
    .max(255),
  lastName: Yup.string()
    .required()
    .max(255),
  gender: Yup.string()
    .oneOf(['male', 'female', 'other'])
    .label('Gender'),
  age: Yup.number()
    .min(16)
    .max(99)
    .label('Age'),
  languages: Yup.array()
    .min(1)
    .of(Yup.string().max(255))
    .label('Languages'),
  personalDescription: Yup.string()
    .required()
    .min(100)
    .max(600)
    .label('Personal description'),
});

const styles = (theme: any) => ({
  margin: {
    margin: '24px 0',
  },
  avatarImageFrame: {
    padding: '10px',
    borderRadius: '4px',
    border: 'solid 2px #58adc4',
  },
  fileUploadLabel: {
    padding: '15px 20px',
    borderRadius: '10px',
    backgroundColor: '#58adc4',
    color: 'white',
    cursor: 'pointer',
    display: 'inline-block',
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  isValid: boolean;
  isSubmitting: boolean;
  setFieldTouched: any;
  setFieldValue: any;
  classes: any;
  type: SignUpFormType;
};
const Comp: any = (props: FormikProps<SignUpFormValues> & Props) => {
  const {
    values: {
      profileAvatarImageS3Key,
      firstName,
      lastName,
      gender,
      age,
      languages,
      otherLanguages,
      personalDescription,
      expectations,
    },
    errors,
    // touched,
    handleChange,
    // isValid,
    isSubmitting,
    setFieldTouched,
    setFieldValue,
    classes,
    type,
  } = props;

  const change = (name: any, e: any) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const handleLanguagesChange = (e: any) => {
    setFieldValue('languages', e.target.value);
    setFieldTouched('languages', true, false);
  };

  const { Loading, setLoading } = useLoading();
  const [uploadInput, setUploadInput] = useState<HTMLInputElement>();
  useEffect(() => {
    if (uploadInput !== undefined) {
      uploadInput.style.width = '0.1px';
      uploadInput.style.height = '0.1px';
      uploadInput.id = 'avatar-upload';
      uploadInput.name = 'avatar-upload';
    }
  }, [uploadInput]);

  // const [uploadError, setUploadError] = useState<string>('');
  const onUploadStart = (file: any, next: any) => {
    setLoading(true);
    next(file);
  };
  const onUploadSuccess = (result: any) => {
    setFieldValue('profileAvatarImageS3Key', result.fileKey);
    setLoading(false);
  };

  return (
    <>
      <div className={classes.margin}>
        <Loading />
        <Typography component="h3" variant="h6">
          Upload your photo
        </Typography>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <div className={classes.avatarImageFrame}>
              <Avatar s3Key={profileAvatarImageS3Key} />
            </div>
          </Grid>
          <Grid item>
            <InputLabel
              className={classes.fileUploadLabel}
              htmlFor="avatar-upload"
            >
              Upload
              <ReactS3Uploader
                signingUrl={S3_UPLOAD_SIGN_URL}
                accept="image/*"
                uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
                preprocess={onUploadStart}
                onSignedUrl={(c: any) => console.log(c)}
                onProgress={(c: any) => {}}
                onError={(c: any) => console.log(c)}
                onFinish={onUploadSuccess}
                contentDisposition="auto"
                inputRef={(cmp: any) => setUploadInput(cmp)}
              />
            </InputLabel>
          </Grid>
        </Grid>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            className={classes.margin}
            id="firstName"
            name="firstName"
            helperText={errors.firstName}
            error={Boolean(errors.firstName)}
            label="First name*"
            value={firstName}
            onChange={change.bind(null, 'firstName')}
            disabled={isSubmitting}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.margin}
            id="lastName"
            name="lastName"
            helperText={errors.lastName}
            error={Boolean(errors.lastName)}
            label="Last name*"
            value={lastName}
            onChange={change.bind(null, 'lastName')}
            disabled={isSubmitting}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
      <FormControl className={classes.margin} fullWidth>
        <InputLabel htmlFor="gender">Gender</InputLabel>
        <Select
          value={gender}
          error={Boolean(errors.gender)}
          onChange={change.bind(null, 'gender')}
          disabled={isSubmitting}
          inputProps={{
            name: 'gender',
            id: 'gender',
          }}
        >
          <MenuItem value="">
            <em>Prefer not to answer</em>
          </MenuItem>
          {formGenders.map(gender => (
            <MenuItem key={gender.id} value={gender.id}>
              {gender.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className={classes.margin}
        id="age"
        name="age"
        type="number"
        helperText={errors.age}
        error={Boolean(errors.age)}
        label="Age?"
        value={age}
        onChange={change.bind(null, 'age')}
        disabled={isSubmitting}
        fullWidth
        margin="normal"
      />
      <FormControl className={classes.margin} fullWidth>
        <InputLabel htmlFor="select-multiple-checkbox">
          Which of these languages do you speak?*
        </InputLabel>
        <Select
          multiple
          value={languages}
          error={Boolean(errors.languages)}
          onChange={handleLanguagesChange}
          disabled={isSubmitting}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={(selected: any) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {formLanguages.map(lang => (
            <MenuItem key={lang} value={lang}>
              <Checkbox checked={languages.includes(lang)} />
              <ListItemText primary={lang} />
            </MenuItem>
          ))}
        </Select>
        {Boolean(errors.languages) && (
          <FormHelperText error={true}>{errors.languages}</FormHelperText>
        )}
      </FormControl>
      <TextField
        className={classes.margin}
        id="otherLanguages"
        name="otherLanguages"
        helperText={errors.otherLanguages}
        error={Boolean(errors.otherLanguages)}
        label="Any other languages?"
        value={otherLanguages}
        onChange={change.bind(null, 'otherLanguages')}
        disabled={isSubmitting}
        fullWidth
        margin="normal"
      />
      <TextField
        className={classes.margin}
        id="expectations"
        name="expectations"
        label={
          type === 'mentee'
            ? 'What do you expect from your mentor?'
            : 'Feel free to share expectations towards your mentees (shown on your profile)'
        }
        error={Boolean(errors.expectations)}
        helperText={errors.expectations}
        value={expectations}
        multiline
        fullWidth
        rows="4"
        onChange={change.bind(null, 'expectations')}
        disabled={isSubmitting}
      />
      <TextField
        className={classes.margin}
        id="personalDescription"
        name="personalDescription"
        label="Tell us a few words about yourself (this will be displayed on your profile)* (100-600 characters)"
        error={Boolean(errors.personalDescription)}
        helperText={errors.personalDescription}
        value={personalDescription}
        multiline
        fullWidth
        rows="4"
        onChange={change.bind(null, 'personalDescription')}
        disabled={isSubmitting}
      />
    </>
  );
};

export const Step3Profile = withStyles(styles)(Comp);
