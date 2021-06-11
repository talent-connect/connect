import {
  Button,
  FormDraggableAccordion,
  FormSelect,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import { Languages } from '@talent-connect/shared-config'
import {
  LanguageRecord,
  TpJobseekerProfile,
} from '@talent-connect/shared-types'
import {
  languageProficiencyLevels,
  languageProficiencyLevelsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import { useFormik } from 'formik'
import React, { useCallback, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Content, Element } from 'react-bulma-components'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'
import { useTpjobseekerprofileUpdateMutation } from '../../react-query/use-tpjobseekerprofile-mutation'
import { useTpjobseekerprofileQuery } from '../../react-query/use-tpjobseekerprofile-query'
import { Editable } from '../molecules/Editable'
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

// TODO: put this one in config file
const MAX_LANGUAGES = 6

const validationSchema = Yup.object({
  workingLanguages: Yup.array().min(1).max(6),
})

function Form({ setIsEditing }: { setIsEditing: (boolean) => void }) {
  const { data: profile } = useTpjobseekerprofileQuery()
  const mutation = useTpjobseekerprofileUpdateMutation()
  const initialValues: Partial<TpJobseekerProfile> = {
    workingLanguages: profile.workingLanguages ?? [buildBlankLanguageRecord()],
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
    validateOnMount: true,
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
    if (formik.values.workingLanguages.length >= MAX_LANGUAGES)
      return alert('You can have maximum six languages in your profile')
    formik.setFieldValue('workingLanguages', [
      ...formik.values.workingLanguages,
      buildBlankLanguageRecord(),
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

function buildBlankLanguageRecord(): LanguageRecord {
  return {
    uuid: uuidv4(),
    language: '',
    proficiencyLevelId: '',
  }
}
