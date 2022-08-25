// THIS FILE IS GENERATED, DO NOT EDIT!
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
}

export enum CompanyTalentPoolState {
  DraftingProfile = 'DRAFTING_PROFILE',
  ProfileApproved = 'PROFILE_APPROVED',
  SubmittedForReview = 'SUBMITTED_FOR_REVIEW',
}

export type ConMenteeFavoritedMentor = {
  __typename?: 'ConMenteeFavoritedMentor'
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  menteeId: Scalars['ID']
  mentorId: Scalars['ID']
  updatedAt: Scalars['DateTime']
}

export type ConMenteeFavoritedMentorCreateMutationInputDto = {
  mentorId: Scalars['String']
}

export type ConMenteeFavoritedMentorCreateMutationOutputDto = {
  __typename?: 'ConMenteeFavoritedMentorCreateMutationOutputDto'
  ok: Scalars['Boolean']
}

export type ConMenteeFavoritedMentorDeleteMutationInputDto = {
  mentorId: Scalars['String']
}

export type ConMenteeFavoritedMentorDeleteMutationOutputDto = {
  __typename?: 'ConMenteeFavoritedMentorDeleteMutationOutputDto'
  ok: Scalars['Boolean']
}

export type ConMentoringSession = {
  __typename?: 'ConMentoringSession'
  createdAt: Scalars['DateTime']
  date: Scalars['DateTime']
  id: Scalars['ID']
  menteeId: Scalars['ID']
  mentorId: Scalars['ID']
  minuteDuration: MentoringSessionDuration
  updatedAt: Scalars['DateTime']
}

export type ConMentorshipMatch = {
  __typename?: 'ConMentorshipMatch'
  applicationText?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  expectationText?: Maybe<Scalars['String']>
  hasMenteeDismissedMentorshipApplicationAcceptedNotification?: Maybe<
    Scalars['Boolean']
  >
  id: Scalars['ID']
  ifDeclinedByMentor_chosenReasonForDecline?: Maybe<Scalars['String']>
  ifDeclinedByMentor_dateTime?: Maybe<Scalars['DateTime']>
  ifDeclinedByMentor_ifReasonIsOther_freeText?: Maybe<Scalars['String']>
  ifDeclinedByMentor_optionalMessageToMentee?: Maybe<Scalars['String']>
  matchMadeActiveOn?: Maybe<Scalars['DateTime']>
  mentee: ConProfile
  menteeId: Scalars['String']
  mentor: ConProfile
  mentorId: Scalars['String']
  mentorMessageOnComplete?: Maybe<Scalars['String']>
  mentorReplyMessageOnAccept?: Maybe<Scalars['String']>
  mentoringSessions: Array<ConMentoringSession>
  status: MentorshipMatchStatus
  updatedAt: Scalars['DateTime']
}

export type ConMentorshipMatchesAcceptMentorshipInputDto = {
  mentorReplyMessageOnAccept: Scalars['String']
  mentorshipMatchId: Scalars['String']
}

export type ConMentorshipMatchesAcceptMentorshipOutputDto = {
  __typename?: 'ConMentorshipMatchesAcceptMentorshipOutputDto'
  id: Scalars['String']
  ok: Scalars['Boolean']
}

export type ConMentorshipMatchesApplyForMentorshipInputDto = {
  applicationText: Scalars['String']
  expectationText: Scalars['String']
  mentorId: Scalars['String']
}

export type ConMentorshipMatchesApplyForMentorshipOutputDto = {
  __typename?: 'ConMentorshipMatchesApplyForMentorshipOutputDto'
  id: Scalars['String']
  ok: Scalars['Boolean']
}

export type ConMentorshipMatchesCompleteMentorshipInputDto = {
  mentorMessageOnComplete: Scalars['String']
  mentorshipMatchId: Scalars['String']
}

export type ConMentorshipMatchesCompleteMentorshipOutputDto = {
  __typename?: 'ConMentorshipMatchesCompleteMentorshipOutputDto'
  id: Scalars['String']
  ok: Scalars['Boolean']
}

export type ConMentorshipMatchesDeclineMentorshipInputDto = {
  ifDeclinedByMentor_chosenReasonForDecline: DeclineReason
  ifDeclinedByMentor_ifReasonIsOther_freeText: Scalars['String']
  ifDeclinedByMentor_optionalMessageToMentee: Scalars['String']
  mentorshipMatchId: Scalars['String']
}

export type ConMentorshipMatchesDeclineMentorshipOutputDto = {
  __typename?: 'ConMentorshipMatchesDeclineMentorshipOutputDto'
  id: Scalars['String']
  ok: Scalars['Boolean']
}

export type ConMentorshipMatchesMarkAsDismissedInputDto = {
  conMentorshipMatchId: Scalars['String']
}

export type ConMentorshipMatchesMarkAsDismissedOutputDto = {
  __typename?: 'ConMentorshipMatchesMarkAsDismissedOutputDto'
  id: Scalars['String']
  ok: Scalars['Boolean']
}

export type ConProfile = {
  __typename?: 'ConProfile'
  age?: Maybe<Scalars['Float']>
  birthDate?: Maybe<Scalars['DateTime']>
  categories: Array<MentoringTopic>
  createdAt: Scalars['DateTime']
  email: Scalars['String']
  expectations?: Maybe<Scalars['String']>
  firstName: Scalars['String']
  fullName: Scalars['String']
  gender?: Maybe<Gender>
  githubProfileUrl?: Maybe<Scalars['String']>
  id: Scalars['ID']
  ifUserMentee_activeMentorshipMatches: Scalars['Float']
  ifUserMentor_activeMentorshipMatches: Scalars['Float']
  ifUserMentor_doesntHaveAvailableMentorshipSlot: Scalars['Boolean']
  ifUserMentor_hasAvailableMentorshipSlot: Scalars['Boolean']
  languages?: Maybe<Array<ConnectProfileLanguage>>
  lastName: Scalars['String']
  linkedInProfileUrl?: Maybe<Scalars['String']>
  loopbackUserId: Scalars['String']
  menteeCountCapacity?: Maybe<Scalars['Int']>
  mentee_currentlyEnrolledInCourse?: Maybe<RediCourse>
  mentee_highestEducationLevel?: Maybe<EducationLevel>
  mentee_occupationCategoryId?: Maybe<OccupationCategory>
  mentee_occupationJob_placeOfEmployment?: Maybe<Scalars['String']>
  mentee_occupationJob_position?: Maybe<Scalars['String']>
  mentee_occupationLookingForJob_what?: Maybe<Scalars['String']>
  mentee_occupationOther_description?: Maybe<Scalars['String']>
  mentee_occupationStudent_studyName?: Maybe<Scalars['String']>
  mentee_occupationStudent_studyPlace?: Maybe<Scalars['String']>
  mentor_occupation?: Maybe<Scalars['String']>
  mentor_workPlace?: Maybe<Scalars['String']>
  mentoringSessions: Array<ConMentoringSession>
  mentorshipMatches: Array<ConMentorshipMatch>
  optOutOfMenteesFromOtherRediLocation: Scalars['Boolean']
  personalDescription?: Maybe<Scalars['String']>
  profileAvatarImageS3Key?: Maybe<Scalars['String']>
  profileStatus: ConnectProfileStatus
  rediLocation: RediLocation
  slackUsername?: Maybe<Scalars['String']>
  telephoneNumber?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  userActivatedAt?: Maybe<Scalars['DateTime']>
  userId: Scalars['String']
  userType: UserType
}

export type ConProfileSignUpInput = {
  email: Scalars['String']
  firstName: Scalars['String']
  lastName: Scalars['String']
  mentee_currentlyEnrolledInCourse?: InputMaybe<RediCourse>
  rediLocation: RediLocation
  userType: UserType
}

export enum ConnectProfileLanguage {
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
  Zulu = 'Zulu',
}

export enum ConnectProfileStatus {
  Approved = 'APPROVED',
  Deactivated = 'DEACTIVATED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}

export type CreateConMentoringSessionInput = {
  date: Scalars['DateTime']
  menteeId: Scalars['ID']
  minuteDuration: MentoringSessionDuration
}

export type CreateConProblemReportInput = {
  ifFromMentor_cancelMentorshipImmediately?: InputMaybe<Scalars['Boolean']>
  problemDescription: Scalars['String']
  reporteeProfileId: Scalars['String']
}

export enum DeclineReason {
  AnotherMentorMoreSuitable = 'anotherMentorMoreSuitable',
  NotEnoughTimeNowToBeMentor = 'notEnoughTimeNowToBeMentor',
  NotRightExpertise = 'notRightExpertise',
  Other = 'other',
}

export enum EducationLevel {
  Apprenticeship = 'apprenticeship',
  HighSchool = 'highSchool',
  MiddleSchool = 'middleSchool',
  UniversityBachelor = 'universityBachelor',
  UniversityMaster = 'universityMaster',
  UniversityPhd = 'universityPhd',
}

export type FindConProfilesArgsFilter = {
  categories?: InputMaybe<Array<MentoringTopic>>
  languages?: InputMaybe<Array<ConnectProfileLanguage>>
  locations?: InputMaybe<Array<RediLocation>>
  name?: InputMaybe<Scalars['String']>
}

export enum FirstPointOfTpContactOption {
  AlreadyVolunteerAtRedi = 'ALREADY_VOLUNTEER_AT_REDI',
  Collegue = 'COLLEGUE',
  InternetSearch = 'INTERNET_SEARCH',
  Other = 'OTHER',
  RediStudentAlumni = 'REDI_STUDENT_ALUMNI',
  RediTeamMember = 'REDI_TEAM_MEMBER',
  RediWebsite = 'REDI_WEBSITE',
  SocialMedia = 'SOCIAL_MEDIA',
}

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Other = 'Other',
}

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
  Min180 = 'MIN180',
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
  UserInterfaceDesign = 'userInterfaceDesign',
}

export enum MentorshipMatchStatus {
  Accepted = 'ACCEPTED',
  Applied = 'APPLIED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  DeclinedByMentor = 'DECLINED_BY_MENTOR',
  InvalidatedAsOtherMentorAccepted = 'INVALIDATED_AS_OTHER_MENTOR_ACCEPTED',
}

export type Mutation = {
  __typename?: 'Mutation'
  conMatchMarkMentorshipAcceptedNotificationDismissed: OkResponseMutationOutputDto
  conMenteeFavoritedMentorCreate: ConMenteeFavoritedMentorCreateMutationOutputDto
  conMenteeFavoritedMentorDelete: ConMenteeFavoritedMentorDeleteMutationOutputDto
  conMentorshipMatchesAcceptMentorship: ConMentorshipMatchesAcceptMentorshipOutputDto
  conMentorshipMatchesApplyForMentorship: ConMentorshipMatchesApplyForMentorshipOutputDto
  conMentorshipMatchesCompleteMentorship: ConMentorshipMatchesCompleteMentorshipOutputDto
  conMentorshipMatchesDeclineMentorship: ConMentorshipMatchesDeclineMentorshipOutputDto
  conMentorshipMatchesMarkAsDismissed: ConMentorshipMatchesMarkAsDismissedOutputDto
  conProblemReportCreate: OkResponseMutationOutputDto
  conProfileSignUp: OkIdResponseMutationOutputDto
  createConMentoringSession: ConMentoringSession
  patchConProfile: ConProfile
  tpCompanyProfileSignUp: TpCompanyProfileSignUpInputOutputDto
}

export type MutationConMatchMarkMentorshipAcceptedNotificationDismissedArgs = {
  conMentorshipMatchId: Scalars['String']
}

export type MutationConMenteeFavoritedMentorCreateArgs = {
  input: ConMenteeFavoritedMentorCreateMutationInputDto
}

export type MutationConMenteeFavoritedMentorDeleteArgs = {
  input: ConMenteeFavoritedMentorDeleteMutationInputDto
}

export type MutationConMentorshipMatchesAcceptMentorshipArgs = {
  input: ConMentorshipMatchesAcceptMentorshipInputDto
}

export type MutationConMentorshipMatchesApplyForMentorshipArgs = {
  input: ConMentorshipMatchesApplyForMentorshipInputDto
}

export type MutationConMentorshipMatchesCompleteMentorshipArgs = {
  input: ConMentorshipMatchesCompleteMentorshipInputDto
}

export type MutationConMentorshipMatchesDeclineMentorshipArgs = {
  input: ConMentorshipMatchesDeclineMentorshipInputDto
}

export type MutationConMentorshipMatchesMarkAsDismissedArgs = {
  input: ConMentorshipMatchesMarkAsDismissedInputDto
}

export type MutationConProblemReportCreateArgs = {
  input: CreateConProblemReportInput
}

export type MutationConProfileSignUpArgs = {
  input: ConProfileSignUpInput
}

export type MutationCreateConMentoringSessionArgs = {
  createConMentoringSessionInput: CreateConMentoringSessionInput
}

export type MutationPatchConProfileArgs = {
  patchConProfileInput: UpdateConProfileInput
}

export type MutationTpCompanyProfileSignUpArgs = {
  input: TpCompanyProfileSignUpInputDto
}

export enum OccupationCategory {
  Job = 'job',
  LookingForJob = 'lookingForJob',
  Other = 'other',
  Student = 'student',
}

export type OkIdResponseMutationOutputDto = {
  __typename?: 'OkIdResponseMutationOutputDto'
  id: Scalars['String']
  ok: Scalars['Boolean']
}

export type OkResponseMutationOutputDto = {
  __typename?: 'OkResponseMutationOutputDto'
  ok: Scalars['Boolean']
}

export type Query = {
  __typename?: 'Query'
  conMenteeFavoritedMentors: Array<ConMenteeFavoritedMentor>
  conMentoringSessions: Array<ConMentoringSession>
  conMentorshipMatch: ConMentorshipMatch
  conMentorshipMatches: Array<ConMentorshipMatch>
  conProfile: ConProfile
  conProfilesAvailableMentors: Array<ConProfile>
  myConProfile: ConProfile
  publicTpCompanyProfiles: Array<TpCompanyProfile>
  tpCompanyProfile: TpCompanyProfile
  tpCurrentUserDataGet: TpCurrentUserData
}

export type QueryConMentorshipMatchArgs = {
  id: Scalars['ID']
}

export type QueryConMentorshipMatchesArgs = {
  status?: InputMaybe<MentorshipMatchStatus>
}

export type QueryConProfileArgs = {
  id?: InputMaybe<Scalars['ID']>
  loopbackUserId?: InputMaybe<Scalars['ID']>
}

export type QueryConProfilesAvailableMentorsArgs = {
  filter: FindConProfilesArgsFilter
}

export type QueryTpCompanyProfileArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export enum RediCourse {
  AdvancedJava = 'advancedJava',
  Alumni = 'alumni',
  CloudComputing = 'cloudComputing',
  CodingFundamentals = 'codingFundamentals',
  DataAnalytics = 'dataAnalytics',
  HamburgAlumni = 'hamburg_alumni',
  HamburgHtmlCss = 'hamburg_htmlCss',
  HamburgIntroComputerScience = 'hamburg_introComputerScience',
  HamburgUxUiDesignBasics = 'hamburg_uxUiDesignBasics',
  HtmlCss = 'htmlCss',
  IntermediateJava = 'intermediateJava',
  IntroComputerScience = 'introComputerScience',
  IntroJava = 'introJava',
  Iot = 'iot',
  JavaScript = 'javaScript',
  MunichAlumni = 'munich_alumni',
  MunichBackend2 = 'munich_backend2',
  MunichCloudComputing = 'munich_cloudComputing',
  MunichCloudComputingAdvance = 'munich_cloudComputingAdvance',
  MunichDataAnalytics2 = 'munich_dataAnalytics2',
  MunichDataStructuresAlgorithmsWithGoogle = 'munich_dataStructuresAlgorithmsWithGoogle',
  MunichFrontend1 = 'munich_frontend1',
  MunichFrontend2 = 'munich_frontend2',
  MunichIntroComputerScience = 'munich_introComputerScience',
  MunichPythonIntermediate = 'munich_pythonIntermediate',
  MunichUxUiDesign = 'munich_uxUiDesign',
  NrwAlumni = 'nrw_alumni',
  NrwCloudComputing = 'nrw_cloudComputing',
  NrwDataAnalytics = 'nrw_dataAnalytics',
  NrwHtmlCss = 'nrw_htmlCss',
  NrwInfrastructureBasics = 'nrw_infrastructureBasics',
  NrwIot = 'nrw_iot',
  NrwJavascript = 'nrw_javascript',
  NrwMachineLearning = 'nrw_machineLearning',
  NrwPythonIntroduction = 'nrw_pythonIntroduction',
  NrwUxDesign = 'nrw_uxDesign',
  PythonFoundation = 'pythonFoundation',
  React = 'react',
  SalesforceFundamentals = 'salesforceFundamentals',
  UiUxDesignBasics = 'uiUxDesignBasics',
  UiUxDesignIntermediate = 'uiUxDesignIntermediate',
}

export enum RediLocation {
  Berlin = 'BERLIN',
  Hamburg = 'HAMBURG',
  Munich = 'MUNICH',
  Nrw = 'NRW',
}

export type TpCompanyProfile = {
  __typename?: 'TpCompanyProfile'
  about?: Maybe<Scalars['String']>
  companyName: Scalars['String']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  industry?: Maybe<Scalars['String']>
  isProfileVisibleToJobseekers: Scalars['Boolean']
  linkedInUrl?: Maybe<Scalars['String']>
  location?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  profileAvatarImageS3Key?: Maybe<Scalars['String']>
  state: CompanyTalentPoolState
  tagline?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  website?: Maybe<Scalars['String']>
}

export type TpCompanyProfileSignUpInputDto = {
  companyIdOrName: Scalars['String']
  firstName: Scalars['String']
  firstPointOfContact: FirstPointOfTpContactOption
  firstPointOfContactOther?: InputMaybe<Scalars['String']>
  lastName: Scalars['String']
  operationType: TpCompanyProfileSignUpOperationType
}

export type TpCompanyProfileSignUpInputOutputDto = {
  __typename?: 'TpCompanyProfileSignUpInputOutputDto'
  ok: Scalars['Boolean']
}

export enum TpCompanyProfileSignUpOperationType {
  ExistingCompany = 'EXISTING_COMPANY',
  NewCompany = 'NEW_COMPANY',
}

export type TpCompanyRepresentativeRelationship = {
  __typename?: 'TpCompanyRepresentativeRelationship'
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  status: TpCompanyRepresentativeRelationshipStatus
  tpCompanyProfileId: Scalars['String']
  updatedAt: Scalars['DateTime']
  userId: Scalars['String']
}

export enum TpCompanyRepresentativeRelationshipStatus {
  Approved = 'APPROVED',
  Deactivated = 'DEACTIVATED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}

export type TpCurrentUserData = {
  __typename?: 'TpCurrentUserData'
  companyRepresentativeStatus: TpCompanyRepresentativeRelationship
  representedCompany: TpCompanyProfile
}

export type UpdateConProfileInput = {
  birthDate?: InputMaybe<Scalars['DateTime']>
  categories?: InputMaybe<Array<MentoringTopic>>
  expectations?: InputMaybe<Scalars['String']>
  firstName?: InputMaybe<Scalars['String']>
  gender?: InputMaybe<Gender>
  githubProfileUrl?: InputMaybe<Scalars['String']>
  id: Scalars['ID']
  languages?: InputMaybe<Array<ConnectProfileLanguage>>
  lastName?: InputMaybe<Scalars['String']>
  linkedInProfileUrl?: InputMaybe<Scalars['String']>
  menteeCountCapacity?: InputMaybe<Scalars['Int']>
  mentee_currentlyEnrolledInCourse?: InputMaybe<RediCourse>
  mentee_highestEducationLevel?: InputMaybe<EducationLevel>
  mentee_occupationCategoryId?: InputMaybe<OccupationCategory>
  mentee_occupationJob_placeOfEmployment?: InputMaybe<Scalars['String']>
  mentee_occupationJob_position?: InputMaybe<Scalars['String']>
  mentee_occupationLookingForJob_what?: InputMaybe<Scalars['String']>
  mentee_occupationOther_description?: InputMaybe<Scalars['String']>
  mentee_occupationStudent_studyName?: InputMaybe<Scalars['String']>
  mentee_occupationStudent_studyPlace?: InputMaybe<Scalars['String']>
  mentor_occupation?: InputMaybe<Scalars['String']>
  mentor_workPlace?: InputMaybe<Scalars['String']>
  optOutOfMenteesFromOtherRediLocation?: InputMaybe<Scalars['Boolean']>
  personalDescription?: InputMaybe<Scalars['String']>
  profileAvatarImageS3Key?: InputMaybe<Scalars['String']>
  slackUsername?: InputMaybe<Scalars['String']>
  telephoneNumber?: InputMaybe<Scalars['String']>
}

export enum UserType {
  Mentee = 'MENTEE',
  Mentor = 'MENTOR',
}
