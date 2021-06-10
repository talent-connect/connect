import {
  Button,
  Caption,
  FaqItem,
  FormDraggableAccordion,
  FormInput,
  FormSelect,
  FormTextArea,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import { TpJobseekerProfile } from '@talent-connect/shared-types'
import {
  desiredPositions,
  languageProficiencyLevels,
  languageProficiencyLevelsIdToLabelMap,
  topSkills,
} from '@talent-connect/talent-pool/config'
import { CVFormData } from '@talent-connect/talent-pool/types'
import { useFormik } from 'formik'
import { values } from 'lodash'
import React, { useCallback, useState } from 'react'
import { Content, Element } from 'react-bulma-components'
import * as Yup from 'yup'
import { useTpjobseekerprofileUpdateMutation } from '../../react-query/use-tpjobseekerprofile-mutation'
import { useTpjobseekerprofileQuery } from '../../react-query/use-tpjobseekerprofile-query'
import { Editable } from '../molecules/Editable'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Languages } from '@talent-connect/shared-config'
import { EmptySectionPlaceholder } from '../molecules/EmptySectionPlaceholder'

function reorder<T>(list: Array<T>, startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export function EditableLanguages() {
  const { data: profile } = useTpjobseekerprofileQuery()
  const [isEditing, setIsEditing] = useState(false)

  const isEmpty = !(profile?.workingLanguages?.length > 0)

  return (
    <Editable
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      title="Languages"
      readComponent={
        isEmpty ? (
          <EmptySectionPlaceholder
            height="slim"
            text="Add your languages"
            onClick={() => setIsEditing(true)}
          />
        ) : (
          <Content>
            {profile?.workingLanguages?.map(
              ({ language, proficiencyLevelId }, idx) => (
                <p key={idx}>
                  {language} -{' '}
                  {languageProficiencyLevelsIdToLabelMap[proficiencyLevelId]}
                </p>
              )
            )}
          </Content>
        )
      }
      modalTitle="Relevant languages you can speak"
      modalHeadline="Languages"
      modalBody={<Form setIsEditing={setIsEditing} />}
      modalStyles={{ minHeight: 700 }}
    />
  )
}

const validationSchema = Yup.object({
  workingLanguages: Yup.array().min(1).max(6),
})

interface FormSchema extends Partial<TpJobseekerProfile> {
  selectedLanguage: string
  selectedProficiencyLevel: string
}

function Form({ setIsEditing }: { setIsEditing: (boolean) => void }) {
  const { data: profile } = useTpjobseekerprofileQuery()
  const mutation = useTpjobseekerprofileUpdateMutation()
  const initialValues: FormSchema = {
    workingLanguages: profile.workingLanguages ?? [
      {
        language: 'Norwegian',
        proficiencyLevelId: 'nativeOrBilingualProficiency',
      },
      {
        language: 'English',
        proficiencyLevelId: 'nativeOrBilingualProficiency',
      },
      {
        language: 'Spanish',
        proficiencyLevelId: 'limitedWorkingProficiency',
      },
    ],
    selectedLanguage: '',
    selectedProficiencyLevel: '',
  }
  const onSubmit = (values: Partial<TpJobseekerProfile>) => {
    formik.setSubmitting(true)
    mutation.mutate(values, {
      onSettled: () => {
        formik.setSubmitting(false)
      },
      onSuccess: () => {
        setIsEditing(false)
      },
    })
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  })

  const onDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return

      const reorderedWorkingLanguages = reorder(
        formik.values.workingLanguages,
        result.source.index,
        result.destination.index
      )

      formik.setFieldValue('workingLanguages', reorderedWorkingLanguages)
    },
    [formik]
  )

  const onAddLanguage = useCallback(() => {
    const language = (formik.values as FormSchema).selectedLanguage
    const proficiencyLevel = (formik.values as FormSchema)
      .selectedProficiencyLevel

    if (!language || !proficiencyLevel) return
    if (
      formik.values.workingLanguages.map((l) => l.language).includes(language)
    )
      return
    if (formik.values.workingLanguages.length >= 6) return

    formik.setFieldValue('workingLanguages', [
      ...formik.values.workingLanguages,
      { language: language, proficiencyLevelId: proficiencyLevel },
    ])
  }, [formik])

  const onRemove = useCallback(
    (language: string) => {
      formik.setFieldValue(
        'workingLanguages',
        formik.values?.workingLanguages?.filter(
          (lang) => lang.language !== language
        )
      )
    },
    [formik]
  )

  const workingLanguageIds = formik?.values?.workingLanguages?.map(
    ({ language }) => language
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
                  key={item.language}
                  draggableId={item.language}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <FormDraggableAccordion
                        title={item.language}
                        onRemove={() => onRemove(item.language)}
                      >
                        form goes here
                      </FormDraggableAccordion>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div style={{ height: '30px' }} />

      <FormSelect
        name="selectedLanguage"
        label="Language*"
        items={formLanguages.filter(
          ({ value }) => !workingLanguageIds.includes(value)
        )}
        value={(formik.values as FormSchema).selectedLanguage}
        {...formik}
      />
      <FormSelect
        name="selectedProficiencyLevel"
        label="Level of proficiency*"
        items={formLanguageProficiencyLevels}
        {...formik}
      />
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
    </>
  )
}

const formLanguages = Languages.map((language) => ({
  value: language,
  label: language,
}))

const formLanguageProficiencyLevels = languageProficiencyLevels.map(
  ({ id, label }) => ({
    value: id,
    label,
  })
)
