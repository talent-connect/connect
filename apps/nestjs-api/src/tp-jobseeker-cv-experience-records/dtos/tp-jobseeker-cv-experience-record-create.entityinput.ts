import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql'
import { TpJobseekerCvExperienceRecordEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerCvExperienceRecordEntityProps extends TpJobseekerCvExperienceRecordEntityProps {}

@InputType('TpJobseekerCvExperienceRecordCreateInput')
export class TpJobseekerCvExperienceRecordCreateInput extends IntersectionType(
  PickType(_TpJobseekerCvExperienceRecordEntityProps, ['tpJobseekerCvId']),
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
