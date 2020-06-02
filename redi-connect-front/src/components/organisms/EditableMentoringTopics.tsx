import React from 'react'
import groupBy from 'lodash/groupBy'
import { Columns, Heading, Element, Content } from 'react-bulma-components'
import { FormCheckbox } from '../atoms'
import { Editable, ReadMentoringTopics } from '../molecules'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'

import {
  profileSaveStart
} from '../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'
import {
  categories as availableCategories
} from '../../config/config'

export interface MentoringFormValues {
  categories: string[]
}

const validationSchema = Yup.object({
  categories: Yup.array()
    .compact(v => v === 'dontKnowYet')
    .min(0)
    .max(3)
})

const categoriesByGroup = groupBy(availableCategories, category => category.group)

interface Props {
  profile: RedProfile | undefined
  profileSaveStart: Function
}

const EditableMentoringTopics = ({ profile, profileSaveStart }: Props) => {
  const {
    id,
    categories
  } = (profile as RedProfile)

  const submitForm = async (
    values: FormikValues
  ) => {
    const profileMentoring = values as Partial<RedProfile>
    profileSaveStart({ ...profileMentoring, id })
  }

  const initialValues: MentoringFormValues = {
    categories: categories || []
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm
  })

  const { categories: selectedCategories } = formik.values

  const categoriesChange = (e: any) => {
    e.persist()
    const value = e.target.value
    let newCategories
    if (e.target.checked) {
      newCategories = selectedCategories.concat(value)
    } else {
      newCategories = selectedCategories.filter((cat: any) => cat !== value)
    }
    formik.setFieldValue('categories', newCategories)
    formik.setFieldTouched('categories', true, false)
  }

  return (
    <Editable
      title="Mentoring Topics"
      onSave={() => formik.handleSubmit()}
      savePossible={(formik.dirty && formik.isValid)}
      read={<ReadMentoringTopics.Me />}
      className="mentoring"
    >
      <Content>You can select between 1 and up to 3 topics.</Content>
      <Columns>
        <CategoryGroup id="coding" label="Coding" selectedCategories={selectedCategories} onChange={categoriesChange} formik={formik} />
        <CategoryGroup id="careerSupport" label="Career Support" selectedCategories={selectedCategories} onChange={categoriesChange} formik={formik} />
        <CategoryGroup id="other" label="Other topics" selectedCategories={selectedCategories} onChange={categoriesChange} formik={formik} />
      </Columns>
    </Editable>
  )
}

const CategoryGroup = ({ id, label, selectedCategories, onChange, formik }: any) => {
  // The current REDI_LOCATION might not use the current CategoryGroup (e.g.
  // Munich doesnt, at the time or writing, use 'coding' or 'other'. If it's the case, return null
  if (!categoriesByGroup[id]) return null
  return (<>
    <Columns.Column
      size={4}
    >
      <Heading
        size={6}
        weight="normal"
        renderAs="h3"
        subtitle
        textTransform="uppercase"
      >
        {label}
      </Heading>
      <Element className="mentoring__group">
        {categoriesByGroup[id].map((groupItem) => (
          <FormCheckbox
            name={`categories-${groupItem.id}`}
            key={groupItem.id}
            value={groupItem.id}
            checked={selectedCategories.includes(groupItem.id)}
            customOnChange={onChange}
            disabled={selectedCategories.length > 2 && !selectedCategories.includes(groupItem.id)}
            {...formik}
          >
            {groupItem.label}
          </FormCheckbox>
        ))}
      </Element>
    </Columns.Column>
  </>)
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile
})

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) => dispatch(profileSaveStart(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditableMentoringTopics)
