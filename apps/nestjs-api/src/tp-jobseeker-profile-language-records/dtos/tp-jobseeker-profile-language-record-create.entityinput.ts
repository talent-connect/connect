import { InputType, PartialType, PickType } from '@nestjs/graphql'
import { TpJobseekerProfileLanguageRecordEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerProfileLanguageRecordEntityProps extends TpJobseekerProfileLanguageRecordEntityProps {}

@InputType('TpJobseekerProfileLanguageRecordCreateInput')
export class TpJobseekerProfileLanguageRecordCreateInput extends PartialType(
  PickType(_TpJobseekerProfileLanguageRecordEntityProps, [
    'language',
    'proficiencyLevelId',
  ] as const)
) {}
