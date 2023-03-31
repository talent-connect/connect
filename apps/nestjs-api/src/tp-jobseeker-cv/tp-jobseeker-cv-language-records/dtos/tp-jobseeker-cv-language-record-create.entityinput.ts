import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql'
import { TpJobseekerCvLanguageRecordEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerCvLanguageRecordEntityProps extends TpJobseekerCvLanguageRecordEntityProps {}

@InputType('TpJobseekerCvLanguageRecordCreateInput')
export class TpJobseekerCvLanguageRecordCreateInput extends IntersectionType(
  PickType(_TpJobseekerCvLanguageRecordEntityProps, ['tpJobseekerCvId']),
  PartialType(
    PickType(_TpJobseekerCvLanguageRecordEntityProps, [
      'language',
      'proficiencyLevelId',
    ] as const)
  )
) {}
