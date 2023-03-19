import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql'
import { TpJobseekerCvEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerCvEntityProps extends TpJobseekerCvEntityProps {}

@InputType('TpJobseekerCvPatchInput')
export class TpJobseekerCvPatchInput extends IntersectionType(
  PickType(_TpJobseekerCvEntityProps, ['id']),
  PartialType(
    PickType(_TpJobseekerCvEntityProps, [
      'aboutYourself',
      'cvName',
      'desiredPositions',
      'email',
      'firstName',
      'lastName',
      'postalMailingAddress',
      'telephoneNumber',
      'topSkills',
    ] as const)
  )
) {}
