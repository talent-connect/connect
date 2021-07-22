# Data models in ReDI Connect (CON) and Talent Pool (TP)

TL;DR: this is an ER diagram of all CON/TP data models. Use it to understand the "status quo" and plan for how we'll migrate them into Salesforce.

Last updated: 21 July 2021

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
      DesiredEmploymentType_ArrayOfIds desiredEmploymentType
      string availability
      date ifAvailabilityIsDate_date
      string immigrationStatus
      string aboutYourself
      JobseekerSkill_ArrayOfIds topSkills
      Experience_ArrayOfValues experience
      Education_ArrayOfValues education
      TpJobseekerProfileState state
      date createdAt
      date updatedAt
      date gaveGdprConsentAt
      boolean isProfileVisibleToCompanies
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
      string employmentType
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

```mermaid
erDiagram
  ConMenteeOccupationCategory
  ConUserType
  DesiredEmploymentType
  EducationLevel
  Gender
  GenericPosition
  JobseekerEducationRecord
  JobseekerExperienceRecord
  JobseekerLanguageRecord
  JobseekerSkill
  Language
  MentoringTopic
  MentoringTopicGroup
  RediCourse
  RediLocation
  TpJobseekerProfileState
```

## Notes

- `MentoringSession` > minuteDuration valid values: 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180

## Static lists

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

| ConMenteeOccupationCategory |
| --------------------------- |
| id: job, label: Job (full-time/part-time)
| id: student, label: Student (enrolled at university)
| id: lookingForJob, label: Looking for a job
| id: other, label: Other

| Language |
| -------- |
| Afrikaans
| Albanian
| Amharic
| ... (about 140 values)
| Yucatec
| Zapotec
| Zulu

| MentoringTopicGroup |
| ------------------- |
| id: softwareEngineering, label: 👩‍💻 Software Engineering
| id: design, label: 👩‍💻 Software Engineering
| id: language, label: 🏄‍♀️ Other Professions
| id: otherProfessions, label: ✋ Career Support
| id: careerSupport, label: 🗣️ Language Support
| id: other, label: 🤗 Other

| MentoringTopic |
| -------------- |
| id: basicProgrammingSkills, group: softwareEngineering, label: Basic Programming Skills
| id: htmlCss, group: softwareEngineering, label: HTML & CSS
| ... (around 40 values)
| id: motivationAndEncouragement, group: other, label: Motivation & encouragement
| id: friendAndHelp, group: other, label: Be a friend and help

## Questions
## Milestones

- few
- fewfwe
- fewifjwoieffwe

## Ideas

Move some ConProfile fields into some kind of "User settings" object?
