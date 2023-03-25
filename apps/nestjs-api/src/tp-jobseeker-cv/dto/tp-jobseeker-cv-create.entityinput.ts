import { InputType, PartialType, PickType } from '@nestjs/graphql'
import { TpJobseekerCvEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerCvEntityProps extends TpJobseekerCvEntityProps {}

@InputType('TpJobseekerCvCreateInput')
export class TpJobseekerCvCreateInput extends PartialType(
  PickType(_TpJobseekerCvEntityProps, [
    'aboutYourself',
    'availability',
    'behanceUrl',
    'cvName',
    'desiredEmploymentType',
    'desiredPositions',
    'dribbbleUrl',
    'email',
    'firstName',
    'githubUrl',
    'ifAvailabilityIsDate_date',
    'immigrationStatus',
    'lastName',
    'linkedInUrl',
    'location',
    'personalWebsite',
    'postalMailingAddress',
    'profileAvatarImageS3Key',
    'stackOverflowUrl',
    'telephoneNumber',
    'topSkills',
    'twitterUrl',
    'willingToRelocate',
  ] as const)
) {}
