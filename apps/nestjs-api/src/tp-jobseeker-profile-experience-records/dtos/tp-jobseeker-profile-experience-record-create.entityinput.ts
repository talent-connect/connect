import { InputType, PartialType, PickType } from '@nestjs/graphql'
import { TpJobseekerProfileExperienceRecordEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerProfileExperienceRecordEntityProps extends TpJobseekerProfileExperienceRecordEntityProps {}

@InputType('TpJobseekerProfileExperienceRecordCreateInput')
export class TpJobseekerProfileExperienceRecordCreateInput extends PartialType(
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
    'sortIndex',
  ] as const)
) {}
