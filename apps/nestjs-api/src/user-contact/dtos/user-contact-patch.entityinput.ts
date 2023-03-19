import { InputType, PartialType, PickType } from '@nestjs/graphql'
import { UserContactEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _UserContactEntityProps extends UserContactEntityProps {}

@InputType('UserContactPatchInput')
export class UserContactPatchInput extends PartialType(
  PickType(_UserContactEntityProps, [
    'behanceUrl',
    'birthDate',
    'dribbbleUrl',
    'firstName',
    'gender',
    'genderPronouns',
    'githubProfileUrl',
    'howDidHearAboutRediKey',
    'howDidHearAboutRediOtherText',
    'lastName',
    'linkedInProfileUrl',
    'personalDescription',
    'personalWebsite',
    'postalMailingAddress',
    'slackUsername',
    'stackOverflowUrl',
    'telephoneNumber',
    'twitterUrl',
  ] as const)
) {}
