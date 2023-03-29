// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { AllTpJobseekerProfileLanguageRecordFieldsFragmentDoc } from '../../../../../../libs/data-access/src/lib/tp/jobseeker-profiles/language-records/tp-jobseeker-profile-language-record.fragment.generated';
export type EditableLanguagesProfilePropFragment = { __typename?: 'TpJobseekerDirectoryEntry', workingLanguages?: Array<{ __typename?: 'TpJobseekerProfileLanguageRecord', id: string, userId: string, language: Types.Language, proficiencyLevelId: Types.LanguageProficiencyLevel }> | null };

export const EditableLanguagesProfilePropFragmentDoc = `
    fragment EditableLanguagesProfileProp on TpJobseekerDirectoryEntry {
  workingLanguages {
    ...AllTpJobseekerProfileLanguageRecordFields
  }
}
    ${AllTpJobseekerProfileLanguageRecordFieldsFragmentDoc}`;