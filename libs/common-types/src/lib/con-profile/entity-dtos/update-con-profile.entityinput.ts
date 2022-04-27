import { InputType, PickType, PartialType } from '@nestjs/graphql'
import { ConProfileEntityProps } from '@talent-connect/common-types'

@InputType()
export class UpdateConProfileInput extends PartialType(
  PickType(ConProfileEntityProps, [
    'id',
    'mentor_occupation',
    'mentor_workPlace',
    'expectations',
    'mentee_occupationCategoryId',
    'mentee_occupationJob_placeOfEmployment',
    'mentee_occupationJob_position',
    'mentee_occupationStudent_studyPlace',
    'mentee_occupationStudent_studyName',
    'mentee_occupationLookingForJob_what',
    'mentee_occupationOther_description',
    'mentee_highestEducationLevel',
    'mentee_currentlyEnrolledInCourse',
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
  ] as const)
) {}
