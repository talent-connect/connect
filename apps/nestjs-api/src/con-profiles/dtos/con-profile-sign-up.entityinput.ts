import {
  Field,
  InputType,
  PartialType,
  PickType,
  IntersectionType,
} from '@nestjs/graphql'
import { ConProfileEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _ConProfileEntityProps extends ConProfileEntityProps {}

@InputType('ConProfileSignUpInput')
export class ConProfileSignUpInput extends PickType(_ConProfileEntityProps, [
  'email',
  'firstName',
  'lastName',
  'userType',
  'rediLocation',
] as const) {}
