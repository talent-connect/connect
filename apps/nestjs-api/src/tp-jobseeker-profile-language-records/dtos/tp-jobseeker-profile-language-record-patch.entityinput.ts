import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql'
import { TpJobseekerProfileLanguageRecordEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerProfileLanguageRecordEntityProps extends TpJobseekerProfileLanguageRecordEntityProps {}

@InputType('TpJobseekerProfileLanguageRecordPatchInput')
export class TpJobseekerProfileLanguageRecordPatchInput extends IntersectionType(
  PickType(_TpJobseekerProfileLanguageRecordEntityProps, ['id'] as const),
  PartialType(
    PickType(_TpJobseekerProfileLanguageRecordEntityProps, [
      'language',
      'proficiencyLevelId',
    ] as const)
  )
) {}
