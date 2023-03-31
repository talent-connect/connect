import { InputType, PickType } from '@nestjs/graphql'
import { TpJobseekerCvExperienceRecordEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerCvExperienceRecordEntityProps extends TpJobseekerCvExperienceRecordEntityProps {}

@InputType('TpJobseekerCvExperienceRecordDeleteInput')
export class TpJobseekerCvExperienceRecordDeleteInput extends PickType(
  _TpJobseekerCvExperienceRecordEntityProps,
  ['id'] as const
) {}
