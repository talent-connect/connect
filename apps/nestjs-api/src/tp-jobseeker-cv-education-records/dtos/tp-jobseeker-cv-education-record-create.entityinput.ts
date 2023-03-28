import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql'
import { TpJobseekerCvEducationRecordEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerCvEducationRecordEntityProps extends TpJobseekerCvEducationRecordEntityProps {}

@InputType('TpJobseekerCvEducationRecordCreateInput')
export class TpJobseekerCvEducationRecordCreateInput extends IntersectionType(
  PickType(_TpJobseekerCvEducationRecordEntityProps, ['tpJobseekerCvId']),
  PartialType(
    PickType(_TpJobseekerCvEducationRecordEntityProps, [
      'certificationType',
      'current',
      'description',
      'endDateMonth',
      'endDateYear',
      'institutionCity',
      'institutionCountry',
      'institutionName',
      'startDateMonth',
      'startDateYear',
      'title',
      'sortIndex',
    ] as const)
  )
) {}
