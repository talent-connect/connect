import { InputType, PickType } from '@nestjs/graphql'
import { TpJobseekerProfileExperienceRecordEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerProfileExperienceRecordEntityProps extends TpJobseekerProfileExperienceRecordEntityProps {}

@InputType('TpJobseekerProfileExperienceRecordDeleteInput')
export class TpJobseekerProfileExperienceRecordDeleteInput extends PickType(
  _TpJobseekerProfileExperienceRecordEntityProps,
  ['id'] as const
) {}
