import { InputType, PartialType, PickType } from '@nestjs/graphql'
import { TpJobseekerProfileEducationRecordEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerProfileEducationRecordEntityProps extends TpJobseekerProfileEducationRecordEntityProps {}

@InputType('TpJobseekerProfileEducationRecordCreateInput')
export class TpJobseekerProfileEducationRecordCreateInput extends PartialType(
  PickType(_TpJobseekerProfileEducationRecordEntityProps, [
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
) {}
