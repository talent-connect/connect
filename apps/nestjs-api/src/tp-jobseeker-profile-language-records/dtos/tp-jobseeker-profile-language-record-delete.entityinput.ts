import { InputType, PickType } from '@nestjs/graphql'
import { TpJobseekerProfileLanguageRecordEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerProfileLanguageRecordEntityProps extends TpJobseekerProfileLanguageRecordEntityProps {}

@InputType('TpJobseekerProfileLanguageRecordDeleteInput')
export class TpJobseekerProfileLanguageRecordDeleteInput extends PickType(
  _TpJobseekerProfileLanguageRecordEntityProps,
  ['id'] as const
) {}
