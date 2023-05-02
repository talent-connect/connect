import { InputType, PickType } from '@nestjs/graphql'
import { TpJobseekerCvLanguageRecordEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerCvLanguageRecordEntityProps extends TpJobseekerCvLanguageRecordEntityProps {}

@InputType('TpJobseekerCvLanguageRecordDeleteInput')
export class TpJobseekerCvLanguageRecordDeleteInput extends PickType(
  _TpJobseekerCvLanguageRecordEntityProps,
  ['id'] as const
) {}
