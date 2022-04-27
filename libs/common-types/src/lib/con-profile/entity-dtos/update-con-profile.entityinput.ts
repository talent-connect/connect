import { Field, InputType, PartialType, PickType } from '@nestjs/graphql'
import {
  ConProfileSimpleEntityPropsInput,
  ConProfileSimpleEntityProps,
} from '../con-profile-simple.entityprops'

@InputType('UpdateConProfileInput', { isAbstract: true })
export class UpdateConProfileInput extends PartialType(
  PickType(ConProfileSimpleEntityPropsInput, [
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
