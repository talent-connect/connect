import { InputType, PickType } from '@nestjs/graphql'
import { TpJobseekerCvEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerCvEntityProps extends TpJobseekerCvEntityProps {}

@InputType('TpJobseekerCvDeleteInput')
export class TpJobseekerCvDeleteInput extends PickType(
  _TpJobseekerCvEntityProps,
  ['id']
) {}
