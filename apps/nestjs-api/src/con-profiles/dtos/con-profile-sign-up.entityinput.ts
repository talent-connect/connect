import { InputType, PickType } from '@nestjs/graphql'
import { ConProfileEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _ConProfileEntityProps extends ConProfileEntityProps {}

@InputType('ConProfileSignUpInput')
export class ConProfileSignUpInput extends PickType(_ConProfileEntityProps, [
  'email',
  'userType',
  'rediLocation',
  'mentor_workPlace',
  'mentor_isPartnershipMentor',
] as const) {}
