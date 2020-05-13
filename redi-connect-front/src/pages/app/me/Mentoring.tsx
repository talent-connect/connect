import React from 'react'
import { Columns, Tag } from 'react-bulma-components'
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
  categories
} from '../../../config/config'

const availableCategories = Object.assign({}, ...categories.map(category => ({ [category.id]: category.label })))

export interface MentoringFormValues {
  categories: string[]
}

const validationSchema = Yup.object({
  categories: Yup.array()
    .compact(v => v === 'dontKnowYet')
    .min(0)
    .max(3)
})

// props: FormikProps<AboutFormValues>
const Mentoring = ({ profile, profileSaveStart }: any) => {
  const {
    id,
    categories
  } = profile

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
    validationSchema,
    onSubmit: submitForm
  })

  const { categories: selectedCategories } = formik.values

  const readMentoring = () => {
    return <Tag.Group>
      {categories.map(
        (categorie: any, index: number) =>
          <Tag key={`${categorie}_${index}`} size="large" rounded>
            {availableCategories[categorie]}
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
        {Object.keys(availableCategories).map((key) => (
          <Columns.Column
            size={4}
            key={key}
          >
            <FormCheckbox
              name={`categories-${key}`}
              value={key}
              checked={selectedCategories.includes(key)}
              customOnChange={categoriesChange}
              disabled={selectedCategories.length > 2 && !selectedCategories.includes(key)}
              {...formik}
            >
              {availableCategories[key]}
            </FormCheckbox>
          </Columns.Column>
        ))}
      </Columns>
    </Editable>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile
})

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) => dispatch(profileSaveStart(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(Mentoring)
