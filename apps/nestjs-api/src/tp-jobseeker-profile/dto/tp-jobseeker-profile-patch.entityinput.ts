import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql'
import { TpJobseekerProfileEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerProfileEntityProps extends TpJobseekerProfileEntityProps {}

@InputType('TpJobseekerProfilePatchInput')
export class TpJobseekerProfilePatchInput extends IntersectionType(
  PickType(_TpJobseekerProfileEntityProps, ['id'] as const),
  PartialType(
    PickType(_TpJobseekerProfileEntityProps, [
      'aboutYourself',
      'availability',
      'currentlyEnrolledInCourse',
      'desiredEmploymentType',
      'desiredPositions',
      'federalState',
      'ifAvailabilityIsDate_date',
      'isHired',
      'isJobFair2022Participant',
      'isJobFair2023Participant',
      'isProfileVisibleToCompanies',
      'location',
      'profileAvatarImageS3Key',
      'rediLocation',
      'state',
      'topSkills',
      'willingToRelocate',
    ] as const)
  )
) {}
