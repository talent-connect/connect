import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql'
import { TpJobListingEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobListingEntityProps extends TpJobListingEntityProps {}

@InputType('TpJobListingPatchInput')
export class TpJobListingPatchInput extends IntersectionType(
  PickType(_TpJobListingEntityProps, ['id'] as const),
  PartialType(
    PickType(_TpJobListingEntityProps, [
      'employmentType',
      'federalState',
      'idealTechnicalSkills',
      'isRemotePossible',
      'languageRequirements',
      'location',
      'relatesToPositions',
      'salaryRange',
      'summary',
      'title',
      'federalState',
      'firstName',
      'lastName',
      'phoneNumber',
      'email',
      'expiresAt',
    ] as const)
  )
) {}
