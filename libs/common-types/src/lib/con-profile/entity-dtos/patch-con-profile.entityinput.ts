import {
  Field,
  InputType,
  PartialType,
  PickType,
  IntersectionType,
} from '@nestjs/graphql'
import { ConProfileEntityProps } from '../con-profile.entityprops'

@InputType()
class _ConProfileEntityProps extends ConProfileEntityProps {}

@InputType('UpdateConProfileInput')
export class PatchConProfileInput extends IntersectionType(
  PickType(_ConProfileEntityProps, ['id'] as const),
  PartialType(
    PickType(_ConProfileEntityProps, [
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
      'menteeCountCapacity',
    ] as const)
  )
) {}
