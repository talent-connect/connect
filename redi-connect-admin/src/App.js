import React from 'react';
import logo from './logo.svg';
import './App.css';
import { get, mapValues, keyBy } from 'lodash';
import {
  Admin,
  Resource,
  List,
  Create,
  Filter,
  Datagrid,
  TextField,
  ReferenceInput,
  AutocompleteInput,
  DateField,
  TextInput,
  BooleanInput,
  NumberField,
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

import loopbackClient, { authProvider } from './lib/react-admin-loopback/src';
import { ApproveButton } from './components/ApproveButton';
import { DeclineButton } from './components/DeclineButton';

import { API_URL } from './config';

/** REFERENCE DATA */

const categories = [
  { id: 'blockchain', label: 'Blockchain', colour: '#db8484' },
  { id: 'basicComputer', label: 'Basic Computer', colour: '#9a5454' },
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
  { id: 'freelancing', label: 'Freelancing', colour: '#91549a' },
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

const RedProfileList = props => (
  <List {...props} filters={<RedProfileListFilters />}>
    <Datagrid>
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="userType" />
      <BooleanField source="userActivated" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);
const RedProfileListFilters = props => (
  <Filter {...props}>
    <TextInput label="Search by name" source="q" />
  </Filter>
);
const RedProfileShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
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
      <TextField source="contactEmail" />
      <TextField source="linkedInProfileUrl" />
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
    <SimpleForm>
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
      <TextInput source="slackUsername" />
      <TextInput source="telephoneNumber" />
      <SelectArrayInput
        source="categories"
        choices={categories.map(({ id, label }) => ({ id, name: label }))}
      />
    </SimpleForm>
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
  <List {...props} sort={{ field: 'createdAt', order: 'DESC' }}>
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
    </SimpleShowLayout>
  </Show>
);
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
  <List {...props} exporter={exporter}>
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
  console.log(verb, resource, params);
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
