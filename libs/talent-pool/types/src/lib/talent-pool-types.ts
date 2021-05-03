import { Language } from '@talent-connect/shared-types'

export type TpProfile = {
  desiredPositions: DesiredPositions[]
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  personalWebsite: string
  workingLanguage: Language[]
  yearsOfRelevantExperience: string
  desiredEmploymentType: string
  availability: string
  aboutYourself: string
  topSkills: TopSkill[]
  experience: ExperienceRecord[]
  education: EducationRecord[]

  createdAt: Date
}

type ExperienceRecord = {
  title: string
  company: string

  startDate: Date
  endDate: Date | 'current'
  rolesResponsibilities: string
}

type EducationRecord = {
  type: string
  institutionName: string
  startDate: Date
  endDate: Date | 'current'
  description: string
}

const exampleProfile: TpProfile = {
  desiredPositions: ['frontendEngineer'],
  id: 'abc123',
  firstName: 'Eric',
  lastName: 'Bolikowski',
  email: 'eric@binarylights.com',
  phoneNumber: '0176 4368 9941',
  address: 'Bla bla bla my address in Berlin',
  personalWebsite: 'https://www.binarylights.com',
  workingLanguage: ['Norwegian', 'English'],
  yearsOfRelevantExperience: '10+',
  desiredEmploymentType: 'Freelance',
  availability: 'Immediately',
  aboutYourself:
    "Hello, I like cats and I'm very enaged in ReDI School. Are you ReDI?",
  topSkills: ['jest', 'attentiveToDetail'],
  experience: [
    {
      title: 'Founder',
      company: 'Binary Lights',
      startDate: new Date(),
      endDate: 'current',
      rolesResponsibilities: 'blabla',
    },
  ],
  education: [
    {
      type: 'highSchool',
      institutionName: 'St. Olav VGS',
      startDate: new Date(),
      endDate: new Date(),
      description: 'Very very nice, yes yes',
    },
  ],
  createdAt: new Date(),
}

export type DesiredPositions =
  | 'frontendEngineer'
  | 'javascriptDeveloper'
  | 'juniorFrontendDeveloper'

export type TopSkill = 'attentiveToDetail' | 'jest' | 'accessibility'
