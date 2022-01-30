import {
  Button,
  FormDraggableAccordion,
  FormSelect,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import { LANGUAGES } from '@talent-connect/shared-config'
import {
  LanguageRecord,
  TpJobSeekerCv,
  TpJobSeekerProfile,
} from '@talent-connect/shared-types'
import {
  languageProficiencyLevels,
  languageProficiencyLevelsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import { useFormik } from 'formik'
import { Subject } from 'rxjs'
import { FC, useCallback, useState, useRef, useEffect, useMemo } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Content, Element } from 'react-bulma-components'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'
import { useTpJobSeekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'
import { useTpJobSeekerProfileUpdateMutation } from '../../../react-query/use-tpjobseekerprofile-mutation'
import { Editable } from '../../molecules/Editable'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { mapOptions, mapOptionsObject } from '@talent-connect/typescript-utilities'
import { reorder } from '@talent-connect/shared-utils';

// TODO: Repeated component?

interface Props {
  profile?: Partial<TpJobSeekerProfile>
  disableEditing?: boolean
}

interface EditableLanguagesHelpers {
  isSectionFilled: (profile: Partial<TpJobSeekerProfile>) => boolean;
  isSectionEmpty: (profile: Partial<TpJobSeekerProfile>) => boolean;
}

export const EditableLanguages: FC<Props> & EditableLanguagesHelpers = ({
  profile: overridingProfile,
  disableEditing,
}) => {
  const queryHookResult = useTpJobSeekerProfileQuery({
    enabled: !disableEditing,
  })
  if (overridingProfile) queryHookResult.data = overridingProfile
  const mutationHookResult = useTpJobSeekerProfileUpdateMutation()
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const { data: profile } = queryHookResult
  
  const isEmpty = EditableLanguages.isSectionEmpty(profile)

  if (disableEditing && isEmpty) return null

  return (
    <Editable
      title="Languages"
      modalTitle="Relevant languages you can speak"
      modalHeadline="Languages"
      {...{ disableEditing, isEditing, isFormDirty, setIsEditing }}
      readComponent={
        isEmpty ? (
          <EmptySectionPlaceholder
            height="slim"
            onClick={() => setIsEditing(true)}
          >
            Add your languages
          </EmptySectionPlaceholder>
        ) : (
          <Content>
            {profile?.workingLanguages?.map(({ language, proficiencyLevelId }, idx) => (
                <p key={idx}>
                  {language} -{' '}
                  {languageProficiencyLevelsIdToLabelMap[proficiencyLevelId]}
                </p>
              )
            )}
          </Content>
        )
      }
      modalBody={
        <JobSeekerFormSectionLanguages
          {...{ setIsEditing, setIsFormDirty, queryHookResult, mutationHookResult }}
        />
      }
      modalStyles={{ minHeight: 700 }}
    />
  )
}

EditableLanguages.isSectionFilled = (profile: Partial<TpJobSeekerProfile>) =>
  !!profile?.workingLanguages?.length

EditableLanguages.isSectionEmpty = (profile: Partial<TpJobSeekerProfile>) =>
  !EditableLanguages.isSectionFilled(profile)

// #############################################################################

// TODO: put this one in config file
const MAX_LANGUAGES = 6

const validationSchema = Yup.object({
  workingLanguages: Yup.array()
    .min(1)
    .max(6)
    .of(Yup.object().shape({
      language: Yup.string()
        .required("Please select a language from the menu!"),
      proficiencyLevelId: Yup.string()
        .required("Please choose your level of proficiency!")
    })
  ),
})

interface JobSeekerFormSectionLanguagesProps {
  setIsEditing: (boolean: boolean) => void
  setIsFormDirty?: (boolean: boolean) => void
  queryHookResult: UseQueryResult<
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown
  >
  mutationHookResult: UseMutationResult<
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown,
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown
  >
}

export const JobSeekerFormSectionLanguages: FC<JobSeekerFormSectionLanguagesProps> = ({
  setIsEditing,
  setIsFormDirty,
  queryHookResult: { data: profile },
  mutationHookResult,
}) => {
  const mutation = mutationHookResult

  const closeAllAccordionsSignalSubject = useRef(new Subject<void>())

  const initialValues: Partial<TpJobSeekerProfile> = useMemo(() => ({
      workingLanguages: profile?.workingLanguages ?? [buildBlankLanguageRecord()],
    }),
    [profile?.workingLanguages]
  )

  const formik = useFormik<Partial<TpJobSeekerProfile>>({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)
      mutation.mutate(values, {
        onSettled: () => setSubmitting(false),
        onSuccess: () => setIsEditing(false),
      })
    },
  })

  useEffect(
    () => setIsFormDirty?.(formik.dirty),
    [formik.dirty, setIsFormDirty]
  )

  const onDragEnd = useCallback(({ destination, source }: any) => {
      if (!destination) return

      const reorderedWorkingLanguages = reorder(
        formik.values.workingLanguages,
        source.index,
        destination.index
      )

      formik.setFieldValue('workingLanguages', reorderedWorkingLanguages)
    },
    [formik]
  )

  const onAddLanguage = useCallback(() => {
    if (formik.values.workingLanguages.length >= MAX_LANGUAGES)
      return alert('You can have maximum six languages in your profile')
    formik.setFieldValue('workingLanguages', [
      ...formik.values.workingLanguages,
      buildBlankLanguageRecord(),
    ])

    closeAllAccordionsSignalSubject.current.next()
  }, [formik])

  const onRemove = useCallback(
    (language: string) => {
      formik.setFieldValue(
        'workingLanguages',
        formik.values?.workingLanguages?.filter((lang) => lang.language !== language)
      )
    },
    [formik]
  )

  return (
    <>
      <Element
        renderAs="p"
        textSize={4}
        responsive={{ mobile: { textSize: { value: 5 } } }}
        className="oneandhalf-bs"
      >
        Specify any relevant languages you speak and your level of proficiency.
        You can add up to six languages.
      </Element>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="id">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {formik?.values?.workingLanguages?.map((item, index) => (
                <Draggable
                  key={item.uuid}
                  draggableId={item.uuid}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <FormDraggableAccordion
                        title={
                          item.language
                            ? item.language
                            : 'Click me to add details'
                        }
                        onRemove={() => onRemove(item.language)}
                        closeAccordionSignalSubject={
                          closeAllAccordionsSignalSubject.current
                        }
                      >
                        <FormSelect
                          name={`workingLanguages[${index}].language`}
                          label="Language*"
                          items={formLanguages}
                          {...formik}
                        />
                        <FormSelect
                          name={`workingLanguages[${index}].proficiencyLevelId`}
                          label="Level of proficiency*"
                          items={formLanguageProficiencyLevels}
                          {...formik}
                        />
                      </FormDraggableAccordion>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div style={{ height: '30px' }} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          cursor: 'pointer',
          marginBottom: '30px',
        }}
        onClick={onAddLanguage}
      >
        <Icon
          icon="tpPlus"
          style={{ width: '36px', height: '36px', marginRight: '20px' }}
        />
        Add another language
      </div>

      <Button
        disabled={!formik.isValid || mutation.isLoading}
        onClick={formik.submitForm}
      >
        Save
      </Button>
      <Button
        simple
        disabled={mutation.isLoading}
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </Button>
    </>
  )
}

const formLanguages = mapOptionsObject(LANGUAGES)

const formLanguageProficiencyLevels = mapOptions(languageProficiencyLevels)

function buildBlankLanguageRecord(): LanguageRecord {
  return {
    uuid: uuidv4(),
    language: '',
    proficiencyLevelId: '',
  }
}
