import { Field, InputType, PartialType, PickType } from '@nestjs/graphql'
import { ConProfileEntityProps } from '../con-profile.entityprops'

@InputType()
class _ConProfileEntityProps extends ConProfileEntityProps {}

@InputType('UpdateConProfileInput')
export class UpdateConProfileInput extends PickType(_ConProfileEntityProps, [
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
] as const) {}
