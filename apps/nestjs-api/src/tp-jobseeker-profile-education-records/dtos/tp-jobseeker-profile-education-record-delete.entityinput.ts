import { InputType, PickType } from '@nestjs/graphql'
import { TpJobseekerProfileEducationRecordEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerProfileEducationRecordEntityProps extends TpJobseekerProfileEducationRecordEntityProps {}

@InputType('TpJobseekerProfileEducationRecordDeleteInput')
export class TpJobseekerProfileEducationRecordDeleteInput extends PickType(
  _TpJobseekerProfileEducationRecordEntityProps,
  ['id'] as const
) {}
