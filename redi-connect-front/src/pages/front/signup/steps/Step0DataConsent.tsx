import React from 'react';
import * as Yup from 'yup';
import {
  FormControlLabel,
  Checkbox,
  createStyles,
  withStyles,
  Theme,
} from '@material-ui/core';
import { SignUpFormType, SignUpFormValues } from '../factory';
import { FormikProps } from 'formik';

export const validationSchema = Yup.object({
  gaveGdprConsentAt: Yup.string()
    .required()
    .label('Data usage consent'),
});

const styles = (theme: Theme) =>
  createStyles({
    paragraph: {
      fontWeight: 300,
    },
    paragraphBelowSubheader: {
      marginTop: '0.3em',
      fontWeight: 300,
    },
    subHeader: {
      marginBottom: 0,
    },
    error: {
      backgroundColor: theme.palette.error.main,
    },
  });

interface Props {
  classes: {
    paragraph: string;
    paragraphBelowSubheader: string;
    subHeader: string;
    error: string;
  };
  type: SignUpFormType;
}

export const Step0DataConsent = withStyles(styles)(
  (props: Props & FormikProps<SignUpFormValues>) => {
    const {
      classes,
      type,
      // errors,
      handleChange,
      // isValid,
      setFieldTouched,
    } = props;

    const handleGdprConsentClick = (e: any) => {
      e.persist();
      handleChange(e);
      setFieldTouched('gaveGdprConsentAt', true, false);
    };

    return (
      <>
        {type === 'public-sign-up-mentee-pending-review' && (
          <React.Fragment>
            <p>Welcome to ReDI Connect! What is the mentorship program?</p>
            <p>
              We want to help you reach your (career) goals by finding you a
              personal mentor who can give you guidance. We invite professionals
              that are working in the IT sector or in other companies in Berlin
              to register at ReDI Connect in order to share their knowledge &
              experience with you. You get personal & career advice, learning
              from people with more work experience, build personal &
              professional network, help with orientation in the job market,
              support with your courses. You have to attend at least 5 meetings
              minimum of 1 hour per month (or as discussed with your mentor).{' '}
            </p>
            <p>So let’s get started in matching you with the right mentor!</p>
            <p>
              You can now fill out your profile, we will guide you through the
              process.{' '}
            </p>
            <p>
              Once you have filled out your profile you will receive profiles of
              available mentors. You can apply by writing the mentors a short
              message. Be creative, introduce yourself in 1-5 sentences.
            </p>
            <p>
              Please write us an email if you encounter any problems while
              filling out your profile:{' '}
              <a href="mailto:Career@redi-school.org">Career@redi-school.org</a>
            </p>
            <p>Your Career Support Team</p>
            <p>
              First we just need to make sure you understand how we'd like to
              use your data. Please read the below:
            </p>
            <h2>Data protection</h2>
            <p className={classes.paragraph}>
              We are delighted that you have shown interest in our organization
              and the ReDI Connect platform. Data protection is a particularly
              high priority for the management of ReDI School of Digital
              Integration. In order for ReDI School to effectively manage you as
              a student in our organization, and the ReDI Connect platform, we
              need to collect, process and store your personal information. This
              information may contain your personal data. If the processing of
              personal data is necessary and there is no statutory basis for
              such processing, we generally obtain consent from the data
              subject.
            </p>
            <p className={classes.paragraph}>
              The processing of personal data, such as name, email address, or
              telephone number of a data subject, shall always be in line with
              the General Data Protection Regulation (GDPR). Confidentiality
              will be respected and appropriate security measures will be taken
              to prevent unauthorized disclosure. By means of this data
              protection declaration, our organization would like to inform the
              general public of the nature, scope, term, and purpose of the
              personal data we collect, use and process. Furthermore, data
              subjects are informed, by means of this data protection
              declaration, of the rights to which they are entitled. 
            </p>
            <p className={classes.paragraph}>
              As the controller, ReDI School has implemented numerous technical
              and organizational measures to ensure the most complete protection
              of personal data processed through this website. However,
              Internet-based data transmissions may in principle have security
              gaps, so absolute protection may not be guaranteed. For this
              reason, every data subject is free to transfer personal data to us
              via alternative means, e.g. by telephone.
            </p>
            <p className={classes.paragraph}>
              For definitions and more information see our data protection
              policy under www.redi-school.org/data-privacy-policy.For
              definitions and more information see our data protection policy
              under 
              <a
                href="http://www.redi-school.org/data-privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.redi-school.org/data-privacy-policy
              </a>
              .
            </p>
            <h4 className={classes.subHeader}>
              Permission to collect, process and store your data
            </h4>
            <p className={classes.paragraphBelowSubheader}>
              The personal data collected via your various interactions with
              ReDI Connect will only be used for administrative purposes. These
              include education, research and support services, alumni
              relations, public relations, security, attendance tracking, and
              crime prevention.
            </p>
            <p className={classes.paragraph}>
              Wherever possible, ReDI School commits to anonymizing data to
              further ensure the protection of our mentors, students,
              volunteers, partners, and employees.
            </p>
            <p className={classes.paragraph}>
              ReDI School will not disclose personal data to third parties
              without specific and prior consent, unless required to by law.
            </p>
            <p className={classes.paragraph}>
              By consenting you agree to the fact that ReDI Connect will
              randomly monitor some profiles for the ongoing improvement of
              features within the platform.
            </p>
            <h4 className={classes.subHeader}>
              Where will your data be stored?
            </h4>
            <p className={classes.paragraphBelowSubheader}>
              Your data will be stored in a restricted access database,
              accessible by the ReDI Data Controller or authorized ReDI staff
              and subcontractors only. Beyond your active student activity in
              ReDI, your data may continue to be securely and anonymously, or
              via alias, stored for archival purposes.
            </p>
          </React.Fragment>
        )}

        {type === 'public-sign-up-mentor-pending-review' && (
          <React.Fragment>
            <p>Hi!</p>
            <p>
              Welcome to the ReDI School of Digital Integration and thank you
              for registering as a mentor at ReDI Connect. At ReDI we believe
              that integration starts with the simple word "Hello". So: Hello!
              With the mentorship program we want to connect our students with
              you as mentors because we think finding an answer to a question is
              easier with a counterpart than alone. Our students can benefit
              from your experience, your network, your knowledge and you are
              able to share your knowledge with new talents, maybe get new
              ideas, look at things from a different perspective or simply meet
              a great person!
            </p>
            <p>
              Once you have filled out your profile you will be visible to
              students and you can receive applications. Please review any
              applications you receive and accept those you think you are ReDI
              to take on!
            </p>
            <p>
              First we just need to make sure you understand how we'd like to
              use your data. Please read the below:
            </p>
            <h2>Data protection</h2>
            <p className={classes.paragraph}>
              We are delighted that you have shown interest in our organization
              and the ReDI Connect platform. Data protection is a particularly
              high priority for the management of ReDI School of Digital
              Integration. In order for ReDI School to effectively manage you as
              a mentor in our organization, and the ReDI Connect platform, we
              need to collect, process and store your personal information. This
              information may contain your personal data. If the processing of
              personal data is necessary and there is no statutory basis for
              such processing, we generally obtain consent from the data
              subject.
            </p>
            <p className={classes.paragraph}>
              The processing of personal data, such as name, email address, or
              telephone number of a data subject, shall always be in line with
              the General Data Protection Regulation (GDPR). Confidentiality
              will be respected and appropriate security measures will be taken
              to prevent unauthorized disclosure. By means of this data
              protection declaration, our organization would like to inform the
              general public of the nature, scope, term, and purpose of the
              personal data we collect, use and process. Furthermore, data
              subjects are informed, by means of this data protection
              declaration, of the rights to which they are entitled.
            </p>
            <p className={classes.paragraph}>
              As the controller, ReDI School has implemented numerous technical
              and organizational measures to ensure the most complete protection
              of personal data processed through this website. However,
              Internet-based data transmissions may in principle have security
              gaps, so absolute protection may not be guaranteed. For this
              reason, every data subject is free to transfer personal data to us
              via alternative means, e.g. by telephone.
            </p>
            <p className={classes.paragraph}>
              For definitions and more information see our data protection
              policy under 
              <a
                href="http://www.redi-school.org/data-privacy-policy."
                target="_blank"
                rel="noopener noreferrer"
              >
                www.redi-school.org/data-privacy-policy
              </a>
              .
            </p>
            <h4 className={classes.subHeader}>
              Permission to collect, process and store your data
            </h4>
            <p className={classes.paragraphBelowSubheader}>
              The personal data collected via your various interactions with
              ReDI Connect will only be used for administrative purposes. These
              include education, research and support services, alumni
              relations, public relations, security, attendance tracking, and
              crime prevention.
            </p>
            <p className={classes.paragraph}>
              Wherever possible, ReDI School commits to anonymizing data to
              further ensure the protection of our mentors, students,
              volunteers, partners, and employees.
            </p>
            <p className={classes.paragraph}>
              ReDI School will not disclose personal data to third parties
              without specific and prior consent, unless required to by law.
            </p>
            <p className={classes.paragraph}>
              By consenting you agree to the fact that ReDI Connect will
              randomly monitor some profiles for the ongoing improvement of
              features within the platform.
            </p>
            <h4 className={classes.subHeader}>
              Where will your data be stored?
            </h4>
            <p className={classes.paragraphBelowSubheader}>
              Your data will be stored in a restricted access database,
              accessible by the ReDI Data Controller or authorized ReDI staff
              and subcontractors only. Beyond your active mentor activity in
              ReDI, your data may continue to be securely and anonymously, or
              via alias, stored for archival purposes.
            </p>
          </React.Fragment>
        )}

        <FormControlLabel
          label="I understand how my data will be used and consent to it"
          control={
            <Checkbox
              id="gaveGdprConsentAt"
              name="gaveGdprConsentAt"
              value={new Date().toString()}
              onChange={e => {
                handleGdprConsentClick(e);
              }}
            />
          }
        />
      </>
    );
  }
);
