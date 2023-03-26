import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql'
import { TpJobseekerCvExperienceRecordEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerCvExperienceRecordEntityProps extends TpJobseekerCvExperienceRecordEntityProps {}

@InputType('TpJobseekerCvExperienceRecordPatchInput')
export class TpJobseekerCvExperienceRecordPatchInput extends IntersectionType(
  PickType(_TpJobseekerCvExperienceRecordEntityProps, ['id'] as const),
  PartialType(
    PickType(_TpJobseekerCvExperienceRecordEntityProps, [
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
      'sortIndex',
    ] as const)
  )
) {}
