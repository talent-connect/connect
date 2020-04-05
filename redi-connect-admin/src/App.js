import React, { useEffect, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import { get, mapValues, keyBy } from 'lodash';
import {
  Admin,
  Resource,
  List,
  Tab,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  Create,
  Pagination,
  Filter,
  Datagrid,
  TabbedForm,
  TabbedShowLayout,
  TextField,
  ReferenceInput,
  AutocompleteInput,
  DateField,
  TextInput,
  BooleanInput,
  NumberField,
  Query,
  SelectField,
  FormTab,
  NumberInput,
  Show,
  ShowButton,
  LongTextInput,
  CardActions,
  DateInput,
  EditButton,
  SelectInput,
  Edit,
  SimpleForm,
  ArrayField,
  BooleanField,
  SimpleShowLayout,
  SelectArrayInput,
  downloadCSV,
  ReferenceField,
  ReferenceManyField,
} from 'react-admin';
import classNames from 'classnames';
import { unparse as convertToCSV } from 'papaparse/papaparse.min';
import { createStyles, withStyles } from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import loopbackClient, { authProvider } from './lib/react-admin-loopback/src';
import { ApproveButton } from './components/ApproveButton';
import { DeclineButton } from './components/DeclineButton';

import { API_URL } from './config';

/** REFERENCE DATA */

const rediLocations = [
  { id: 'berlin', label: 'Berlin' },
  { id: 'munich', label: 'Munich' },
];

const categories = [
  { id: 'blockchain', label: 'Blockchain', colour: '#db8484' },
  { id: 'basicComputer', label: 'Basic Computer', colour: '#9a5454' },
  { id: 'basicJava', label: 'Basic Java', colour: '#9a5454' },
  { id: 'basicPython', label: 'Basic Python', colour: '#9a5454' },
  { id: 'react', label: 'React', colour: '#c984db' },
  { id: 'itAndNetworking', label: 'IT & Networking', colour: '#979a54' },
  { id: 'swift', label: 'Swift', colour: '#84b2db' },
  {
    id: 'interviewsAndCommunication',
    label: 'Interviews & Communications',
    colour: '#5c9a54',
  },
  { id: 'graphicsAndUxUi', label: 'Graphics & UX/UI', colour: '#84dbca' },
  {
    id: 'cvPersonalPresentation',
    label: 'CV & Personal presentation',
    colour: '#549a7b',
  },
  { id: 'mobileDevelopment', label: 'Mobile Development', colour: '#89db84' },
  { id: 'jobOrientation', label: 'Job Orientation', colour: '#54969a' },
  { id: 'pythonDataScience', label: 'Python Data Science', colour: '#dbd784' },
  { id: 'entrepreneurship', label: 'Entrepreneurship', colour: '#547b9a' },
  { id: 'javaDevelopment', label: 'Java Development', colour: '#db9c84' },
  { id: 'iot', label: 'IoT', colour: '#57549a' },
  { id: 'webDevelopment', label: 'Web Development', colour: '#8484db' },
  { id: 'javascript', label: 'JavaScript', colour: '#8484db' },
  { id: 'htmlcss', label: 'HTML&CSS', colour: '#8484db' },
  {
    id: 'findingInternship',
    label: 'Finding an internship',
    colour: '#91549a',
  },
  { id: 'freelancing', label: 'Freelancing', colour: '#91549a' },
  { id: 'salesforce', label: 'Salesforce', colour: '#91549a' },
  { id: 'dontKnowYet', label: "I don't know yet", colour: '#bbbbbb' },
];

const mentoringSessionDurationOptions = [
  15,
  30,
  45,
  60,
  75,
  90,
  105,
  120,
  135,
  150,
  165,
  180,
];

const categoriesIdToLabelMap = mapValues(keyBy(categories, 'id'), 'label');
const AWS_PROFILE_AVATARS_BUCKET_BASE_URL =
  'https://s3-eu-west-1.amazonaws.com/redi-connect-profile-avatars/';

/** START OF SHARED STUFF */

const RecordCreatedAt = props => <DateField source="createdAt" {...props} />;
RecordCreatedAt.defaultProps = {
  addLabel: true,
  label: 'Record created at',
};

const RecordUpdatedAt = props => <DateField source="updatedAt" {...props} />;
RecordUpdatedAt.defaultProps = {
  addLabel: true,
  label: 'Record updated at',
};

const LangaugeList = props => {
  return <span>{Object.values(props.data).join(', ')}</span>;
};

const CategoryList = props => {
  return (
    <span>
      {Object.values(props.data)
        .map(catId => categoriesIdToLabelMap[catId])
        .join(', ')}
    </span>
  );
};

const styles = createStyles({
  avatarImage: {
    width: '500px',
    height: '500px',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
});

const Avatar = withStyles(styles)(({ record, className, classes, style }) => (
  <>
    {!record && (
      <PersonIcon
        className={classNames(classes.avatarImage, className)}
        color="primary"
      />
    )}
    {record && record.profileAvatarImageS3Key && (
      <div
        id="yalla"
        style={{
          backgroundImage: `url(${AWS_PROFILE_AVATARS_BUCKET_BASE_URL +
            record.profileAvatarImageS3Key})`,
          ...style,
        }}
        className={classNames(classes.avatarImage, className)}
      />
    )}
  </>
));

/** END OF SHARED STUFF */
const AllModelsPagination = props => (
  <Pagination
    rowsPerPageOptions={[10, 25, 50, 100, 250, 500, 1000]}
    {...props}
  />
);

const RedProfileList = props => {
  return (
    <List
      {...props}
      filters={<RedProfileListFilters />}
      pagination={<AllModelsPagination />}
    >
      <Datagrid expand={<RedProfileListExpandPane />}>
        <TextField source="rediLocation" label="City" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="userType" />
        <TextField source="currentMenteeCount" label="Current mentee count" />
        <TextField source="menteeCountCapacity" label="Total mentee capacity" />
        <BooleanField source="userActivated" />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};
const RedProfileListExpandPane = props => {
  return (
    <Show {...props} title="">
      <SimpleShowLayout>
        <ArrayField source="categories">
          <CategoryList />
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  );
};
const RedProfileListFilters = props => (
  <Filter {...props}>
    <TextInput label="Search by name" source="q" />
    <SelectInput
      source="categories"
      choices={categories.map(({ id, label }) => ({ id, name: label }))}
    />
    <SelectInput
      source="userType"
      choices={[
        { id: 'mentor', name: 'mentor' },
        { id: 'mentee', name: 'mentee' },
        {
          id: 'public-sign-up-mentor-pending-review',
          name: 'Mentor pending review (signed up via public sign-up form)',
        },
        {
          id: 'public-sign-up-mentee-pending-review',
          name: 'Mentee pending review (signed up via public sign-up form)',
        },
        { id: 'public-sign-up-mentor-rejected', name: 'Rejected mentor' },
        { id: 'public-sign-up-mentee-rejected', name: 'Rejected mentee' },
      ]}
    />
    <SelectInput
      source="rediLocation"
      choices={rediLocations.map(({ id, label }) => ({ id, name: label }))}
    />
  </Filter>
);
const RedProfileShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TabbedShowLayout>
        <Tab label="Profile">
          <TextField source="rediLocation" label="ReDI City" />
          <TextField source="userType" />
          <BooleanField source="userActivated" />
          <Avatar />
          <TextField source="firstName" />
          <TextField source="lastName" />
          <TextField source="gender" />
          <NumberField source="age" />
          <ArrayField source="languages">
            <LangaugeList />
          </ArrayField>
          <TextField source="otherLanguages" />
          <TextField source="personalDescription" />
          <TextField source="expectations" />
          <TextField source="contactEmail" />
          <TextField source="linkedInProfileUrl" />
          <TextField source="githubProfileUrl" />
          <TextField source="slackUsername" />
          <TextField source="telephoneNumber" />

          <ArrayField source="categories">
            <CategoryList />
          </ArrayField>
          <ReferenceManyField
            label="Mentees (applied/accepted/completed/cancelled)"
            reference="redMatches"
            target="mentorId"
          >
            <Datagrid>
              <FullName sourcePrefix="mentee." />
              <TextField source="status" />
            </Datagrid>
          </ReferenceManyField>
          <ReferenceManyField
            label="Mentors (applied/accepted/completed/cancelled)"
            reference="redMatches"
            target="menteeId"
          >
            <Datagrid>
              <FullName sourcePrefix="mentor." />
              <TextField source="status" />
            </Datagrid>
          </ReferenceManyField>
          <h4>Mentor-specific fields:</h4>
          <TextField source="mentor_occupation" label="Occupation" />
          <TextField source="mentor_workPlace" label="Place of work" />
          <NumberField
            source="menteeCountCapacity"
            label="Total mentee count capacity"
          />
          <h4>Mentee-specific fields:</h4>
          <TextField
            source="mentee_occupationCategoryId"
            label="Type of occupation"
          />
          <TextField
            source="mentee_occupationJob_placeOfEmployment"
            label="If occupation = job, place of employment"
          />
          <TextField
            source="mentee_occupationJob_position"
            label="If occupation = job, position"
          />
          <TextField
            source="mentee_occupationStudent_studyPlace"
            label="If occupation = student, place of study"
          />
          <TextField
            source="mentee_occupationStudent_studyName"
            label="If occupation = student, name of study"
          />
          <TextField
            source="mentee_occupationLookingForJob_what"
            label="If occupation = looking for a job, description of what"
          />
          <TextField
            source="mentee_occupationOther_description"
            label="If occupation = other, description of what"
          />
          <TextField
            source="mentee_highestEducationLevel"
            label="Highest education level"
          />
          <TextField
            source="mentee_currentlyEnrolledInCourse"
            label="Currently enrolled in which course"
          />
          <h4>Record information</h4>
          <RecordCreatedAt />
          <RecordUpdatedAt />
          <h4>
            Typeform information (for mentors/mentees originally signed up via
            typeform)
          </h4>
          <TextField
            source="mentor_ifTypeForm_submittedAt"
            label="Typeform: submitted at"
          />
          <TextField source="mentee_ifTypeForm_additionalComments" />
          <TextField
            source="ifTypeForm_additionalComments"
            label="Typeform: additional comments"
          />
        </Tab>
        <Tab label="Internal comments">
          <p>
            <em>
              The following fields are only visible to ReDI Connect
              administrators, i.e. mostly Eric, Isabelle and Timothy who use the
              cloud-accounts@redi-school.org user. Distinct admin users is
              planned.
            </em>
          </p>
          <TextField
            source="administratorInternalComment"
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </Tab>
      </TabbedShowLayout>
    </SimpleShowLayout>
  </Show>
);

const RedProfileEditActions = props => {
  const userType = props && props.data && props.data.userType;
  if (
    ![
      'public-sign-up-mentor-pending-review',
      'public-sign-up-mentee-pending-review',
    ].includes(userType)
  )
    return null;
  return (
    <CardActions>
      User is pending. Please
      <ApproveButton {...props} /> or
      <DeclineButton {...props} />
    </CardActions>
  );
};

const RedProfileEdit = props => (
  <Edit {...props} actions={<RedProfileEditActions />}>
    <TabbedForm>
      <FormTab label="Profile">
        <SelectInput
          source="rediLocation"
          label="ReDI City"
          choices={rediLocations.map(({ id, label }) => ({ id, name: label }))}
        />
        <TextField source="userType" />
        <BooleanInput source="userActivated" />
        <TextInput
          source="profileAvatarImageS3Key"
          label="Photo file name"
          helperText="Empty this field to clear the user's photo"
        />
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <SelectInput
          source="gender"
          choices={[
            { id: 'male', name: 'Male' },
            { id: 'female', name: 'Female' },
            { id: 'other', name: 'Other' },
            { id: '', name: 'Prefers not to answer' },
          ]}
        />
        <NumberField source="age" />
        <SelectArrayInput
          source="languages"
          choices={[
            { id: 'English', name: 'English' },
            { id: 'German', name: 'German' },
            { id: 'Arabic', name: 'Arabic' },
            { id: 'Farsi', name: 'Farsi' },
            { id: 'Tigrinya', name: 'Tigrinya' },
          ]}
        />
        <TextInput source="otherLanguages" />
        <TextInput source="personalDescription" multiline />
        <TextInput source="expectations" multiline />
        <TextInput source="contactEmail" />
        <TextInput source="linkedInProfileUrl" />
        <TextInput source="githubProfileUrl" />
        <TextInput source="slackUsername" />
        <TextInput source="telephoneNumber" />
        <SelectArrayInput
          source="categories"
          choices={categories.map(({ id, label }) => ({ id, name: label }))}
        />
        <NumberInput source="menteeCountCapacity" />
      </FormTab>
      <FormTab label="Internal comments">
        <p>
          <em>
            The following fields are only visible to ReDI Connect
            administrators, i.e. mostly Eric, Isabelle and Timothy who use the
            cloud-accounts@redi-school.org user. Distinct admin users is
            planned.
          </em>
        </p>
        <LongTextInput source="administratorInternalComment" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

const FullName = ({ record, sourcePrefix }) => {
  return (
    <span>
      {get(record, `${sourcePrefix}firstName`)}{' '}
      {get(record, `${sourcePrefix}lastName`)}
    </span>
  );
};
FullName.defaultProps = {
  sourcePrefix: '',
  label: 'Full name',
};

const RedMatchList = props => (
  <List
    {...props}
    sort={{ field: 'createdAt', order: 'DESC' }}
    pagination={<AllModelsPagination />}
    filters={<RedMatchListFilters />}
  >
    <Datagrid>
      <DateField source="createdAt" label="Record created at" />
      <ReferenceField label="Mentee" source="menteeId" reference="redProfiles">
        <FullName source="mentee" />
      </ReferenceField>
      <ReferenceField label="Mentor" source="mentorId" reference="redProfiles">
        <FullName source="mentor" />
      </ReferenceField>
      <TextField source="status" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);
const RedMatchListFilters = props => (
  <Filter {...props}>
    <SelectInput
      source="status"
      choices={[
        { id: 'accepted', name: 'Accepted' },
        { id: 'completed', name: 'Completed' },
        { id: 'cancelled', name: 'Cancelled' },
        { id: 'applied', name: 'Applied' },
        {
          id: 'invalidated-as-other-mentor-accepted',
          name: 'Invalidated due to other mentor accepting',
        },
      ]}
    />
  </Filter>
);
const RedMatchShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="status" />
      <ReferenceField label="Mentee" source="menteeId" reference="redProfiles">
        <FullName source="mentee" />
      </ReferenceField>
      <ReferenceField label="Mentor" source="mentorId" reference="redProfiles">
        <FullName source="mentor" />
      </ReferenceField>

      <TextField
        source="applicationText"
        label="Application text"
        helperText="Field contains the text that a mentee as an application to a mentor when asking for mentorship."
      />
      <TextField
        source="matchMadeActiveOn"
        label="If match is/was active, when was it made active?"
      />
      <RecordCreatedAt />
      <RecordUpdatedAt />
      <RedMatchShow_RelatedMentoringSessions />
    </SimpleShowLayout>
  </Show>
);
const RedMatchShow_RelatedMentoringSessions = ({
  record: { mentorId, menteeId },
}) => {
  const [mentoringSessions, setMentoringSessions] = React.useState([]);
  useEffect(() => {
    dataProvider('GET_LIST', 'redMentoringSessions', {
      pagination: { page: 1, perPage: 0 },
      sort: { field: 'date', order: 'ASC' },
      filter: { mentorId, menteeId },
    }).then(({ data }) => setMentoringSessions(data));
  }, []);
  const totalDuration = mentoringSessions.reduce(
    (acc, curr) => acc + curr.minuteDuration,
    0
  );
  return (
    mentoringSessions &&
    mentoringSessions.length > 0 && (
      <>
        <h3>Mentoring sessions registered</h3>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Duration in minutes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mentoringSessions.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="right">
                    {new Date(row.date).toLocaleDateString('de-DE')}
                  </TableCell>
                  <TableCell align="right">{row.minuteDuration}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">
                  <strong>Total</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>{totalDuration}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </>
    )
  );
};
const RedMatchCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <SelectInput
        source="status"
        choices={[
          { id: 'applied', name: 'Applied' },
          { id: 'accepted', name: 'Accepted' },
          { id: 'completed', name: 'Completed' },
          { id: 'cancelled', name: 'Cancelled' },
        ]}
      />
      <ReferenceInput
        label="Mentor"
        source="mentorId"
        reference="redProfiles"
        perPage={0}
        filter={{ userType: 'mentor' }}
      >
        <AutocompleteInput
          optionText={op => `${op.firstName} ${op.lastName}`}
        />
      </ReferenceInput>
      <ReferenceInput
        label="Mentee"
        source="menteeId"
        reference="redProfiles"
        perPage={0}
        filter={{ userType: 'mentee' }}
      >
        <AutocompleteInput
          optionText={op => `${op.firstName} ${op.lastName}`}
        />
      </ReferenceInput>
      <LongTextInput
        source="applicationText"
        label="Application text"
        helperText="Field contains the text that a mentee as an application to a mentor when asking for mentorship."
      />
      <TextInput
        source="matchMadeActiveOn"
        label="If match is/was active, when was it made active?"
      />
    </SimpleForm>
  </Create>
);
const RedMatchEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <SelectInput
        source="status"
        choices={[
          { id: 'applied', name: 'Applied' },
          { id: 'accepted', name: 'Accepted' },
          { id: 'completed', name: 'Completed' },
          { id: 'cancelled', name: 'Cancelled' },
        ]}
      />
      <ReferenceInput
        label="Mentor"
        source="mentorId"
        reference="redProfiles"
        perPage={0}
        filter={{ userType: 'mentor' }}
      >
        <AutocompleteInput
          optionText={op => `${op.firstName} ${op.lastName}`}
        />
      </ReferenceInput>
      <ReferenceInput
        label="Mentee"
        source="menteeId"
        reference="redProfiles"
        perPage={0}
        filter={{ userType: 'mentee' }}
      >
        <AutocompleteInput
          optionText={op => `${op.firstName} ${op.lastName}`}
        />
      </ReferenceInput>
      <LongTextInput
        source="applicationText"
        label="Application text"
        helperText="Field contains the text that a mentee as an application to a mentor when asking for mentorship."
      />
      <TextInput
        source="matchMadeActiveOn"
        label="If match is/was active, when was it made active?"
      />
    </SimpleForm>
  </Edit>
);

const exporter = async (mentoringSessions, fetchRelatedRecords) => {
  const mentors = await fetchRelatedRecords(
    mentoringSessions,
    'mentorId',
    'redProfiles'
  );
  const mentees = await fetchRelatedRecords(
    mentoringSessions,
    'menteeId',
    'redProfiles'
  );
  const data = mentoringSessions.map(x => {
    const mentor = mentors[x.mentorId];
    const mentee = mentees[x.menteeId];
    if (mentor) {
      x.mentorName = `${mentor.firstName} ${mentor.lastName}`;
    }
    if (mentee) {
      x.menteeName = `${mentee.firstName} ${mentee.lastName}`;
    }
    return x;
  });
  const csv = convertToCSV({
    data,
    fields: [
      'id',
      'date',
      'minuteDuration',
      'mentorName',
      'menteeName',
      'createdAt',
      'updatedAt',
    ],
  });
  downloadCSV(csv, 'yalla');
};

const RedMentoringSessionList = props => (
  <List
    {...props}
    exporter={exporter}
    pagination={<AllModelsPagination />}
    aside={<RedMentoringSessionListAside />}
  >
    <Datagrid>
      <ReferenceField label="Mentee" source="menteeId" reference="redProfiles">
        <FullName source="mentee" />
      </ReferenceField>
      <ReferenceField label="Mentor" source="mentorId" reference="redProfiles">
        <FullName source="mentor" />
      </ReferenceField>
      <DateField source="date" />
      <NumberField source="minuteDuration" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);
const RedMentoringSessionListAside = () => {
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [loadState, setLoadState] = React.useState('pending');
  const [result, setResult] = React.useState(null);
  const [step, setStep] = React.useState(0);
  const increaseStep = React.useCallback(() => setStep(step => step + 1));

  const picker = (getter, setter, label) => (
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="MM/dd/yyyy"
      margin="normal"
      id="date-picker-inline"
      label={label}
      value={getter}
      onChange={setter}
      disabled={result === 'loading'}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />
  );

  const valid = fromDate && toDate && toDate > fromDate;
  const doLoad = React.useCallback(() =>
    (async () => {
      console.log('hello');
      if (valid) {
        setLoadState('loading');
        setStep(0);
        const sessions = await dataProvider(
          'GET_LIST',
          'redMentoringSessions',
          {
            pagination: { page: 1, perPage: 0 },
            sort: {},
            filter: { date: { gte: fromDate, lte: toDate } },
          }
        );
        setLoadState('success');
        setResult(
          sessions.data.reduce((acc, curr) => acc + curr.minuteDuration, 0)
        );
      }
    })()
  );

  return (
    <div style={{ width: 200, margin: '1em' }}>
      <Typography variant="title">Isabelle Calculator</Typography>
      <Typography variant="body1"></Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {picker(fromDate, setFromDate, 'From date')}
        {picker(toDate, setToDate, 'To date')}
      </MuiPickersUtilsProvider>
      <div>
        <Button onClick={doLoad} disabled={!valid && loadState !== 'loading'}>
          Load
        </Button>
      </div>
      <div>
        {loadState === 'success' && step < 10 && (
          <Button onClick={increaseStep}>
            Are you{' '}
            {new Array(step)
              .fill()
              .map(() => 'really')
              .join(' ')}{' '}
            ReDI?
          </Button>
        )}
      </div>
      {step === 10 && (
        <Typography>
          Total: {result} minutes! That's {Math.floor(result / 60)} hours and{' '}
          {result % 60} minutes
        </Typography>
      )}
    </div>
  );
};
const RedMentoringSessionShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="status" />
      <ReferenceField label="Mentee" source="menteeId" reference="redProfiles">
        <FullName source="mentee" />
      </ReferenceField>
      <ReferenceField label="Mentor" source="mentorId" reference="redProfiles">
        <FullName source="mentor" />
      </ReferenceField>
      <TextField label="Date of mentoring session" source="date" />
      <TextField source="minuteDuration" />
      <RecordCreatedAt />
      <RecordUpdatedAt />
    </SimpleShowLayout>
  </Show>
);

const RedMentoringSessionCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput
        label="Mentor"
        source="mentorId"
        reference="redProfiles"
        perPage={0}
        filter={{ userType: 'mentor' }}
      >
        <AutocompleteInput
          optionText={op => `${op.firstName} ${op.lastName}`}
        />
      </ReferenceInput>
      <ReferenceInput
        label="Mentee"
        source="menteeId"
        reference="redProfiles"
        perPage={0}
        filter={{ userType: 'mentee' }}
      >
        <AutocompleteInput
          optionText={op => `${op.firstName} ${op.lastName}`}
        />
      </ReferenceInput>
      <DateInput label="Date of mentoring session" source="date" />
      <SelectInput
        source="minuteDuration"
        choices={mentoringSessionDurationOptions.map(duration => ({
          id: duration,
          name: duration,
        }))}
      />
    </SimpleForm>
  </Create>
);
const RedMentoringSessionEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput
        label="Mentor"
        source="mentorId"
        reference="redProfiles"
        perPage={0}
        filter={{ userType: 'mentor' }}
      >
        <AutocompleteInput
          optionText={op => `${op.firstName} ${op.lastName}`}
        />
      </ReferenceInput>
      <ReferenceInput
        label="Mentee"
        source="menteeId"
        reference="redProfiles"
        perPage={0}
        filter={{ userType: 'mentee' }}
      >
        <AutocompleteInput
          optionText={op => `${op.firstName} ${op.lastName}`}
        />
      </ReferenceInput>
      <DateInput label="Date of mentoring session" source="date" />
      <SelectInput
        source="minuteDuration"
        choices={mentoringSessionDurationOptions.map(duration => ({
          id: duration,
          name: duration,
        }))}
      />
    </SimpleForm>
  </Edit>
);

const buildDataProvider = normalDataProvider => (verb, resource, params) => {
  if (verb === 'GET_LIST' && resource === 'redProfiles') {
    if (params.filter) {
      const filter = params.filter;
      const q = filter.q;
      delete filter.q;
      const newFilter = { and: [filter] };
      if (q) {
        const andConditions = q.split(' ').map(word => ({
          loopbackComputedDoNotSetElsewhere__forAdminSearch__fullName: {
            like: word,
            options: 'i',
          },
        }));
        newFilter.and = [...newFilter.and, ...andConditions];
      }
      params.filter = newFilter;
    }
  }
  return normalDataProvider(verb, resource, params);
};

const dataProvider = buildDataProvider(loopbackClient(API_URL));

function App() {
  return (
    <div className="App">
      <Admin
        dataProvider={dataProvider}
        authProvider={authProvider(`${API_URL}/redUsers/login`)}
      >
        <Resource
          name="redProfiles"
          show={RedProfileShow}
          list={RedProfileList}
          edit={RedProfileEdit}
        />
        <Resource
          name="redMatches"
          show={RedMatchShow}
          list={RedMatchList}
          create={RedMatchCreate}
          edit={RedMatchEdit}
        />
        <Resource
          name="redMentoringSessions"
          show={RedMentoringSessionShow}
          list={RedMentoringSessionList}
          create={RedMentoringSessionCreate}
          edit={RedMentoringSessionEdit}
        />
      </Admin>
    </div>
  );
}

export default App;
