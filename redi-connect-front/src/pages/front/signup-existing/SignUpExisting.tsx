import React, { useEffect, useState } from 'react';
import { LoggedOutLayout } from '../../../layouts/LoggedOutLayout';
import { RouteComponentProps } from 'react-router';
import { useLoading } from '../../../hooks/WithLoading';
import { saveAccessToken } from '../../../services/auth/auth';
import { fetchSaveRedProfile } from '../../../services/api/api';
import { history } from '../../../services/history/history';
import {
  FormControlLabel,
  Checkbox,
  Button,
  createStyles,
  withStyles,
  Theme,
  Paper,
} from '@material-ui/core';
import { RedProfile } from '../../../types/RedProfile';

interface RouteParams {
  accessToken: string;
}

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
}

const SignUpExisting = withStyles(styles)(
  (props: RouteComponentProps<RouteParams> & Props) => {
    const classes = props.classes;
    const { loading, Loading, setLoading } = useLoading();
    const [consentGiven, setConsentGiven] = useState(false);
    const [profile, setProfile] = useState<RedProfile>();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // TODO: use the profileFetchStart() infrastructure instead to centralize comms
    // and error handling
    useEffect(() => {
      const load = async () => {
        setLoading(true);
        const accessTokenStr = decodeURIComponent(
          props.match.params.accessToken
        );
        let accessToken;
        try {
          accessToken = JSON.parse(accessTokenStr);
          saveAccessToken(accessToken);
        } catch (err) {
          return setErrorMsg(
            'Sorry, this address seems to be invalid. Please contact career@redi-school.org to receive your invite again.'
          );
        }
        try {
          const profile = await fetchSaveRedProfile(accessToken);
          setProfile(profile);
          setLoading(false);
        } catch (err) {
          return setErrorMsg(
            'Sorry, the link you used seems to have expired. Please contact career@redi-school.org to receive a new one.'
          );
        }
      };
      load();
    }, []);

    return (
      <>
        <Loading />
        <LoggedOutLayout>
          {errorMsg && (
            <Paper className={props.classes.error}>
              <p>{errorMsg}</p>
              <p>
                You can also go here{' '}
                <a href="/front/login">to log in if you have a user.</a>
              </p>
            </Paper>
          )}
          {!errorMsg && (
            <p>
              Thanks for coming! Let's activate your user account. First we just
              need to make sure you understand how we'd like to use your data.
              Please read the below:
            </p>
          )}
          {!loading && !errorMsg && (
            <>
              {profile && profile.userType === 'mentee' && (
                <>
                  <h2>Data protection</h2>
                  <p className={classes.paragraph}>
                    We are delighted that you have shown interest in our
                    organization and the ReDI Connect platform. Data protection
                    is a particularly high priority for the management of ReDI
                    School of Digital Integration. In order for ReDI School to
                    effectively manage you as a student in our organization, and
                    the ReDI Connect platform, we need to collect, process and
                    store your personal information. This information may
                    contain your personal data. If the processing of personal
                    data is necessary and there is no statutory basis for such
                    processing, we generally obtain consent from the data
                    subject.
                  </p>
                  <p className={classes.paragraph}>
                    The processing of personal data, such as name, email
                    address, or telephone number of a data subject, shall always
                    be in line with the General Data Protection Regulation
                    (GDPR). Confidentiality will be respected and appropriate
                    security measures will be taken to prevent unauthorized
                    disclosure. By means of this data protection declaration,
                    our organization would like to inform the general public of
                    the nature, scope, term, and purpose of the personal data we
                    collect, use and process. Furthermore, data subjects are
                    informed, by means of this data protection declaration, of
                    the rights to which they are entitled. 
                  </p>
                  <p className={classes.paragraph}>
                    As the controller, ReDI School has implemented numerous
                    technical and organizational measures to ensure the most
                    complete protection of personal data processed through this
                    website. However, Internet-based data transmissions may in
                    principle have security gaps, so absolute protection may not
                    be guaranteed. For this reason, every data subject is free
                    to transfer personal data to us via alternative means, e.g.
                    by telephone.
                  </p>
                  <p className={classes.paragraph}>
                    For definitions and more information see our data protection
                    policy under www.redi-school.org/data-privacy-policy.For
                    definitions and more information see our data protection
                    policy under 
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
                    The personal data collected via your various interactions
                    with ReDI Connect will only be used for administrative
                    purposes. These include education, research and support
                    services, alumni relations, public relations, security,
                    attendance tracking, and crime prevention.
                  </p>
                  <p className={classes.paragraph}>
                    Wherever possible, ReDI School commits to anonymizing data
                    to further ensure the protection of our mentors, students,
                    volunteers, partners, and employees.
                  </p>
                  <p className={classes.paragraph}>
                    ReDI School will not disclose personal data to third parties
                    without specific and prior consent, unless required to by
                    law.
                  </p>
                  <p className={classes.paragraph}>
                    By consenting you agree to the fact that ReDI Connect will
                    randomly monitor some profiles for the ongoing improvement
                    of features within the platform.
                  </p>
                  <h4 className={classes.subHeader}>
                    Where will your data be stored?
                  </h4>
                  <p className={classes.paragraphBelowSubheader}>
                    Your data will be stored in a restricted access database,
                    accessible by the ReDI Data Controller or authorized ReDI
                    staff and subcontractors only. Beyond your active student
                    activity in ReDI, your data may continue to be securely and
                    anonymously, or via alias, stored for archival purposes.
                  </p>
                </>
              )}
              {profile && profile.userType === 'mentor' && (
                <>
                  <h2>Data protection</h2>
                  <p className={classes.paragraph}>
                    We are delighted that you have shown interest in our
                    organization and the ReDI Connect platform. Data protection
                    is a particularly high priority for the management of ReDI
                    School of Digital Integration. In order for ReDI School to
                    effectively manage you as a mentor in our organization, and
                    the ReDI Connect platform, we need to collect, process and
                    store your personal information. This information may
                    contain your personal data. If the processing of personal
                    data is necessary and there is no statutory basis for such
                    processing, we generally obtain consent from the data
                    subject.
                  </p>
                  <p className={classes.paragraph}>
                    The processing of personal data, such as name, email
                    address, or telephone number of a data subject, shall always
                    be in line with the General Data Protection Regulation
                    (GDPR). Confidentiality will be respected and appropriate
                    security measures will be taken to prevent unauthorized
                    disclosure. By means of this data protection declaration,
                    our organization would like to inform the general public of
                    the nature, scope, term, and purpose of the personal data we
                    collect, use and process. Furthermore, data subjects are
                    informed, by means of this data protection declaration, of
                    the rights to which they are entitled.
                  </p>
                  <p className={classes.paragraph}>
                    As the controller, ReDI School has implemented numerous
                    technical and organizational measures to ensure the most
                    complete protection of personal data processed through this
                    website. However, Internet-based data transmissions may in
                    principle have security gaps, so absolute protection may not
                    be guaranteed. For this reason, every data subject is free
                    to transfer personal data to us via alternative means, e.g.
                    by telephone.
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
                    The personal data collected via your various interactions
                    with ReDI Connect will only be used for administrative
                    purposes. These include education, research and support
                    services, alumni relations, public relations, security,
                    attendance tracking, and crime prevention.
                  </p>
                  <p className={classes.paragraph}>
                    Wherever possible, ReDI School commits to anonymizing data
                    to further ensure the protection of our mentors, students,
                    volunteers, partners, and employees.
                  </p>
                  <p className={classes.paragraph}>
                    ReDI School will not disclose personal data to third parties
                    without specific and prior consent, unless required to by
                    law.
                  </p>
                  <p className={classes.paragraph}>
                    By consenting you agree to the fact that ReDI Connect will
                    randomly monitor some profiles for the ongoing improvement
                    of features within the platform.
                  </p>
                  <h4 className={classes.subHeader}>
                    Where will your data be stored?
                  </h4>
                  <p className={classes.paragraphBelowSubheader}>
                    Your data will be stored in a restricted access database,
                    accessible by the ReDI Data Controller or authorized ReDI
                    staff and subcontractors only. Beyond your active mentor
                    activity in ReDI, your data may continue to be securely and
                    anonymously, or via alias, stored for archival purposes.
                  </p>
                </>
              )}

              <FormControlLabel
                label="I understand how my data will be used and consent to it"
                control={
                  <Checkbox
                    id="consentGiven"
                    name="consentGiven"
                    value="true"
                    onChange={e => {
                      setConsentGiven(Boolean(e.target.checked));
                    }}
                  />
                }
              />
              <Button
                onClick={() => {
                  history.push('/app/create-profile/existing-reset-password');
                }}
                color="primary"
                variant="contained"
                fullWidth
                disabled={!consentGiven}
              >
                Next
              </Button>
            </>
          )}
        </LoggedOutLayout>
      </>
    );
  }
);

export default SignUpExisting;
