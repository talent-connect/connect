# Data models in ReDI Connect (CON) and Talent Pool (TP)

> **TL;DR: this is an ER diagram of all CON/TP data models with companion notes. Use it to understand the "status quo" and to plan for how we'll migrate them into Salesforce.**

To view the below bumbo-jumbo visually as a ER (Entity-Relationship) diagram, please [install this browser extension](https://chrome.google.com/webstore/detail/markdown-diagrams/pmoglnmodacnbbofbgcagndelmgaclel/related).

```mermaid
erDiagram
    RedUser {
      string id
      string email
    }
    AccessToken {
      string id
      number ttl
      string created
      string userId
    }

    ConProfile {
      RediLocation rediLocation
      ConUserType userType
      string firstName
      string lastName
      Gender gender
      date birthDate
      string contactEmail
      string profileAvatarImageS3Key
      string linkedInProfileUrl
      string githubProfileUrl
      string slackUsername
      string telephoneNumber
      Language_ArrayOfValues languages
      string personalDescription
      string expectations
      string mentor_occupation
      string mentor_workPlace
      ConMenteeOccupationCategory mentee_occupationCategoryId
      string mentee_occupationJob_placeOfEmployment
      string mentee_occupationJob_position
      string mentee_occupationStudent_studyPlace
      string mentee_occupationStudent_studyName
      string mentee_occupationLookingForJob_what
      string mentee_occupationOther_description
      EducationLevel mentee_highestEducationLevel
      RediCourse mentee_currentlyEnrolledInCourse


      MentoringTopic_ArrayOfIds mentoringTopics

      ConProfile_ArrayOfIds favouritedRedProfileIds
      boolean optOutOfMenteesFromOtherRediLocation

      boolean userActivated

      date gaveGdprConsentAt

      date createdAt
      date updatedAt

    }
    ConProfile_Mentor
    ConProfile_Mentee
    ConMentoringSession {
      date date
      number minuteDuration
    }
    ConMatch {
      string id
      RedMatchStatus status
      date matchMadeActiveOn
      string applicationText
      string mentorReplyMessageOnAccept
      string mentorMessageOnComplete
      boolean hasMenteeDismissedMentorshipApplicationAcceptedNotification
    }


    TpJobseekerProfile {
      string id
      string firstName
      string lastName
      string contactEmail
      RediCourse currentlyEnrolledInCourse
      string genderPronouns
      string profileAvatarImageS3Key
      GenericPosition_ArrayOfIds desiredPositions
      string phoneNumber
      string postalMailingAddress
      string location
      string personalWebsite
      string githubUrl
      string linkedInUrl
      string twitterUrl
      string behanceUrl
      string stackOverflowUrl
      string dribbbleUrl
      LanguageRecord_ArrayOfIds workingLanguages
      string yearsOfRelevantExperience
      GenericEmploymentType_ArrayOfIds desiredEmploymentType
      TpJobseekerProfileAvailability availability
      date ifAvailabilityIsDate_date
      ImmigrationStatus immigrationStatus
      string aboutYourself
      JobseekerSkill_ArrayOfIds topSkills
      TpJobseekerProfileExperienceRecord_ArrayOfValues experience
      TpJobseekerProfileEducationRecord_ArrayOfValues education
      TpJobseekerProfileState state
      date createdAt
      date updatedAt
      date gaveGdprConsentAt
      boolean isProfileVisibleToCompanies
    }

    TpJobseekerProfileExperienceRecord {
      string uuid 
      string title 
      string company 
      string description 
      number startDateMonth 
      number startDateYear 
      number endDateMonth 
      number endDateYear 
      boolean current 
    }
    TpJobseekerProfileEducationRecord {
      string uuid 
      string type 
      string title 
      string institutionName 
      string description 
      EducationCertificationType certificationType 
      number startDateMonth 
      number startDateYear 
      number endDateMonth 
      number endDateYear 
      boolean current 
    }


    TpJobseekerCv {
      string cvName
      all Same_As_TpJobseekerProfile
    }

    TpCompanyProfile {
      string id
      string firstName
      string lastName
      string contactEmail
      string profileAvatarImageS3Key
      string companyName
      string location
      string tagline
      string industry
      string website
      string linkedInUrl
      string phoneNumber
      string about
      date createdAt
      date updatedAt
    }

    TpJobListing {
      string id
      string title
      string location
      string summary
      JobseekerSkill_ArrayOfIds idealTechnicalSkills
      GenericPosition_ArrayOfIds relatesToPositions
      GenericEmploymentType_ArrayOfIds employmentType
      string languageRequirements
      string desiredExperience
      string salaryRange
      string tpCompanyProfileId
      date createdAt
      date updatedAt
    }

    RedUser ||--o{ AccessToken : "authenticates via"
    RedUser ||--o| ConProfile_Mentor : "becomes a mentor via"
    RedUser ||--o| ConProfile_Mentee : "becomes a mentee via"
    RedUser ||--o| TpJobseekerProfile : "becomes a company via"
    RedUser ||--o| TpCompanyProfile : "becomes a company representative via"
    RedUser ||--o{ TpJobseekerCv : "writes"
    RedUser ||--o{ TpJobListing : "owns"
    ConMatch ||--|{ ConProfile_Mentor : "relates to"
    ConMatch ||--|{ ConProfile_Mentee : "relates to"
    ConMentoringSession }|--|| ConProfile_Mentor : "done by"
    ConMentoringSession }|--|| ConProfile_Mentee : "given to"

    TpCompanyProfile ||--o{ TpJobListing : owns


```

## Static data lists
(...used in dropdowns, checkboxes, blabla)

- ConMenteeOccupationCategory
- ConUserType
- DesiredEmploymentType
- EducationCertificationType
- EducationLevel
- Gender
- GenericEmploymentType
- GenericPosition
- ImmigrationStatus
- JobseekerEducationRecord
- JobseekerExperienceRecord
- JobseekerLanguageRecord
- JobseekerSkill
- Language
- MentoringTopic
- MentoringTopicGroup
- RediCourse
- RediLocation
- RedMatchStatus
- TpJobseekerProfileAvailability
- TpJobseekerProfileState

## Notes

- `MentoringSession` > minuteDuration valid values: 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180

## Static lists



| ConMenteeOccupationCategory |
| --------------------------- |
| id: job, label: Job (full-time/part-time)
| id: student, label: Student (enrolled at university)
| id: lookingForJob, label: Looking for a job
| id: other, label: Other

| ConUserType |
| --------------------------- |
| mentor
| mentee
| public-sign-up-mentor-pending-review
| public-sign-up-mentee-pending-review
| public-sign-up-mentor-rejected
| public-sign-up-mentee-rejected

| EducationCertificationType |
| --------------------------- |
| id: confirmationOfAttendance, label: Confirmation of attendance
| id: professionalCertification, label: Professional certification
| id: rediSchoolCourse, label: ReDI School Course
| id: universityDegreeDiploma, label: University degree / diploma
| id: other, label: Other

| EducationLevel |
| --------------------------- |
| id: middleSchool, label: Middle School
| id: highSchool, label: High School
| id: apprenticeship, label: Apprenticeship
| id: universityBachelor, label: University Degree (Bachelor)
| id: universityMaster, label: University Degree (Master)
| id: universityPhd, label: University Degree (PhD)

| Gender |
| -------------- |
| id: male, label: Male
| id: female, label: Female
| id: other, label: Other

| GenericEmploymentType |
| --------------------------- |
| id: partTimeEmployment, label: Part-time employment
| id: fullTimeEmployment, label: Full-time employment
| id: werkstudium, label: Werkstudent*in (working student position)
| id: internship, label: Internship
| id: apprenticeship, label: Apprenticeship (Ausbildung)
| id: selfEmployed, label: Self-employed
| id: freelance, label: Freelance
| id: contract, label: Contract
| id: traineeship, label: Traineeship

| GenericPosition |
| --------------------------- |
  {
		id: 'administrativeAssistant',
		label: 'Administrative Assistant',
	},
	{
		id: 'agileScrumCoach',
		label: 'Agile/SCRUM Coach',
	},
	{
		id: 'azureSpecialist',
		label: 'Azure Specialist',
	},
	{
		id: 'backendDeveloper',
		label: 'Backend Developer',
	},
	{
		id: 'blockchainDeveloper',
		label: 'Blockchain Developer',
	},
	{
		id: 'businessAnalyst',
		label: 'Business Analyst',
	},
	{
		id: 'cloudEngineer',
		label: 'Cloud Engineer'
	},
	{
		id: 'cloudSpecialist',
		label: 'Cloud Specialist'
	},
	{
		id: 'dataAnalyst',
		label: 'Data Analyst',
	},
	{
		id: 'dataScientist',
		label: 'Data Scientist',
	},
	{
		id: 'devOpsSpecialist',
		label: 'DevOps Specialist',
	},
	{
		id: 'digitalMarketer',
		label: 'Digital Marketer',
	},
	{
		id: 'frontendDeveloper',
		label: 'Frontend Developer',
	},
	{
		id: 'fullstackDeveloper',
		label: 'Fullstack Developer',
	},
	{
		id: 'itAdministrator',
		label: 'IT Administrator'
	},
	{
		id: 'itSpecialist',
		label: 'IT Specialist'
	},
	{
		id: 'itSupportTechnician',
		label: 'IT Support Technician'
	},
	{
		id: 'javaDeveloper',
		label: 'Java Developer',
	},
	{
		id: 'linuxSystemAdministrator',
		label: 'Linux System Administrator'
	},
	{
		id: 'marketingAssistant',
		label: 'Marketing Assistant'
	},
	{
		id: 'mobileDeveloperAndroid',
		label: 'Mobile Developer (Android)'
	},
	{
		id: 'mobileDeveloperIos',
		label: 'Mobile Developer (iOS)'
	},
	{
		id: 'nodeJsDeveloper',
		label: 'Node.js Developer',
	},
	{
		id: 'operationsManager',
		label: 'Operations Manager',
	},
	{
		id: 'productDesigner',
		label: 'Product Designer',
	},
	{
		id: 'productManager',
		label: 'Product Manager',
	},
	{
		id: 'projectAssistant',
		label: 'Project Assistant',
	},
	{
		id: 'projectManager',
		label: 'Project Manager',
	},
	{
		id: 'pythonDeveloper',
		label: 'Python Developer',
	},
	{
		id: 'qaEngineer',
		label: 'QA Engineer',
	},
	{
		id: 'reactDeveloper',
		label: 'React Developer',
	},
	{
		id: 'requirementsEngineer',
		label: 'Requirements Engineer',
	},
	{
		id: 'salesforceAdministrator',
		label: 'Salesforce Administrator',
	},
	{
		id: 'salesManager',
		label: 'Sales Manager',
	},
	{
		id: 'securityAdministrator',
		label: 'Security Administrator',
	},
	{
		id: 'SEO Manager',
		label: 'SEO Manager',
	},
	{
		id: 'systemEngineer',
		label: 'System Engineer',
	},
	{
		id: 'technicalArchitect',
		label: 'Technical Architect',
	},
	{
		id: 'uiDesigner',
		label: 'UI Designer',
	},
	{
		id: 'uiDeveloper',
		label: 'UI Developer',
	},
	{
		id: 'uiUxDesigner',
		label: 'UI/UX Designer',
	},
	{
		id: 'usabilityengineer',
		label: 'Usability Engineer',
	},
	{
		id: 'userResearcher',
		label: 'User Researcher',
	},
	{
		id: 'uxDesigner',
		label: 'UX Designer',
	}

| ImmigrationStatus |
| --------------------------- |
| label: EU-Citizenship or unlimited residence permission (Niederlassungserlaubnis), id: euCitizenshipOrUnlimitedResidencePermissionNiederlassungserlaubnis
| label: EU Blue card (Blaue Karte), id: euBlueCardBlaueKarte
| label: Temporary residence permission (Aufenthaltstitel), id: temporaryResidencePermissionAufenthaltstitel
| label: Visa (Nationalvisum or Jobseeker visum), id: visaNationalvisumOrJobseekerVisum
| label: Student visa, id: studentVisa
| label: Schengen visa, id: schengenVisa

| Language |
| -------- |
| Afrikaans
| Albanian
| Amharic
| ... (about 140 values)
| Yucatec
| Zapotec
| Zulu

| MentoringTopic |
| -------------- |
| id: basicProgrammingSkills, group: softwareEngineering, label: Basic Programming Skills
| id: htmlCss, group: softwareEngineering, label: HTML & CSS
| ... (around 40 values)
| id: motivationAndEncouragement, group: other, label: Motivation & encouragement
| id: friendAndHelp, group: other, label: Be a friend and help

| MentoringTopicGroup |
| ------------------- |
| id: softwareEngineering, label: 👩‍💻 Software Engineering
| id: design, label: 👩‍💻 Software Engineering
| id: language, label: 🏄‍♀️ Other Professions
| id: otherProfessions, label: ✋ Career Support
| id: careerSupport, label: 🗣️ Language Support
| id: other, label: 🤗 Other

| RediCourse |
| --------------------------- |
| id: introPython, label: Intro to Python, location: berlin,
| id: dataAnalytics, label: Data Analytics, location: berlin,
| id: htmlCss, label: HTML & CSS, location: berlin,
| id: javaScript, label: JavaScript, location: berlin,
| id: react, label: React, location: berlin,
| id: introJava, label: Intro to Java, location: berlin,
| id: intermediateJava, label: Programming with Java, location: berlin,
| id: introComputerScience, label: Intro to Computer Science, location: berlin,
| id: salesforceFundamentals, label: Salesforce Fundamentals, location: berlin,
| id: azureFundamentals, label: Azure Fundamentals, location: berlin,
| id: webDesignFundamentals, label: Web Design Fundamentals, location: berlin,
| id: uiUxDesign, label: UX/UI Design, location: berlin,
| id: alumni, label: I'm a ReDI School alumni (I took a course before), location: berlin,
| id: munich_dcp_spring2021_introductionToComputerScience, label: Introduction to computer science, location: munich,
| id: munich_dcp_spring2021_pythonIntermediate, label: Python Intermediate, location: munich,
| id: munich_dcp_spring2021_frontEndDevelopment, label: Front-end development, location: munich,
| id: munich_dcp_spring2021_react, label: React, location: munich,
| id: munich_dcp_spring2021_backendDevelopment, label: Back-end development, location: munich,
| id: munich_dcp_spring2021_dataScience, label: Data Science, location: munich,
| id: munich_dcp_spring2021_cloudComputing, label: Cloud computing, location: munich,
| id: munich_alumni, label: I'm a ReDI School alumni (I took a course before), location: munich,
| id: nrw_webDesignFundamentals, label: Web Design Fundamentals, location: nrw,
| id: nrw_htmlCsss, label: HTML & CSS, location: nrw,
| id: nrw_introductionToPython, label: Introduction to Python, location: nrw,
| id: nrw_networkingFundamentals, label: Networking Fundamentals, location: nrw,
| id: nrw_alumni, label: I'm a ReDI School alumni (I took a course before), location: nrw,

| RediLocation |
| ------------ |
| berlin
| munich
| nrw

| RedMatchStatus |
| -------------- |
| applied
| invalidated-as-other-mentor-accepted
| accepted
| completed
| cancelled

| TpJobseekerProfileAvailability |
| --------------------------- |
| id: immediately, label: Immediately
| id: oneMonthNotice, label: One month notice
| id: twoMonthNotice, label: Two months notice
| id: threeMonthNotice, label: Three months notice
| id: date, label: Date





## Questions
## Milestones

- few
- fewfwe
- fewifjwoieffwe

## Ideas

Move some ConProfile fields into some kind of "User settings" object?
