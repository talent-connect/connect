import { InputType, PartialType, PickType } from '@nestjs/graphql'
import { TpJobseekerCvEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobseekerCvEntityProps extends TpJobseekerCvEntityProps {}

@InputType('TpJobseekerCvCreateInput')
export class TpJobseekerCvCreateInput extends PartialType(
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
) {}
