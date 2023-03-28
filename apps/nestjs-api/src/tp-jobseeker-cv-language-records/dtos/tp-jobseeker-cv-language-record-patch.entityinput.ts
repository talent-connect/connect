import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql'
import { TpJobseekerCvLanguageRecordEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerCvLanguageRecordEntityProps extends TpJobseekerCvLanguageRecordEntityProps {}

@InputType('TpJobseekerCvLanguageRecordPatchInput')
export class TpJobseekerCvLanguageRecordPatchInput extends IntersectionType(
  PickType(_TpJobseekerCvLanguageRecordEntityProps, ['id'] as const),
  PartialType(
    PickType(_TpJobseekerCvLanguageRecordEntityProps, [
      'language',
      'proficiencyLevelId',
    ] as const)
  )
) {}
