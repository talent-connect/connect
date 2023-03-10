import { InputType, PickType } from '@nestjs/graphql'
import { TpJobListingEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobListingEntityProps extends TpJobListingEntityProps {}

@InputType('TpJobListingDeleteInput')
export class TpJobListingDeleteInput extends PickType(
  _TpJobListingEntityProps,
  ['id'] as const
) {}
