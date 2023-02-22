// THIS FILE IS GENERATED, DO NOT EDIT!
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export enum CompanyTalentPoolState {
  DraftingProfile = 'DRAFTING_PROFILE',
  ProfileApproved = 'PROFILE_APPROVED',
  SubmittedForReview = 'SUBMITTED_FOR_REVIEW'
}

export type ConMenteeFavoritedMentor = {
  __typename?: 'ConMenteeFavoritedMentor';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  menteeId: Scalars['ID'];
  mentorId: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type ConMenteeFavoritedMentorCreateMutationInputDto = {
  mentorId: Scalars['String'];
};

export type ConMenteeFavoritedMentorCreateMutationOutputDto = {
  __typename?: 'ConMenteeFavoritedMentorCreateMutationOutputDto';
  ok: Scalars['Boolean'];
};

export type ConMenteeFavoritedMentorDeleteMutationInputDto = {
  mentorId: Scalars['String'];
};

export type ConMenteeFavoritedMentorDeleteMutationOutputDto = {
  __typename?: 'ConMenteeFavoritedMentorDeleteMutationOutputDto';
  ok: Scalars['Boolean'];
};

export type ConMentoringSession = {
  __typename?: 'ConMentoringSession';
  createdAt: Scalars['DateTime'];
  date: Scalars['DateTime'];
  id: Scalars['ID'];
  menteeId: Scalars['ID'];
  mentorId: Scalars['ID'];
  minuteDuration: MentoringSessionDuration;
  updatedAt: Scalars['DateTime'];
};

export type ConMentorshipMatch = {
  __typename?: 'ConMentorshipMatch';
  applicationText?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  expectationText?: Maybe<Scalars['String']>;
  hasMenteeDismissedMentorshipApplicationAcceptedNotification?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  ifDeclinedByMentor_chosenReasonForDecline?: Maybe<Scalars['String']>;
  ifDeclinedByMentor_dateTime?: Maybe<Scalars['DateTime']>;
  ifDeclinedByMentor_ifReasonIsOther_freeText?: Maybe<Scalars['String']>;
  ifDeclinedByMentor_optionalMessageToMentee?: Maybe<Scalars['String']>;
  matchMadeActiveOn?: Maybe<Scalars['DateTime']>;
  mentee: ConProfile;
  menteeId: Scalars['String'];
  mentor: ConProfile;
  mentorId: Scalars['String'];
  mentorMessageOnComplete?: Maybe<Scalars['String']>;
  mentorReplyMessageOnAccept?: Maybe<Scalars['String']>;
  mentoringSessions: Array<ConMentoringSession>;
  status: MentorshipMatchStatus;
  updatedAt: Scalars['DateTime'];
};

export type ConMentorshipMatchesAcceptMentorshipInputDto = {
  mentorReplyMessageOnAccept: Scalars['String'];
  mentorshipMatchId: Scalars['String'];
};

export type ConMentorshipMatchesAcceptMentorshipOutputDto = {
  __typename?: 'ConMentorshipMatchesAcceptMentorshipOutputDto';
  id: Scalars['String'];
  ok: Scalars['Boolean'];
};

export type ConMentorshipMatchesApplyForMentorshipInputDto = {
  applicationText: Scalars['String'];
  expectationText: Scalars['String'];
  mentorId: Scalars['String'];
};

export type ConMentorshipMatchesApplyForMentorshipOutputDto = {
  __typename?: 'ConMentorshipMatchesApplyForMentorshipOutputDto';
  id: Scalars['String'];
  ok: Scalars['Boolean'];
};

export type ConMentorshipMatchesCompleteMentorshipInputDto = {
  mentorMessageOnComplete: Scalars['String'];
  mentorshipMatchId: Scalars['String'];
};

export type ConMentorshipMatchesCompleteMentorshipOutputDto = {
  __typename?: 'ConMentorshipMatchesCompleteMentorshipOutputDto';
  id: Scalars['String'];
  ok: Scalars['Boolean'];
};

export type ConMentorshipMatchesDeclineMentorshipInputDto = {
  ifDeclinedByMentor_chosenReasonForDecline: DeclineReason;
  ifDeclinedByMentor_ifReasonIsOther_freeText: Scalars['String'];
  ifDeclinedByMentor_optionalMessageToMentee: Scalars['String'];
  mentorshipMatchId: Scalars['String'];
};

export type ConMentorshipMatchesDeclineMentorshipOutputDto = {
  __typename?: 'ConMentorshipMatchesDeclineMentorshipOutputDto';
  id: Scalars['String'];
  ok: Scalars['Boolean'];
};

export type ConMentorshipMatchesMarkAsDismissedInputDto = {
  conMentorshipMatchId: Scalars['String'];
};

export type ConMentorshipMatchesMarkAsDismissedOutputDto = {
  __typename?: 'ConMentorshipMatchesMarkAsDismissedOutputDto';
  id: Scalars['String'];
  ok: Scalars['Boolean'];
};

export type ConProfile = {
  __typename?: 'ConProfile';
  age?: Maybe<Scalars['Float']>;
  birthDate?: Maybe<Scalars['DateTime']>;
  categories: Array<MentoringTopic>;
  createdAt: Scalars['DateTime'];
  doesNotHaveAvailableMentorshipSlot: Scalars['Boolean'];
  email: Scalars['String'];
  expectations?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  gender?: Maybe<Gender>;
  githubProfileUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  languages?: Maybe<Array<Language>>;
  lastName: Scalars['String'];
  linkedInProfileUrl?: Maybe<Scalars['String']>;
  loopbackUserId: Scalars['String'];
  menteeCountCapacity?: Maybe<Scalars['Int']>;
  mentee_currentlyEnrolledInCourse?: Maybe<RediCourse>;
  mentee_highestEducationLevel?: Maybe<EducationLevel>;
  mentee_occupationCategoryId?: Maybe<OccupationCategory>;
  mentee_occupationJob_placeOfEmployment?: Maybe<Scalars['String']>;
  mentee_occupationJob_position?: Maybe<Scalars['String']>;
  mentee_occupationLookingForJob_what?: Maybe<Scalars['String']>;
  mentee_occupationOther_description?: Maybe<Scalars['String']>;
  mentee_occupationStudent_studyName?: Maybe<Scalars['String']>;
  mentee_occupationStudent_studyPlace?: Maybe<Scalars['String']>;
  mentor_occupation?: Maybe<Scalars['String']>;
  mentor_workPlace?: Maybe<Scalars['String']>;
  mentoringSessions: Array<ConMentoringSession>;
  mentorshipMatches: Array<ConMentorshipMatch>;
  optOutOfMenteesFromOtherRediLocation: Scalars['Boolean'];
  personalDescription?: Maybe<Scalars['String']>;
  profileAvatarImageS3Key?: Maybe<Scalars['String']>;
  profileStatus: ConnectProfileStatus;
  rediLocation: RediLocation;
  slackUsername?: Maybe<Scalars['String']>;
  telephoneNumber?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userActivatedAt?: Maybe<Scalars['DateTime']>;
  userId: Scalars['String'];
  userType: UserType;
};

export type ConProfileSignUpInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  mentee_currentlyEnrolledInCourse?: InputMaybe<RediCourse>;
  rediLocation: RediLocation;
  userType: UserType;
};

export enum ConnectProfileStatus {
  Approved = 'APPROVED',
  Deactivated = 'DEACTIVATED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type CreateConMentoringSessionInput = {
  date: Scalars['DateTime'];
  menteeId: Scalars['ID'];
  minuteDuration: MentoringSessionDuration;
};

export type CreateConProblemReportInput = {
  ifFromMentor_cancelMentorshipImmediately?: InputMaybe<Scalars['Boolean']>;
  problemDescription: Scalars['String'];
  reporteeProfileId: Scalars['String'];
};

export enum DeclineReason {
  AnotherMentorMoreSuitable = 'anotherMentorMoreSuitable',
  NotEnoughTimeNowToBeMentor = 'notEnoughTimeNowToBeMentor',
  NotRightExpertise = 'notRightExpertise',
  Other = 'other'
}

export enum EducationLevel {
  Apprenticeship = 'apprenticeship',
  HighSchool = 'highSchool',
  MiddleSchool = 'middleSchool',
  UniversityBachelor = 'universityBachelor',
  UniversityMaster = 'universityMaster',
  UniversityPhd = 'universityPhd'
}

export type EducationRecord = {
  __typename?: 'EducationRecord';
  certificationType?: Maybe<TpEducationCertificationType>;
  current?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  endDateMonth?: Maybe<Scalars['Float']>;
  endDateYear?: Maybe<Scalars['Float']>;
  institutionCity?: Maybe<Scalars['String']>;
  institutionCountry?: Maybe<Scalars['String']>;
  institutionName?: Maybe<Scalars['String']>;
  startDateMonth?: Maybe<Scalars['Float']>;
  startDateYear?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
  uuid: Scalars['String'];
};

export type ExperienceRecord = {
  __typename?: 'ExperienceRecord';
  city?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  current?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  endDateMonth?: Maybe<Scalars['Float']>;
  endDateYear?: Maybe<Scalars['Float']>;
  startDateMonth?: Maybe<Scalars['Float']>;
  startDateYear?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
  uuid: Scalars['String'];
};

export enum FederalState {
  BadenWuerttemberg = 'BADEN_WUERTTEMBERG',
  Bayern = 'BAYERN',
  Berlin = 'BERLIN',
  Brandenburg = 'BRANDENBURG',
  Bremen = 'BREMEN',
  Hamburg = 'HAMBURG',
  Hessen = 'HESSEN',
  MecklenburgVorpommern = 'MECKLENBURG_VORPOMMERN',
  Niedersachsen = 'NIEDERSACHSEN',
  NordrheinWestfalen = 'NORDRHEIN_WESTFALEN',
  OutsideGermany = 'OUTSIDE_GERMANY',
  RheinlandPfalz = 'RHEINLAND_PFALZ',
  Saarland = 'SAARLAND',
  Sachsen = 'SACHSEN',
  SachsenAnhalt = 'SACHSEN_ANHALT',
  SchleswigHolstein = 'SCHLESWIG_HOLSTEIN',
  Thueringen = 'THUERINGEN'
}

export type FindAllVisibleTpJobseekerProfilesArgsFilter = {
  desiredLanguages?: InputMaybe<Array<Language>>;
  desiredPositions?: InputMaybe<Array<TpDesiredPosition>>;
  employmentTypes?: InputMaybe<Array<TpDesiredEmploymentType>>;
  federalStates?: InputMaybe<Array<FederalState>>;
  isJobFair2022Participant?: InputMaybe<Scalars['Boolean']>;
  isJobFair2023Participant?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Array<TpTechnicalSkill>>;
};

export type FindConProfilesArgsFilter = {
  categories?: InputMaybe<Array<MentoringTopic>>;
  languages?: InputMaybe<Array<Language>>;
  locations?: InputMaybe<Array<RediLocation>>;
  name?: InputMaybe<Scalars['String']>;
};

export enum FirstPointOfTpContactOption {
  AlreadyVolunteerAtRedi = 'ALREADY_VOLUNTEER_AT_REDI',
  Collegue = 'COLLEGUE',
  InternetSearch = 'INTERNET_SEARCH',
  Other = 'OTHER',
  RediStudentAlumni = 'REDI_STUDENT_ALUMNI',
  RediTeamMember = 'REDI_TEAM_MEMBER',
  RediWebsite = 'REDI_WEBSITE',
  SocialMedia = 'SOCIAL_MEDIA'
}

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Other = 'Other'
}

export enum JobseekerProfileStatus {
  DraftingProfile = 'DRAFTING_PROFILE',
  ProfileApproved = 'PROFILE_APPROVED',
  SubmittedForReview = 'SUBMITTED_FOR_REVIEW'
}

export enum Language {
  Afrikaans = 'Afrikaans',
  Albanian = 'Albanian',
  Amharic = 'Amharic',
  Arabic = 'Arabic',
  Aramaic = 'Aramaic',
  Armenian = 'Armenian',
  Assamese = 'Assamese',
  Aymara = 'Aymara',
  Azerbaijani = 'Azerbaijani',
  Balochi = 'Balochi',
  Bamanankan = 'Bamanankan',
  BashkortBashkir = 'BashkortBashkir',
  Basque = 'Basque',
  Belarusan = 'Belarusan',
  Bengali = 'Bengali',
  Bhojpuri = 'Bhojpuri',
  Bislama = 'Bislama',
  Bosnian = 'Bosnian',
  Brahui = 'Brahui',
  Bulgarian = 'Bulgarian',
  Burmese = 'Burmese',
  Cantonese = 'Cantonese',
  Catalan = 'Catalan',
  Cebuano = 'Cebuano',
  Chechen = 'Chechen',
  Cherokee = 'Cherokee',
  Croatian = 'Croatian',
  Czech = 'Czech',
  Dakota = 'Dakota',
  Danish = 'Danish',
  Dari = 'Dari',
  Dholuo = 'Dholuo',
  Dutch = 'Dutch',
  English = 'English',
  Esperanto = 'Esperanto',
  Estonian = 'Estonian',
  Ewe = 'Ewe',
  Finnish = 'Finnish',
  French = 'French',
  Georgian = 'Georgian',
  German = 'German',
  Gikuyu = 'Gikuyu',
  Greek = 'Greek',
  Guarani = 'Guarani',
  Gujarati = 'Gujarati',
  HaitianCreole = 'HaitianCreole',
  Hausa = 'Hausa',
  Hawaiian = 'Hawaiian',
  HawaiianCreole = 'HawaiianCreole',
  Hebrew = 'Hebrew',
  Hiligaynon = 'Hiligaynon',
  Hindi = 'Hindi',
  Hungarian = 'Hungarian',
  Icelandic = 'Icelandic',
  Igbo = 'Igbo',
  Ilocano = 'Ilocano',
  IndonesianBahasaIndonesia = 'IndonesianBahasaIndonesia',
  InuitInupiaq = 'InuitInupiaq',
  IrishGaelic = 'IrishGaelic',
  Italian = 'Italian',
  Japanese = 'Japanese',
  Jarai = 'Jarai',
  Javanese = 'Javanese',
  Kabyle = 'Kabyle',
  Kannada = 'Kannada',
  Kashmiri = 'Kashmiri',
  Kazakh = 'Kazakh',
  Khmer = 'Khmer',
  Khoekhoe = 'Khoekhoe',
  Kiche = 'Kiche',
  Korean = 'Korean',
  Kurdish = 'Kurdish',
  Kyrgyz = 'Kyrgyz',
  Lao = 'Lao',
  Latin = 'Latin',
  Latvian = 'Latvian',
  Lingala = 'Lingala',
  Lithuanian = 'Lithuanian',
  Macedonian = 'Macedonian',
  Maithili = 'Maithili',
  Malagasy = 'Malagasy',
  MalayBahasaMelayu = 'MalayBahasaMelayu',
  Malayalam = 'Malayalam',
  MandarinChinese = 'MandarinChinese',
  Marathi = 'Marathi',
  Mende = 'Mende',
  Mongolian = 'Mongolian',
  Nahuatl = 'Nahuatl',
  Navajo = 'Navajo',
  Nepali = 'Nepali',
  Norwegian = 'Norwegian',
  Ojibwa = 'Ojibwa',
  Oriya = 'Oriya',
  Oromo = 'Oromo',
  Pashto = 'Pashto',
  Persian = 'Persian',
  Polish = 'Polish',
  Portuguese = 'Portuguese',
  Punjabi = 'Punjabi',
  Quechua = 'Quechua',
  Romani = 'Romani',
  Romanian = 'Romanian',
  Russian = 'Russian',
  Rwanda = 'Rwanda',
  Samoan = 'Samoan',
  Sanskrit = 'Sanskrit',
  Serbian = 'Serbian',
  Shona = 'Shona',
  Sindhi = 'Sindhi',
  Sinhala = 'Sinhala',
  Slovak = 'Slovak',
  Slovene = 'Slovene',
  Somali = 'Somali',
  Spanish = 'Spanish',
  Swahili = 'Swahili',
  Swedish = 'Swedish',
  Tachelhit = 'Tachelhit',
  Tagalog = 'Tagalog',
  Tajiki = 'Tajiki',
  Tamil = 'Tamil',
  Tatar = 'Tatar',
  Telugu = 'Telugu',
  Thai = 'Thai',
  TibeticLanguages = 'TibeticLanguages',
  Tigrigna = 'Tigrigna',
  TokPisin = 'TokPisin',
  Turkish = 'Turkish',
  Turkmen = 'Turkmen',
  Ukrainian = 'Ukrainian',
  Urdu = 'Urdu',
  Uyghur = 'Uyghur',
  Uzbek = 'Uzbek',
  Vietnamese = 'Vietnamese',
  Warlpiri = 'Warlpiri',
  Welsh = 'Welsh',
  Wolof = 'Wolof',
  Xhosa = 'Xhosa',
  Yakut = 'Yakut',
  Yiddish = 'Yiddish',
  Yoruba = 'Yoruba',
  Yucatec = 'Yucatec',
  Zapotec = 'Zapotec',
  Zulu = 'Zulu'
}

export enum LanguageProficiencyLevel {
  ElementaryProficiency = 'elementaryProficiency',
  FullWorkingProficiency = 'fullWorkingProficiency',
  LimitedWorkingProficiency = 'limitedWorkingProficiency',
  NativeOrBilingualProficiency = 'nativeOrBilingualProficiency'
}

export type LanguageRecord = {
  __typename?: 'LanguageRecord';
  language: Language;
  proficiencyLevelId: LanguageProficiencyLevel;
};

export enum MentoringSessionDuration {
  Min15 = 'MIN15',
  Min30 = 'MIN30',
  Min45 = 'MIN45',
  Min60 = 'MIN60',
  Min75 = 'MIN75',
  Min90 = 'MIN90',
  Min105 = 'MIN105',
  Min120 = 'MIN120',
  Min135 = 'MIN135',
  Min150 = 'MIN150',
  Min165 = 'MIN165',
  Min180 = 'MIN180'
}

export enum MentoringTopic {
  BasicGerman = 'basicGerman',
  BasicProgrammingSkills = 'basicProgrammingSkills',
  Blockchain = 'blockchain',
  BuildingProfessionalNetwork = 'buildingProfessionalNetwork',
  BusinessDevelopment = 'businessDevelopment',
  BusinessGerman = 'businessGerman',
  CareerOrientationAndPlanning = 'careerOrientationAndPlanning',
  CodingChallengePreparation = 'codingChallengePreparation',
  ComputerNetworking = 'computerNetworking',
  DataAnalytics = 'dataAnalytics',
  DevOpsCloud = 'devOpsCloud',
  DigitalMarketing = 'digitalMarketing',
  DontKnowYet = 'dontKnowYet',
  English = 'english',
  Entrepreneurship = 'entrepreneurship',
  Freelancing = 'freelancing',
  FriendAndHelp = 'friendAndHelp',
  GraphicDesign = 'graphicDesign',
  HtmlCss = 'htmlCss',
  InternshipOrWorkingStudent = 'internshipOrWorkingStudent',
  InterviewPreparation = 'interviewPreparation',
  Iot = 'iot',
  Java = 'java',
  Javascript = 'javascript',
  JobApplicationsCvPreparationEnglish = 'jobApplicationsCvPreparationEnglish',
  JobApplicationsCvPreparationGerman = 'jobApplicationsCvPreparationGerman',
  JobSearch = 'jobSearch',
  MachineLearning = 'machineLearning',
  MobileDevelopmentAndroid = 'mobileDevelopmentAndroid',
  MobileDevelopmentIos = 'mobileDevelopmentIos',
  MotivationAndEncouragement = 'motivationAndEncouragement',
  ProductManagement = 'productManagement',
  ProjectManagement = 'projectManagement',
  Python = 'python',
  QualityAssurance = 'qualityAssurance',
  React = 'react',
  Sales = 'sales',
  Salesforce = 'salesforce',
  UserExperienceDesign = 'userExperienceDesign',
  UserInterfaceDesign = 'userInterfaceDesign'
}

export enum MentorshipMatchStatus {
  Accepted = 'ACCEPTED',
  Applied = 'APPLIED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  DeclinedByMentor = 'DECLINED_BY_MENTOR',
  InvalidatedAsOtherMentorAccepted = 'INVALIDATED_AS_OTHER_MENTOR_ACCEPTED'
}

export type Mutation = {
  __typename?: 'Mutation';
  conMatchMarkMentorshipAcceptedNotificationDismissed: OkResponseMutationOutputDto;
  conMenteeFavoritedMentorCreate: ConMenteeFavoritedMentorCreateMutationOutputDto;
  conMenteeFavoritedMentorDelete: ConMenteeFavoritedMentorDeleteMutationOutputDto;
  conMentorshipMatchesAcceptMentorship: ConMentorshipMatchesAcceptMentorshipOutputDto;
  conMentorshipMatchesApplyForMentorship: ConMentorshipMatchesApplyForMentorshipOutputDto;
  conMentorshipMatchesCompleteMentorship: ConMentorshipMatchesCompleteMentorshipOutputDto;
  conMentorshipMatchesDeclineMentorship: ConMentorshipMatchesDeclineMentorshipOutputDto;
  conMentorshipMatchesMarkAsDismissed: ConMentorshipMatchesMarkAsDismissedOutputDto;
  conProblemReportCreate: OkResponseMutationOutputDto;
  conProfileSignUp: OkIdResponseMutationOutputDto;
  createConMentoringSession: ConMentoringSession;
  patchConProfile: ConProfile;
  tpCompanyProfileSignUp: TpCompanyProfileSignUpInputOutputDto;
};


export type MutationConMatchMarkMentorshipAcceptedNotificationDismissedArgs = {
  conMentorshipMatchId: Scalars['String'];
};


export type MutationConMenteeFavoritedMentorCreateArgs = {
  input: ConMenteeFavoritedMentorCreateMutationInputDto;
};


export type MutationConMenteeFavoritedMentorDeleteArgs = {
  input: ConMenteeFavoritedMentorDeleteMutationInputDto;
};


export type MutationConMentorshipMatchesAcceptMentorshipArgs = {
  input: ConMentorshipMatchesAcceptMentorshipInputDto;
};


export type MutationConMentorshipMatchesApplyForMentorshipArgs = {
  input: ConMentorshipMatchesApplyForMentorshipInputDto;
};


export type MutationConMentorshipMatchesCompleteMentorshipArgs = {
  input: ConMentorshipMatchesCompleteMentorshipInputDto;
};


export type MutationConMentorshipMatchesDeclineMentorshipArgs = {
  input: ConMentorshipMatchesDeclineMentorshipInputDto;
};


export type MutationConMentorshipMatchesMarkAsDismissedArgs = {
  input: ConMentorshipMatchesMarkAsDismissedInputDto;
};


export type MutationConProblemReportCreateArgs = {
  input: CreateConProblemReportInput;
};


export type MutationConProfileSignUpArgs = {
  input: ConProfileSignUpInput;
};


export type MutationCreateConMentoringSessionArgs = {
  createConMentoringSessionInput: CreateConMentoringSessionInput;
};


export type MutationPatchConProfileArgs = {
  patchConProfileInput: UpdateConProfileInput;
};


export type MutationTpCompanyProfileSignUpArgs = {
  input: TpCompanyProfileSignUpInputDto;
};

export enum OccupationCategory {
  Job = 'job',
  LookingForJob = 'lookingForJob',
  Other = 'other',
  Student = 'student'
}

export type OkIdResponseMutationOutputDto = {
  __typename?: 'OkIdResponseMutationOutputDto';
  id: Scalars['String'];
  ok: Scalars['Boolean'];
};

export type OkResponseMutationOutputDto = {
  __typename?: 'OkResponseMutationOutputDto';
  ok: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  conMenteeFavoritedMentors: Array<ConMenteeFavoritedMentor>;
  conMentoringSessions: Array<ConMentoringSession>;
  conMentorshipMatch: ConMentorshipMatch;
  conMentorshipMatches: Array<ConMentorshipMatch>;
  conProfile: ConProfile;
  conProfilesAvailableMentors: Array<ConProfile>;
  myConProfile: ConProfile;
  publicTpCompanyProfiles: Array<TpCompanyProfile>;
  tpCompanyProfile: TpCompanyProfile;
  tpCompanyProfiles: Array<TpCompanyProfile>;
  tpCurrentUserDataGet: TpCurrentUserData;
  tpJobseekerProfile: Array<TpJobseekerProfile>;
  tpJobseekerProfiles: Array<TpJobseekerProfile>;
};


export type QueryConMentorshipMatchArgs = {
  id: Scalars['ID'];
};


export type QueryConMentorshipMatchesArgs = {
  status?: InputMaybe<MentorshipMatchStatus>;
};


export type QueryConProfileArgs = {
  id?: InputMaybe<Scalars['ID']>;
  loopbackUserId?: InputMaybe<Scalars['ID']>;
};


export type QueryConProfilesAvailableMentorsArgs = {
  filter: FindConProfilesArgsFilter;
};


export type QueryTpCompanyProfileArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryTpJobseekerProfileArgs = {
  id: Scalars['String'];
};


export type QueryTpJobseekerProfilesArgs = {
  filter: FindAllVisibleTpJobseekerProfilesArgsFilter;
};

export enum RediCourse {
  BerlinAlumni = 'BERLIN_ALUMNI',
  BerlinCodingFundamentals = 'BERLIN_CODING_FUNDAMENTALS',
  BerlinCybersecurity = 'BERLIN_CYBERSECURITY',
  BerlinDataAnalytics = 'BERLIN_DATA_ANALYTICS',
  BerlinDataCircle = 'BERLIN_DATA_CIRCLE',
  BerlinDigitalLiteracyProgram = 'BERLIN_DIGITAL_LITERACY_PROGRAM',
  BerlinHtmlCss = 'BERLIN_HTML_CSS',
  BerlinIntroToComputerScience = 'BERLIN_INTRO_TO_COMPUTER_SCIENCE',
  BerlinJavascript = 'BERLIN_JAVASCRIPT',
  BerlinJavaCircle = 'BERLIN_JAVA_CIRCLE',
  BerlinProgrammingWithJava = 'BERLIN_PROGRAMMING_WITH_JAVA',
  BerlinPythonFoundation = 'BERLIN_PYTHON_FOUNDATION',
  BerlinReact = 'BERLIN_REACT',
  BerlinSalesforceFundamentals = 'BERLIN_SALESFORCE_FUNDAMENTALS',
  BerlinUxUiBasics = 'BERLIN_UX_UI_BASICS',
  BerlinUxUiIntermediate = 'BERLIN_UX_UI_INTERMEDIATE',
  HamburgAlumni = 'HAMBURG_ALUMNI',
  HamburgHtmlCss = 'HAMBURG_HTML_CSS',
  HamburgInternetOfThings = 'HAMBURG_INTERNET_OF_THINGS',
  HamburgIntroToCs = 'HAMBURG_INTRO_TO_CS',
  HamburgUxUiDesignBasis = 'HAMBURG_UX_UI_DESIGN_BASIS',
  MunichAlumni = 'MUNICH_ALUMNI',
  MunichBackEndDevelopment = 'MUNICH_BACK_END_DEVELOPMENT',
  MunichDataAnalytics = 'MUNICH_DATA_ANALYTICS',
  MunichDigitalLiteracyProgram = 'MUNICH_DIGITAL_LITERACY_PROGRAM',
  MunichFrontEndDevelopmentHtmlCss = 'MUNICH_FRONT_END_DEVELOPMENT_HTML_CSS',
  MunichFrontEndDevelopmentJavascript = 'MUNICH_FRONT_END_DEVELOPMENT_JAVASCRIPT',
  MunichIntroductionToComputerScienceHybrid = 'MUNICH_INTRODUCTION_TO_COMPUTER_SCIENCE_HYBRID',
  MunichIntroductionToComputerScienceOnline = 'MUNICH_INTRODUCTION_TO_COMPUTER_SCIENCE_ONLINE',
  MunichIntroductionToComputerScienceUkr = 'MUNICH_INTRODUCTION_TO_COMPUTER_SCIENCE_UKR',
  MunichPythonIntermediateHybrid = 'MUNICH_PYTHON_INTERMEDIATE_HYBRID',
  MunichPythonIntermediateOnline = 'MUNICH_PYTHON_INTERMEDIATE_ONLINE',
  MunichUxUiDesign = 'MUNICH_UX_UI_DESIGN',
  NrwAlumni = 'NRW_ALUMNI',
  NrwCloudComputing = 'NRW_CLOUD_COMPUTING',
  NrwDataAnalytics = 'NRW_DATA_ANALYTICS',
  NrwHtmlAndCss = 'NRW_HTML_AND_CSS',
  NrwInfrastructureBasics = 'NRW_INFRASTRUCTURE_BASICS',
  NrwInternetOfThings = 'NRW_INTERNET_OF_THINGS',
  NrwIntroductionToPython = 'NRW_INTRODUCTION_TO_PYTHON',
  NrwJavascript = 'NRW_JAVASCRIPT',
  NrwMachineLearning = 'NRW_MACHINE_LEARNING',
  NrwReact = 'NRW_REACT',
  NrwUxUiDesignBasics = 'NRW_UX_UI_DESIGN_BASICS',
  NrwUxUiDesignIntermediate = 'NRW_UX_UI_DESIGN_INTERMEDIATE'
}

export enum RediLocation {
  Berlin = 'BERLIN',
  Hamburg = 'HAMBURG',
  Munich = 'MUNICH',
  Nrw = 'NRW'
}

export enum TpAvailabilityOption {
  Date = 'date',
  Immediately = 'immediately',
  OneMonthNotice = 'oneMonthNotice',
  ThreeMonthNotice = 'threeMonthNotice',
  TwoMonthNotice = 'twoMonthNotice'
}

export type TpCompanyProfile = {
  __typename?: 'TpCompanyProfile';
  about?: Maybe<Scalars['String']>;
  companyName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  industry?: Maybe<Scalars['String']>;
  isJobFair2023Participant: Scalars['Boolean'];
  isProfileVisibleToJobseekers: Scalars['Boolean'];
  linkedInUrl?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  profileAvatarImageS3Key?: Maybe<Scalars['String']>;
  state: CompanyTalentPoolState;
  tagline?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  website?: Maybe<Scalars['String']>;
};

export type TpCompanyProfileSignUpInputDto = {
  companyIdOrName: Scalars['String'];
  firstName: Scalars['String'];
  firstPointOfContact: FirstPointOfTpContactOption;
  firstPointOfContactOther?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  operationType: TpCompanyProfileSignUpOperationType;
};

export type TpCompanyProfileSignUpInputOutputDto = {
  __typename?: 'TpCompanyProfileSignUpInputOutputDto';
  ok: Scalars['Boolean'];
};

export enum TpCompanyProfileSignUpOperationType {
  ExistingCompany = 'EXISTING_COMPANY',
  NewCompany = 'NEW_COMPANY'
}

export type TpCompanyRepresentativeRelationship = {
  __typename?: 'TpCompanyRepresentativeRelationship';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  status: TpCompanyRepresentativeRelationshipStatus;
  tpCompanyProfileId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export enum TpCompanyRepresentativeRelationshipStatus {
  Approved = 'APPROVED',
  Deactivated = 'DEACTIVATED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type TpCurrentUserData = {
  __typename?: 'TpCurrentUserData';
  companyRepresentativeStatus: TpCompanyRepresentativeRelationship;
  jobseekerProfile: TpJobseekerProfile;
  representedCompany: TpCompanyProfile;
};

export enum TpDesiredEmploymentType {
  Internship = 'Internship',
  ApprenticeshipAusbildung = 'apprenticeshipAusbildung',
  DualStudyBachelor = 'dualStudyBachelor',
  DualStudyMaster = 'dualStudyMaster',
  FullTime = 'fullTime',
  PartTime = 'partTime',
  Traineeship = 'traineeship',
  Werkstudium = 'werkstudium'
}

export enum TpDesiredPosition {
  AdministrativeAssistant = 'administrativeAssistant',
  AgileScrumCoach = 'agileScrumCoach',
  AzureSpecialist = 'azureSpecialist',
  BackendDeveloper = 'backendDeveloper',
  BlockchainDeveloper = 'blockchainDeveloper',
  BusinessAnalyst = 'businessAnalyst',
  CloudEngineer = 'cloudEngineer',
  CloudSpecialist = 'cloudSpecialist',
  DataAnalyst = 'dataAnalyst',
  DataScientist = 'dataScientist',
  DevOpsSpecialist = 'devOpsSpecialist',
  DigitalMarketer = 'digitalMarketer',
  EmbeddedSystemsEngineer = 'embeddedSystemsEngineer',
  FrontendDeveloper = 'frontendDeveloper',
  FullstackDeveloper = 'fullstackDeveloper',
  HardwareDeveloper = 'hardwareDeveloper',
  IotDeveloper = 'iotDeveloper',
  ItAdministrator = 'itAdministrator',
  ItSpecialist = 'itSpecialist',
  ItSupportTechnician = 'itSupportTechnician',
  JavaDeveloper = 'javaDeveloper',
  LinuxSystemAdministrator = 'linuxSystemAdministrator',
  MarketingAssistant = 'marketingAssistant',
  MobileDeveloperAndroid = 'mobileDeveloperAndroid',
  MobileDeveloperIos = 'mobileDeveloperIos',
  NodeJsDeveloper = 'nodeJsDeveloper',
  OperationsManager = 'operationsManager',
  ProductDesigner = 'productDesigner',
  ProductManager = 'productManager',
  ProjectAssistant = 'projectAssistant',
  ProjectManager = 'projectManager',
  PythonDeveloper = 'pythonDeveloper',
  QaEngineer = 'qaEngineer',
  ReactDeveloper = 'reactDeveloper',
  RequirementsEngineer = 'requirementsEngineer',
  SalesManager = 'salesManager',
  SalesforceAdministrator = 'salesforceAdministrator',
  SecurityAdministrator = 'securityAdministrator',
  SeoManager = 'seoManager',
  SystemEngineer = 'systemEngineer',
  TechnicalArchitect = 'technicalArchitect',
  UiDesigner = 'uiDesigner',
  UiDeveloper = 'uiDeveloper',
  UiUxDesigner = 'uiUxDesigner',
  Usabilityengineer = 'usabilityengineer',
  UserResearcher = 'userResearcher',
  UxDesigner = 'uxDesigner'
}

export enum TpEducationCertificationType {
  ConfirmationOfAttendance = 'confirmationOfAttendance',
  Other = 'other',
  ProfessionalCertification = 'professionalCertification',
  RediSchoolCourse = 'rediSchoolCourse',
  UniversityDegreeDiploma = 'universityDegreeDiploma'
}

export type TpJobseekerProfile = {
  __typename?: 'TpJobseekerProfile';
  aboutYourself?: Maybe<Scalars['String']>;
  availability?: Maybe<TpAvailabilityOption>;
  behanceUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  currentlyEnrolledInCourse?: Maybe<Scalars['String']>;
  desiredEmploymentType?: Maybe<Array<TpDesiredEmploymentType>>;
  desiredPositions?: Maybe<Array<TpDesiredPosition>>;
  dribbbleUrl?: Maybe<Scalars['String']>;
  education?: Maybe<Array<EducationRecord>>;
  email: Scalars['String'];
  experience?: Maybe<Array<ExperienceRecord>>;
  federalState?: Maybe<FederalState>;
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  genderPronouns?: Maybe<Scalars['String']>;
  githubUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  ifAvailabilityIsDate_date?: Maybe<Scalars['DateTime']>;
  isHired: Scalars['Boolean'];
  isJobFair2022Participant: Scalars['Boolean'];
  isJobFair2023Participant: Scalars['Boolean'];
  isProfileVisibleToCompanies: Scalars['Boolean'];
  lastName: Scalars['String'];
  linkedInUrl?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  loopbackUserId: Scalars['String'];
  personalWebsite?: Maybe<Scalars['String']>;
  postalMailingAddress?: Maybe<Scalars['String']>;
  profileAvatarImageS3Key?: Maybe<Scalars['String']>;
  rediLocation?: Maybe<Scalars['String']>;
  stackOverflowUrl?: Maybe<Scalars['String']>;
  state: JobseekerProfileStatus;
  telephoneNumber?: Maybe<Scalars['String']>;
  topSkills?: Maybe<Array<TpTechnicalSkill>>;
  twitterUrl?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  willingToRelocate: Scalars['Boolean'];
  workingLanguages?: Maybe<Array<LanguageRecord>>;
};

export enum TpTechnicalSkill {
  AdobeCreativeSuite = 'adobeCreativeSuite',
  AdobePhotoshop = 'adobePhotoshop',
  AgileMethodology = 'agileMethodology',
  ApplicationOperation = 'applicationOperation',
  ArtificialIntellegence = 'artificialIntellegence',
  AspNet = 'aspNet',
  AtlassianConfluence = 'atlassianConfluence',
  AtlassianJira = 'atlassianJira',
  AtlassianSuite = 'atlassianSuite',
  Aws = 'aws',
  BalsamiqMockup = 'balsamiqMockup',
  Bpmn = 'bpmn',
  C = 'c',
  CPlusPlus = 'cPlusPlus',
  Cad = 'cad',
  Camunda = 'camunda',
  CloudApplications = 'cloudApplications',
  CloudComputing = 'cloudComputing',
  ConceptDevelopment = 'conceptDevelopment',
  Crm = 'crm',
  Css = 'css',
  CustomerService = 'customerService',
  CustomerSupport = 'customerSupport',
  DataAnalysis = 'dataAnalysis',
  DatabaseDesign = 'databaseDesign',
  DesignThinking = 'designThinking',
  DevOps = 'devOps',
  DomainDrivenDesign = 'domainDrivenDesign',
  DomainModelling = 'domainModelling',
  EmbeddedSystems = 'embeddedSystems',
  Figma = 'figma',
  Git = 'git',
  GoogleCloudPlatform = 'googleCloudPlatform',
  GraphicDesign = 'graphicDesign',
  Hardware = 'hardware',
  HpAlm = 'hpAlm',
  HpQualityCenter = 'hpQualityCenter',
  Html = 'html',
  Illustrator = 'illustrator',
  InformationArchitecture = 'informationArchitecture',
  InteractionDesign = 'interactionDesign',
  Invision = 'invision',
  Iot = 'iot',
  ItServiceManagement = 'itServiceManagement',
  Itil = 'itil',
  Java = 'java',
  JavaScript = 'javaScript',
  Kafka = 'kafka',
  Kanban = 'kanban',
  LeanPrinciples = 'leanPrinciples',
  Linux = 'linux',
  MacOsServer = 'macOsServer',
  MicrosoftAzure = 'microsoftAzure',
  MicrosoftOffice = 'microsoftOffice',
  NetFramework = 'netFramework',
  NetworkAdministration = 'networkAdministration',
  NetworkDesign = 'networkDesign',
  NetworkSecurity = 'networkSecurity',
  NodeJs = 'nodeJs',
  OperationsManagement = 'operationsManagement',
  OracleDatabase = 'oracleDatabase',
  Php = 'php',
  ProblemSolving = 'problemSolving',
  ProcessModelling = 'processModelling',
  ProcessOptimization = 'processOptimization',
  ProductDevelopment = 'productDevelopment',
  ProductManagement = 'productManagement',
  ProgramManagement = 'programManagement',
  ProjectManagement = 'projectManagement',
  Prototyping = 'prototyping',
  Python = 'python',
  QualitativeResearch = 'qualitativeResearch',
  QualityAssurance = 'qualityAssurance',
  QualityManagement = 'qualityManagement',
  QuantitativeResearch = 'quantitativeResearch',
  RProgrammingLanguage = 'rProgrammingLanguage',
  ReactJs = 'reactJs',
  RequirementsAnalysis = 'requirementsAnalysis',
  ResponsiveWebDesign = 'responsiveWebDesign',
  Salesforce = 'salesforce',
  SapProducts = 'sapProducts',
  Scrum = 'scrum',
  Sketch = 'sketch',
  Sketching = 'sketching',
  SoftwareArchitecture = 'softwareArchitecture',
  SoftwareDevelopmentLifecycle = 'softwareDevelopmentLifecycle',
  Sql = 'sql',
  TeamLeadership = 'teamLeadership',
  TechnicalSupport = 'technicalSupport',
  Testing = 'testing',
  Troubleshooting = 'troubleshooting',
  Typography = 'typography',
  Uml = 'uml',
  UsabilityTesting = 'usabilityTesting',
  UserCenteredDesign = 'userCenteredDesign',
  UserExperience = 'userExperience',
  UserStoryMapping = 'userStoryMapping',
  VisualBasic = 'visualBasic',
  VmWare = 'vmWare',
  WebApplications = 'webApplications',
  WebDesign = 'webDesign',
  WebDevelopment = 'webDevelopment',
  WebServices = 'webServices',
  WindowsServer = 'windowsServer',
  Wireframes = 'wireframes',
  XRay = 'xRay',
  Xml = 'xml',
  Zephyr = 'zephyr'
}

export type UpdateConProfileInput = {
  birthDate?: InputMaybe<Scalars['DateTime']>;
  categories?: InputMaybe<Array<MentoringTopic>>;
  expectations?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  githubProfileUrl?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  languages?: InputMaybe<Array<Language>>;
  lastName?: InputMaybe<Scalars['String']>;
  linkedInProfileUrl?: InputMaybe<Scalars['String']>;
  menteeCountCapacity?: InputMaybe<Scalars['Int']>;
  mentee_currentlyEnrolledInCourse?: InputMaybe<RediCourse>;
  mentee_highestEducationLevel?: InputMaybe<EducationLevel>;
  mentee_occupationCategoryId?: InputMaybe<OccupationCategory>;
  mentee_occupationJob_placeOfEmployment?: InputMaybe<Scalars['String']>;
  mentee_occupationJob_position?: InputMaybe<Scalars['String']>;
  mentee_occupationLookingForJob_what?: InputMaybe<Scalars['String']>;
  mentee_occupationOther_description?: InputMaybe<Scalars['String']>;
  mentee_occupationStudent_studyName?: InputMaybe<Scalars['String']>;
  mentee_occupationStudent_studyPlace?: InputMaybe<Scalars['String']>;
  mentor_occupation?: InputMaybe<Scalars['String']>;
  mentor_workPlace?: InputMaybe<Scalars['String']>;
  optOutOfMenteesFromOtherRediLocation?: InputMaybe<Scalars['Boolean']>;
  personalDescription?: InputMaybe<Scalars['String']>;
  profileAvatarImageS3Key?: InputMaybe<Scalars['String']>;
  slackUsername?: InputMaybe<Scalars['String']>;
  telephoneNumber?: InputMaybe<Scalars['String']>;
};

export enum UserType {
  Mentee = 'MENTEE',
  Mentor = 'MENTOR'
}
