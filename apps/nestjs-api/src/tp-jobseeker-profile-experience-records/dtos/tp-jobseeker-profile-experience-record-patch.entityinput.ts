import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql'
import { TpJobseekerProfileExperienceRecordEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerProfileExperienceRecordEntityProps extends TpJobseekerProfileExperienceRecordEntityProps {}

@InputType('TpJobseekerProfileExperienceRecordPatchInput')
export class TpJobseekerProfileExperienceRecordPatchInput extends IntersectionType(
  PickType(_TpJobseekerProfileExperienceRecordEntityProps, ['id'] as const),
  PartialType(
    PickType(_TpJobseekerProfileExperienceRecordEntityProps, [
      'city',
      'company',
      'country',
      'current',
      'description',
      'endDateMonth',
      'endDateYear',
      'sortIndex',
      'startDateMonth',
      'startDateYear',
      'title',
    ] as const)
  )
) {}
