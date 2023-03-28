import {
  Field,
  InputType,
  PartialType,
  PickType,
  IntersectionType,
} from '@nestjs/graphql'
import { ConMentoringSessionEntityProps } from '../con-mentoring-session.entityprops'

@InputType()
class _ConMentoringSessionntityProps extends ConMentoringSessionEntityProps {}

@InputType('CreateConMentoringSessionInput')
export class CreateConMentoringSessionInput extends PickType(
  _ConMentoringSessionntityProps,
  ['date', 'minuteDuration', 'menteeId'] as const
) {}
