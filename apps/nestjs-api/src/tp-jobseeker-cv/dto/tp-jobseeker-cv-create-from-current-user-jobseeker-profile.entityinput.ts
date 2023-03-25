import { InputType, PartialType, PickType } from '@nestjs/graphql'
import { TpJobseekerCvEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerCvEntityProps extends TpJobseekerCvEntityProps {}

@InputType('TpJobseekerCvCreateFromCurrentUserJobseekerProfileInput')
export class TpJobseekerCvCreateFromCurrentUserJobseekerProfileInput extends PartialType(
  PickType(_TpJobseekerCvEntityProps, ['cvName'] as const)
) {}
