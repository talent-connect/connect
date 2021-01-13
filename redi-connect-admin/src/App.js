import React, { useEffect } from 'react';
import './App.css';
import { get, mapValues, keyBy } from 'lodash';
import {
  Admin,
  Resource,
  List,
  Tab,
  Create,
  Pagination,
  Filter,
  Datagrid,
  TabbedForm,
  FunctionField,
  TabbedShowLayout,
  TextField,
  ReferenceInput,
  AutocompleteInput,
  DateField,
  TextInput,
  BooleanInput,
  NumberField,
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
  Labeled,
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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import loopbackClient, { authProvider } from './lib/react-admin-loopback/src';
import { ApproveButton } from './components/ApproveButton';
import { DeclineButton } from './components/DeclineButton';

import { API_URL } from './config';

/** REFERENCE DATA */

const rediLocations = [
  { id: 'berlin', label: 'Berlin' },
  { id: 'munich', label: 'Munich' },
  { id: 'nrw', label: 'NRW' },
];

const languages = [
  'Afrikaans',
  'Albanian',
  'Amharic',
  'Arabic',
  'Aramaic',
  'Armenian',
  'Assamese',
  'Aymara',
  'Azerbaijani',
  'Balochi',
  'Bamanankan',
  'Bashkort (Bashkir)',
  'Basque',
  'Belarusan',
  'Bengali',
  'Bhojpuri',
  'Bislama',
  'Bosnian',
  'Brahui',
  'Bulgarian',
  'Burmese',
  'Cantonese',
  'Catalan',
  'Cebuano',
  'Chechen',
  'Cherokee',
  'Croatian',
  'Czech',
  'Dakota',
  'Danish',
  'Dari',
  'Dholuo',
  'Dutch',
  'English',
  'Esperanto',
  'Estonian',
  'Éwé',
  'Finnish',
  'French',
  'Georgian',
  'German',
  'Gikuyu',
  'Greek',
  'Guarani',
  'Gujarati',
  'Haitian Creole',
  'Hausa',
  'Hawaiian',
  'Hawaiian Creole',
  'Hebrew',
  'Hiligaynon',
  'Hindi',
  'Hungarian',
  'Icelandic',
  'Igbo',
  'Ilocano',
  'Indonesian (Bahasa Indonesia)',
  'Inuit/Inupiaq',
  'Irish Gaelic',
  'Italian',
  'Japanese',
  'Jarai',
  'Javanese',
  'K’iche’',
  'Kabyle',
  'Kannada',
  'Kashmiri',
  'Kazakh',
  'Khmer',
  'Khoekhoe',
  'Korean',
  'Kurdish',
  'Kyrgyz',
  'Lao',
  'Latin',
  'Latvian',
  'Lingala',
  'Lithuanian',
  'Macedonian',
  'Maithili',
  'Malagasy',
  'Malay (Bahasa Melayu)',
  'Malayalam',
  'Mandarin (Chinese)',
  'Marathi',
  'Mende',
  'Mongolian',
  'Nahuatl',
  'Navajo',
  'Nepali',
  'Norwegian',
  'Ojibwa',
  'Oriya',
  'Oromo',
  'Pashto',
  'Persian',
  'Polish',
  'Portuguese',
  'Punjabi',
  'Quechua',
  'Romani',
  'Romanian',
  'Russian',
  'Rwanda',
  'Samoan',
  'Sanskrit',
  'Serbian',
  'Shona',
  'Sindhi',
  'Sinhala',
  'Slovak',
  'Slovene',
  'Somali',
  'Spanish',
  'Swahili',
  'Swedish',
  'Tachelhit',
  'Tagalog',
  'Tajiki',
  'Tamil',
  'Tatar',
  'Telugu',
  'Thai',
  'Tibetic languages',
  'Tigrigna',
  'Tok Pisin',
  'Turkish',
  'Turkmen',
  'Ukrainian',
  'Urdu',
  'Uyghur',
  'Uzbek',
  'Vietnamese',
  'Warlpiri',
  'Welsh',
  'Wolof',
  'Xhosa',
  'Yakut',
  'Yiddish',
  'Yoruba',
  'Yucatec',
  'Zapotec',
  'Zulu',
];

const categoriesByLocation = {
  berlin: [
    { id: 'blockchain', label: 'Blockchain', group: 'coding' },
    { id: 'basicComputer', label: 'Basic Computer', group: 'coding' },
    { id: 'basicJava', label: 'Basic Java', group: 'coding' },
    { id: 'basicPython', label: 'Basic Python', group: 'coding' },
    { id: 'react', label: 'React', group: 'coding' },
    { id: 'itAndNetworking', label: 'IT & Networking', group: 'careerSupport' },
    { id: 'swift', label: 'Swift', group: 'coding' },
    {
      id: 'interviewsAndCommunication',
      label: 'Interviews & Communications',
      group: 'careerSupport',
    },
    { id: 'helpToImproveGerman', label: 'German language skills', group: 'other' },
    { id: 'graphicsAndUxUi', label: 'Graphics & UX/UI', group: 'other' },
    {
      id: 'cvPersonalPresentation',
      label: 'CV & Personal presentation',
      group: 'careerSupport',
    },
    { id: 'mobileDevelopment', label: 'Mobile Development', group: 'coding' },
    { id: 'jobOrientation', label: 'Job Orientation', group: 'careerSupport' },
    { id: 'pythonDataScience', label: 'Python Data Science', group: 'coding' },
    { id: 'entrepreneurship', label: 'Entrepreneurship', group: 'other' },
    { id: 'javaDevelopment', label: 'Java Development', group: 'coding' },
    { id: 'iot', label: 'IoT', group: 'coding' },
    { id: 'webDevelopment', label: 'Web Development', group: 'coding' },
    { id: 'javascript', label: 'JavaScript', group: 'coding' },
    { id: 'htmlcss', label: 'HTML&CSS', group: 'coding' },
    { id: 'findingInternship', label: 'Finding an internship', group: 'careerSupport' },
    { id: 'freelancing', label: 'Freelancing', group: 'other' },
    { id: 'salesforce', label: 'Salesforce', group: 'other' },
    { id: 'dontKnowYet', label: "I don't know yet", group: 'other' },
  ],
  munich: [
    {
      id: 'munich_frontEndDevelopmentHTMLCSS',
      label: 'Front-End Dev with HTML/CSS',
      group: 'coding',
    },
    {
      id: 'munich_frontEndDevelopmentJavaScript',
      label: 'Front-End Dev with JavaScript',
      group: 'coding',
    },
    {
      id: 'munich_softwareDevelopmentBasicJava',
      label: 'Software Dev basic (Java)',
      group: 'coding',
    },
    {
      id: 'munich_softwareDevelopmentIntermediateJava',
      label: 'Software Dev intermediate (Java)',
      group: 'coding',
    },
    { id: 'munich_dataAnalyticsBasic', label: 'Basic Data Analytics', group: 'coding' },
    {
      id: 'munich_dataAnalyticsIntermediate',
      label: 'Intermediate Data Analytics ',
      group: 'coding',
    },
    { id: 'munich_devOps', label: 'DevOps', group: 'coding' },
    { id: 'munich_itAndNetworking', label: 'Networking', group: 'coding' },
    {
      id: 'munich_helpAndGuidanceOnHowToUseAComputer',
      label: 'Basic Computer Skills in English',
      group: 'coding',
    },
    {
      id: 'munich_helpAndGuidanceOnHowToUseAComputer_de',
      label: 'Basic Computer Skills in German',
      group: 'coding',
    },
    {
      id: 'munich_programmingSkillsAndHelpForLearning',
      label: 'Basic programming skills',
      group: 'coding',
    },
    {
      id: 'munich_careerPlanningAndJobOrientation',
      label: 'Career planning & job orientation',
      group: 'careerSupport',
    },
    {
      id: 'munich_helpForCvPreparationAndApplicationProcess',
      label: 'CV preparation & applications',
      group: 'careerSupport',
    },
    {
      id: 'munich_helpForInterviewPreparation',
      label: 'Interview preparation',
      group: 'careerSupport',
    },
    {
      id: 'munich_motivationAndEncouragement',
      label: 'Motivation & encouragement',
      group: 'other',
    },
    { id: 'munich_helpToImproveEnglish', label: 'English language skills', group: 'other' },
    { id: 'munich_helpToImproveGerman', label: 'German language skills', group: 'other' },
    { id: 'munich_freelancing', label: 'Freelancing', group: 'other' },
    { id: 'munich_entrepreneurship', label: 'Entrepreneurship', group: 'other' },
    {
      id: 'munich_beAFriendToHelpInNewAndDifficultSituationsHereInGermany',
      label: 'Be a friend and help',
      group: 'other',
    },
    { id: 'munich_dontKnowYet', label: "I don't know yet", group: 'other' },
  ],
  nrw: [
    { id: 'nrw_userInterfaceDesign', label: 'User Interface Design', group: 'other' },
    { id: 'nrw_userExperienceDesign', label: 'User Experience Design', group: 'other' },
    { id: 'nrw_python', label: 'Python', group: 'coding' },
    { id: 'nrw_dataAnalytics', label: 'Data Analytics ', group: 'coding' },
    { id: 'nrw_machineLearning', label: 'Machine Learning', group: 'coding' },
    { id: 'nrw_HtmlCss', label: 'HTML & CSS', group: 'coding' },
    {
      id: 'nrw_webDevelopmentJavacsript',
      label: 'Web Development with Javascript',
      group: 'coding',
    },
    { id: 'nrw_webDevelopmentReact', label: 'Web Development with React', group: 'coding' },
    { id: 'nrw_basicNetworking', label: 'Basic Networking', group: 'coding' },
    { id: 'nrw_iot', label: 'IoT', group: 'coding' },
    { id: 'nrw_cloud', label: 'Cloud', group: 'coding' },
    { id: 'nrw_businessGerman', label: 'Business German', group: 'careerSupport' },
    { id: 'nrw_jobOrientation', label: 'Job Orientation', group: 'careerSupport' },
    {
      id: 'nrw_cvPreparationAndLinkedInProfile',
      label: 'CV Preparation & LinkedIn Profile',
      group: 'careerSupport',
    },
    {
      id: 'nrw_jobApplicationJobInterview',
      label: 'Job Application & Job Interview',
      group: 'careerSupport',
    },
    { id: 'nrw_howToFindAnInternship', label: 'How to find an Internship', group: 'careerSupport' },
    {
      id: 'nrw_howToBuildProfessionalNetwork',
      label: 'How to Build a Professional Network',
      group: 'careerSupport',
    },
    { id: 'nrw_entrepreneurship', label: 'Entrepreneurship', group: 'careerSupport' },
    { id: 'nrw_freelancing', label: 'Freelancing', group: 'careerSupport' },
  ],
};
const categoriesFlat = [
  ...categoriesByLocation.berlin.map((cat) =>
    Object.assign(cat, { label: `Berlin: ${cat.label}` })
  ),
  ...categoriesByLocation.munich.map((cat) =>
    Object.assign(cat, { label: `Munich: ${cat.label}` })
  ),
  ...categoriesByLocation.nrw.map((cat) => Object.assign(cat, { label: `NRW: ${cat.label}` })),
];

const coursesByLocation = {
  berlin: [
    { id: 'basicComputerTraining', label: 'Basic Computer Training' },
    { id: 'introPython', label: 'Intro to Python' },
    { id: 'javaScript', label: 'Javascript' },
    { id: 'react', label: 'React' },
    { id: 'intermediateJava', label: 'Intermediate Java' },
    { id: 'iotInAction', label: 'IoT in Action!' },
    { id: 'dataSciencePython', label: 'Data Science with Python' },
    { id: 'htmlCss', label: 'HTML&CSS' },
    { id: 'salesforceFundamentals', label: 'Salesforce Fundamentals' },
    { id: 'blockchainBasics', label: 'Blockchain Basics' },
    { id: 'introIosAppsSwift', label: 'Intro to iOS Apps with Swift' },
    { id: 'introJava', label: 'Intro to Java' },
    { id: 'uiUxWomen', label: 'UI/UX Women' },
    { id: 'introNetworking', label: 'Intro to Networking' },
    { id: 'alumni', label: "I'm a ReDI School alumni (I took a course before)" },
  ],
  munich: [
    {
      id: 'munich_dcp_fall2020_introductionToComputerScience',
      label: 'Introduction to computer science',
    },
    { id: 'munich_dcp_fall2020_frontEndDevelopment', label: 'Front-end development' },
    { id: 'munich_dcp_fall2020_backendDevelopment', label: 'Back-end development' },
    { id: 'munich_dcp_fall2020_dataScience', label: 'Data Science' },
    { id: 'munich_dcp_fall2020_cloudComputing', label: 'Cloud computing' },
    { id: 'munich_dcp_fall2020_networking', label: 'Networking' },
    { id: 'munich_dcp_fall2020_networking', label: 'Women Program Basics English' },
    { id: 'munich_dcp_fall2020_networking', label: 'Women Program Intro to programming' },
    { id: 'munich_alumni', label: 'Alumni' },
  ],
  nrw: [
    { id: 'nrw_webDesignFundamentals', label: 'Web Design Fundamentals' },
    { id: 'nrw_htmlCsss', label: 'HTML & CSS' },
    { id: 'nrw_introductionToPython', label: 'Introduction to Python' },
    { id: 'nrw_networkingFundamentals', label: 'Networking Fundamentals' },
    { id: 'nrw_alumni', label: "I'm a ReDI School alumni (I took a course before)" },
  ],
};
const coursesFlat = [
  ...coursesByLocation.berlin.map((cat) => Object.assign(cat, { label: `Berlin: ${cat.label}` })),
  ...coursesByLocation.munich.map((cat) => Object.assign(cat, { label: `Munich: ${cat.label}` })),
  ...coursesByLocation.nrw.map((cat) => Object.assign(cat, { label: `NRW: ${cat.label}` })),
];

const mentoringSessionDurationOptions = [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180];

const categoriesIdToLabelMap = mapValues(keyBy(categoriesFlat, 'id'), 'label');
const courseIdToLabelMap = mapValues(keyBy(coursesFlat, 'id'), 'label');
const AWS_PROFILE_AVATARS_BUCKET_BASE_URL =
  'https://s3-eu-west-1.amazonaws.com/redi-connect-profile-avatars/';

/** START OF SHARED STUFF */

const RecordCreatedAt = (props) => <DateField source="createdAt" {...props} />;
RecordCreatedAt.defaultProps = {
  addLabel: true,
  label: 'Record created at',
};

const RecordUpdatedAt = (props) => <DateField source="updatedAt" {...props} />;
RecordUpdatedAt.defaultProps = {
  addLabel: true,
  label: 'Record updated at',
};

const LangaugeList = (props) => {
  return <span>{Object.values(props.data).join(', ')}</span>;
};

const CategoryList = (props) => {
  return (
    <span>
      {Object.values(props.data)
        .map((catId) => categoriesIdToLabelMap[catId])
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
      <PersonIcon className={classNames(classes.avatarImage, className)} color="primary" />
    )}
    {record && record.profileAvatarImageS3Key && (
      <div
        id="yalla"
        style={{
          backgroundImage: `url(${
            AWS_PROFILE_AVATARS_BUCKET_BASE_URL + record.profileAvatarImageS3Key
          })`,
          ...style,
        }}
        className={classNames(classes.avatarImage, className)}
      />
    )}
  </>
));

/** END OF SHARED STUFF */
const AllModelsPagination = (props) => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100, 250, 500, 1000]} {...props} />
);

const RedProfileList = (props) => {
  return (
    <List {...props} filters={<RedProfileListFilters />} pagination={<AllModelsPagination />}>
      <Datagrid expand={<RedProfileListExpandPane />}>
        <TextField source="rediLocation" label="City" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <FunctionField source="userType" label="User type" render={userTypeToEmoji} />;
        <TextField source="currentFreeMenteeSpots" label="Free spots" sortable={false} />
        <TextField source="currentMenteeCount" label="Current mentee count" sortable={false} />
        <TextField source="menteeCountCapacity" label="Total mentee capacity" sortable={false} />
        <TextField source="totalRedMatchCount" label="RedMatch #" sortable={false} />
        <BooleanField source="userActivated" />
        <DateField
          showTime
          source="lastLoginDateTime"
          label="Last Login"
          {...props}
          sortable={false}
        />
        <RecordCreatedAt />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};
const RedProfileListExpandPane = (props) => {
  return (
    <Show {...props} title="">
      <SimpleShowLayout>
        <ArrayField source="categories">
          <CategoryList />
        </ArrayField>
        <MenteeEnrolledInCourseField />
        <TextField source="contactEmail" />
        <RecordCreatedAt />
        <RecordUpdatedAt />
      </SimpleShowLayout>
    </Show>
  );
};

const RedProfileListFilters = (props) => (
  <Filter {...props}>
    <TextInput label="Search by name" source="q" />
    <SelectInput
      source="categories"
      choices={categoriesFlat.map(({ id, label }) => ({ id, name: label }))}
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
    <SelectInput
      source="mentee_currentlyEnrolledInCourse"
      choices={coursesFlat.map(({ id, label }) => ({ id, name: label }))}
    ></SelectInput>
  </Filter>
);
function userTypeToEmoji({ userType }) {
  const emoji = {
    mentor: '🎁 Mentor',
    mentee: '💎 Mentee',
    'public-sign-up-mentor-pending-review': '💣 Mentor (pending review)',
    'public-sign-up-mentee-pending-review': '🧨 Mentee (pending review)',
    'public-sign-up-mentor-rejected': '❌🎁 Mentor (rejected)',
    'public-sign-up-mentee-rejected': '❌💎Mentee (rejected)',
  }[userType];
  return emoji ?? userType;
}

const RedProfileShow = (props) => (
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
              <ShowButton />
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
              <ShowButton />
            </Datagrid>
          </ReferenceManyField>
          <h4>Mentor-specific fields:</h4>
          <TextField source="mentor_occupation" label="Occupation" />
          <TextField source="mentor_workPlace" label="Place of work" />
          <NumberField source="menteeCountCapacity" label="Total mentee count capacity" />
          <h4>Mentee-specific fields:</h4>
          <TextField source="mentee_occupationCategoryId" label="Type of occupation" />
          <TextField
            source="mentee_occupationJob_placeOfEmployment"
            label="If occupation = job, place of employment"
          />
          <TextField source="mentee_occupationJob_position" label="If occupation = job, position" />
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
          <TextField source="mentee_highestEducationLevel" label="Highest education level" />
          <MenteeEnrolledInCourseField />
          <h4>Record information</h4>
          <RecordCreatedAt />
          <RecordUpdatedAt />
          <DateField
            showTime
            source="lastLoginDateTime"
            label="Last Login"
            {...props}
            sortable={false}
          />
          <h4>Typeform information (for mentors/mentees originally signed up via typeform)</h4>
          <TextField source="mentor_ifTypeForm_submittedAt" label="Typeform: submitted at" />
          <TextField source="mentee_ifTypeForm_additionalComments" />
          <TextField source="ifTypeForm_additionalComments" label="Typeform: additional comments" />
        </Tab>
        <Tab label="Internal comments">
          <p>
            <em>
              The following fields are only visible to ReDI Connect administrators, i.e. mostly
              Eric, Isabelle and Timothy who use the cloud-accounts@redi-school.org user. Distinct
              admin users is planned.
            </em>
          </p>
          <TextField source="administratorInternalComment" style={{ whiteSpace: 'pre-wrap' }} />
        </Tab>
      </TabbedShowLayout>
    </SimpleShowLayout>
  </Show>
);

const RedProfileEditActions = (props) => {
  const userType = props && props.data && props.data.userType;
  if (
    !['public-sign-up-mentor-pending-review', 'public-sign-up-mentee-pending-review'].includes(
      userType
    )
  ) {
    return null;
  }
  return (
    <CardActions>
      User is pending. Please
      <ApproveButton {...props} /> or
      <DeclineButton {...props} />
    </CardActions>
  );
};

const RedProfileEdit = (props) => (
  <Edit {...props} actions={<RedProfileEditActions />}>
    <TabbedForm>
      <FormTab label="Profile">
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
        <CategoriesInput />
        <MenteeEnrolledInCourseInput />
        <NumberInput source="menteeCountCapacity" />
      </FormTab>
      <FormTab label="Internal comments">
        <p>
          <em>
            The following fields are only visible to ReDI Connect administrators, i.e. mostly Eric,
            Isabelle and Timothy who use the cloud-accounts@redi-school.org user. Distinct admin
            users is planned.
          </em>
        </p>
        <LongTextInput source="administratorInternalComment" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

const CategoriesInput = (props) => {
  const categories = categoriesByLocation[props.record.rediLocation];
  return (
    <SelectArrayInput
      {...props}
      source="categories"
      label={`Categories (ONLY for ${props.record.rediLocation})  `}
      choices={categories.map(({ id, label }) => ({ id, name: label }))}
    />
  );
};

const MenteeEnrolledInCourseField = (props) => {
  return (
    <>
      <Labeled label="Currently enrolled in course">
        <span>{courseIdToLabelMap[props.record.mentee_currentlyEnrolledInCourse]}</span>
      </Labeled>
    </>
  );
};
const MenteeEnrolledInCourseInput = (props) => {
  const courses = coursesByLocation[props.record.rediLocation];
  return (
    <SelectInput
      {...props}
      source="mentee_currentlyEnrolledInCourse"
      label={`Course (ONLY for ${props.record.rediLocation})  `}
      choices={courses.map(({ id, label }) => ({ id, name: label }))}
    />
  );
};

const FullName = ({ record, sourcePrefix }) => {
  return (
    <span>
      {get(record, `${sourcePrefix}firstName`)} {get(record, `${sourcePrefix}lastName`)}
    </span>
  );
};
FullName.defaultProps = {
  sourcePrefix: '',
  label: 'Full name',
};

const RedMatchList = (props) => (
  <List
    {...props}
    sort={{ field: 'createdAt', order: 'DESC' }}
    pagination={<AllModelsPagination />}
    filters={<RedMatchListFilters />}
  >
    <Datagrid>
      <TextField source="rediLocation" label="City" />
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
const RedMatchListFilters = (props) => (
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
    <SelectInput
      source="rediLocation"
      choices={rediLocations.map(({ id, label }) => ({ id, name: label }))}
    />
  </Filter>
);
const RedMatchShow = (props) => (
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
        helperText="Field contains the aplication text that a mentee as an application to a mentor when asking for mentorship."
      />
      <TextField
        source="expectationText"
        label="Expectation text"
        helperText="Field contains the expectation text that a mentee as an application to a mentor when asking for mentorship."
      />
      <TextField
        source="mentorReplyMessageOnAccept"
        label="Mentor's reply message to mentee's application (on accepting the application)"
        helperText="This field contains the message a mentor sends to his mentee when accepting the mentee's application"
      />
      <BooleanField
        source="hasMenteeDismissedMentorshipApplicationAcceptedNotification"
        valueLabelTrue="Mentee has seen the notification"
        valueLabelFalse="Mentee has not seen the notification"
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
const RedMatchShow_RelatedMentoringSessions = ({ record: { mentorId, menteeId } }) => {
  const [mentoringSessions, setMentoringSessions] = React.useState([]);
  useEffect(() => {
    dataProvider('GET_LIST', 'redMentoringSessions', {
      pagination: { page: 1, perPage: 0 },
      sort: { field: 'date', order: 'ASC' },
      filter: { mentorId, menteeId },
    }).then(({ data }) => setMentoringSessions(data));
  }, []);
  const totalDuration = mentoringSessions.reduce((acc, curr) => acc + curr.minuteDuration, 0);
  if (mentoringSessions && mentoringSessions.length === 0) {
    return <h3>NO mentoring sessions registerd yet.</h3>;
  }
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
                <TableCell />
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
const RedMatchCreate = (props) => (
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
        <AutocompleteInput optionText={(op) => `${op.firstName} ${op.lastName}`} />
      </ReferenceInput>
      <ReferenceInput
        label="Mentee"
        source="menteeId"
        reference="redProfiles"
        perPage={0}
        filter={{ userType: 'mentee' }}
      >
        <AutocompleteInput optionText={(op) => `${op.firstName} ${op.lastName}`} />
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
const RedMatchEdit = (props) => (
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
        <AutocompleteInput optionText={(op) => `${op.firstName} ${op.lastName}`} />
      </ReferenceInput>
      <ReferenceInput
        label="Mentee"
        source="menteeId"
        reference="redProfiles"
        perPage={0}
        filter={{ userType: 'mentee' }}
      >
        <AutocompleteInput optionText={(op) => `${op.firstName} ${op.lastName}`} />
      </ReferenceInput>
      <LongTextInput
        source="applicationText"
        label="Application text"
        helperText="Field contains the application text that a mentee as an application to a mentor when asking for mentorship."
      />
      <LongTextInput
        source="expectationText"
        label="Expectation text"
        helperText="Field contains the expectation text that a mentee as an application to a mentor when asking for mentorship."
      />
      <LongTextInput
        source="mentorReplyMessageOnAccept"
        label="Mentor's reply message to mentee's application (on accepting the application)"
        helperText="This field contains the message a mentor sends to his mentee when accepting the mentee's application"
      />
      <TextInput
        source="matchMadeActiveOn"
        label="If match is/was active, when was it made active?"
      />
    </SimpleForm>
  </Edit>
);

const exporter = async (mentoringSessions, fetchRelatedRecords) => {
  const mentors = await fetchRelatedRecords(mentoringSessions, 'mentorId', 'redProfiles');
  const mentees = await fetchRelatedRecords(mentoringSessions, 'menteeId', 'redProfiles');
  const data = mentoringSessions.map((x) => {
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
    fields: ['id', 'date', 'minuteDuration', 'mentorName', 'menteeName', 'createdAt', 'updatedAt'],
  });
  downloadCSV(csv, 'yalla');
};

const RedMentoringSessionList = (props) => (
  <List
    {...props}
    exporter={exporter}
    pagination={<AllModelsPagination />}
    aside={<RedMentoringSessionListAside />}
    filters={<RedMentoringSessionListFilters />}
  >
    <Datagrid>
      <TextField source="rediLocation" label="City" />
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
const RedMentoringSessionListFilters = (props) => (
  <Filter {...props}>
    <SelectInput
      source="rediLocation"
      choices={rediLocations.map(({ id, label }) => ({ id, name: label }))}
    />
  </Filter>
);
const RedMentoringSessionListAside = () => {
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [rediLocation, setRediLocation] = React.useState(undefined);
  const [loadState, setLoadState] = React.useState('pending');
  const [result, setResult] = React.useState(null);
  const [step, setStep] = React.useState(0);
  const increaseStep = React.useCallback(() => setStep((step) => step + 1));

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
        const sessions = await dataProvider('GET_LIST', 'redMentoringSessions', {
          pagination: { page: 1, perPage: 0 },
          sort: {},
          filter: { date: { gte: fromDate, lte: toDate }, rediLocation },
        });
        setLoadState('success');
        setResult(sessions.data.reduce((acc, curr) => acc + curr.minuteDuration, 0));
      }
    })()
  );

  return (
    <div style={{ width: 200, margin: '1em' }}>
      <Typography variant="title">Isabelle Calculator</Typography>
      <Typography variant="body1" />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {picker(fromDate, setFromDate, 'From date')}
        {picker(toDate, setToDate, 'To date')}
      </MuiPickersUtilsProvider>
      <FormControl style={{ width: '100%' }}>
        <InputLabel>City</InputLabel>
        <Select value={rediLocation} onChange={(e) => setRediLocation(e.target.value)}>
          <MenuItem value={undefined}>All cities</MenuItem>
          <MenuItem value="berlin">Berlin</MenuItem>
          <MenuItem value="munich">Munich</MenuItem>
          <MenuItem value="nrw">NRW</MenuItem>
        </Select>
      </FormControl>
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
          Total: {result} minutes! That's {Math.floor(result / 60)} hours and {result % 60} minutes
        </Typography>
      )}
    </div>
  );
};
const RedMentoringSessionShow = (props) => (
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

const RedMentoringSessionCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput
        label="Mentor"
        source="mentorId"
        reference="redProfiles"
        perPage={0}
        filter={{ userType: 'mentor' }}
      >
        <AutocompleteInput optionText={(op) => `${op.firstName} ${op.lastName}`} />
      </ReferenceInput>
      <ReferenceInput
        label="Mentee"
        source="menteeId"
        reference="redProfiles"
        perPage={0}
        filter={{ userType: 'mentee' }}
      >
        <AutocompleteInput optionText={(op) => `${op.firstName} ${op.lastName}`} />
      </ReferenceInput>
      <DateInput label="Date of mentoring session" source="date" />
      <SelectInput
        source="minuteDuration"
        choices={mentoringSessionDurationOptions.map((duration) => ({
          id: duration,
          name: duration,
        }))}
      />
    </SimpleForm>
  </Create>
);
const RedMentoringSessionEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput
        label="Mentor"
        source="mentorId"
        reference="redProfiles"
        perPage={0}
        filter={{ userType: 'mentor' }}
      >
        <AutocompleteInput optionText={(op) => `${op.firstName} ${op.lastName}`} />
      </ReferenceInput>
      <ReferenceInput
        label="Mentee"
        source="menteeId"
        reference="redProfiles"
        perPage={0}
        filter={{ userType: 'mentee' }}
      >
        <AutocompleteInput optionText={(op) => `${op.firstName} ${op.lastName}`} />
      </ReferenceInput>
      <DateInput label="Date of mentoring session" source="date" />
      <SelectInput
        source="minuteDuration"
        choices={mentoringSessionDurationOptions.map((duration) => ({
          id: duration,
          name: duration,
        }))}
      />
    </SimpleForm>
  </Edit>
);

const buildDataProvider = (normalDataProvider) => (verb, resource, params) => {
  if (verb === 'GET_LIST' && resource === 'redProfiles') {
    if (params.filter) {
      const filter = params.filter;
      const q = filter.q;
      delete filter.q;
      const newFilter = { and: [filter] };
      if (q) {
        const andConditions = q.split(' ').map((word) => ({
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
      <Admin dataProvider={dataProvider} authProvider={authProvider(`${API_URL}/redUsers/login`)}>
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
