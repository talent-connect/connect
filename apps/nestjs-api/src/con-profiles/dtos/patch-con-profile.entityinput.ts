import { InputType, PartialType, PickType } from '@nestjs/graphql'
import { ConProfileEntityProps } from '@talent-connect/common-types'

@InputType({ isAbstract: true })
class _ConProfileEntityProps extends ConProfileEntityProps {}

@InputType('UpdateConProfileInput')
export class PatchConProfileInput extends PartialType(
  PickType(_ConProfileEntityProps, [
    'mentor_occupation',
    'mentor_workPlace',
    'mentor_isPartnershipMentor',
    'expectations',
    'mentee_occupationCategoryId',
    'mentee_occupationJob_placeOfEmployment',
    'mentee_occupationJob_position',
    'mentee_occupationStudent_studyPlace',
    'mentee_occupationStudent_studyName',
    'mentee_occupationLookingForJob_what',
    'mentee_occupationOther_description',
    'mentee_highestEducationLevel',
    'profileAvatarImageS3Key',
    'firstName',
    'lastName',
    'gender',
    'birthDate',
    'languages',
    'personalDescription',
    'linkedInProfileUrl',
    'githubProfileUrl',
    'slackUsername',
    'telephoneNumber',
    'categories',
    'optOutOfMenteesFromOtherRediLocation',
    'menteeCountCapacity',
    'isSubscribedToCONMarketingEmails',
  ] as const)
) {}
