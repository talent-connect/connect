import React from 'react'
import groupBy from 'lodash/groupBy'
import { Columns, Tag, Heading, Element } from 'react-bulma-components'
import FormCheckbox from '../../../components/atoms/FormCheckbox'
import Editable from '../../../components/molecules/Editable'
import { RedProfile } from '../../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'
import './Mentoring.scss'

import {
  profileSaveStart
} from '../../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'
import {
  categories as availableCategories, categoriesIdToLabelMap
} from '../../../config/config'

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
  profile: RedProfile | undefined,
  profileSaveStart: Function
}

const Mentoring = ({ profile, profileSaveStart }: Props) => {
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

  // const categoryObject = Object.assign({}, ...availableCategories.map(category => ({ [category.id]: category.label })))

  const readMentoring = () => {
    return <Tag.Group>
      {categories.map(
        categoryId =>
          <Tag key={categoryId} size="large" rounded>
            {categoriesIdToLabelMap[categoryId]}
          </Tag>
      )}
    </Tag.Group>
  }

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
      read={categories && readMentoring()}
      placeholder="Please pick up to three mentoring topics."
      className="mentoring"
    >
      <Columns>
        <CategoryGroup id="coding" label="Coding" selectedCategories={selectedCategories} onChange={categoriesChange} formik={formik} />
        <CategoryGroup id="careerSupport" label="Career Support" selectedCategories={selectedCategories} onChange={categoriesChange} formik={formik} />
        <CategoryGroup id="other" label="Other topics" selectedCategories={selectedCategories} onChange={categoriesChange} formik={formik} />
      </Columns>
    </Editable>
  )
}

const CategoryGroup = ({ id, label, selectedCategories, onChange, formik }: any) => {
  console.log("re-render")
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

export default connect(mapStateToProps, mapDispatchToProps)(Mentoring)
