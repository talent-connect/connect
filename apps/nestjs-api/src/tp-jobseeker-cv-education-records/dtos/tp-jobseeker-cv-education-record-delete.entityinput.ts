import { InputType, PickType } from '@nestjs/graphql'
import { TpJobseekerCvEducationRecordEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerCvEducationRecordEntityProps extends TpJobseekerCvEducationRecordEntityProps {}

@InputType('TpJobseekerCvEducationRecordDeleteInput')
export class TpJobseekerCvEducationRecordDeleteInput extends PickType(
  _TpJobseekerCvEducationRecordEntityProps,
  ['id'] as const
) {}
