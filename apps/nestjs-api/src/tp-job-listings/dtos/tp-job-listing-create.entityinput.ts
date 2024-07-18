import { InputType, PartialType, PickType } from '@nestjs/graphql'
import { TpJobListingEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _TpJobListingEntityProps extends TpJobListingEntityProps {}

@InputType('TpJobListingCreateInput')
export class TpJobListingCreateInput extends PartialType(
  PickType(_TpJobListingEntityProps, [
    'employmentType',
    'idealTechnicalSkills',
    'isRemotePossible',
    'languageRequirements',
    'location',
    'relatesToPositions',
    'salaryRange',
    'summary',
    'title',
    'federalState',
    'contactFirstName',
    'contactLastName',
    'contactPhoneNumber',
    'contactEmailAddress',
  ] as const)
) {}
