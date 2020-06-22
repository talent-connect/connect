import React, { useEffect, useState, ReactNode } from 'react'
// import intersection from 'lodash/intersection'
import { Columns, Tag } from 'react-bulma-components'
import { Heading, Icon } from '../../../../components/atoms'
import { FilterDropdown } from '../../../../components/molecules'
import { ProfileCard } from '../../../../components/organisms'
import { useLoading } from '../../../../hooks/WithLoading'
import { getMentors } from '../../../../services/api/api'
import { RedProfile } from '../../../../types/RedProfile'
import { getRedProfile } from '../../../../services/auth/auth'
import { useList } from '../../../../hooks/useList'
import { categoriesIdToLabelMap, categories } from '../../../../config/config'
import './AvailableMentorListing.scss'

const filterCategories = categories.map(categorie => ({ value: categorie.id, label: categorie.label }))

// type MentorCatCount = RedProfile & { categoryMatchCount: number, languageMatchCount: number };

// const addMatchCount = (
//   mentors: RedProfile[],
//   categories: string[],
//   languages: string[]
// ): MentorCatCount[] =>
//   mentors.map(mentor =>
//     Object.assign(mentor, {
//       categoryMatchCount: intersection(categories, mentor.categories).length,
//       languageMatchCount: intersection(languages, mentor.languages).length
//     })
//   )

interface FilterTagProps {
  id: string
  label: string
  onClickHandler: (item: string) => void
}

const FilterTag = ({ id, label, onClickHandler }: FilterTagProps) => <Tag
  key={id}
  categoryId={id}
  size="medium"
  rounded
  textWeight="bold"
>
  {label}
  <Icon icon="cancel" onClick={() => {
    console.log(id)
    onClickHandler(id)
  }} className="active-filters__remove" />
</Tag>

export const AvailableMentorListing = (props: any) => {
  const { Loading, isLoading, setLoading } = useLoading()
  const [mentors, setMentors] = useState<RedProfile[]>([])
  const currentUserCategories = getRedProfile().categories
  const [activeCategories, { toggle: toggleCategories, clear: clearCategories }] = useList(currentUserCategories)
  const [activeLanguages, { toggle: toggleLanguages, clear: clearLanguages }] = useList<any>([])

  // const mentorsFiltered = _mentors.filter(
  //   m => m.currentFreeMenteeSpots > 0 && m.userActivated
  // )

  // const mentorsWhoHaveSpotsButAreNotActivatedCount = _mentors.filter(
  //   m => m.userActivated === false && m.currentFreeMenteeSpots > 0
  // ).length

  // const mentors = addMatchCount(mentorsFiltered, activeCategories, activeLanguages)

  // const mentorsWithSharedCategories = mentors
  //   .filter(m => m.categoryMatchCount > 0)
  //   .sort((a, b) => b.categoryMatchCount - a.categoryMatchCount)

  // const mentorsWithoutSharedCategories = mentors.filter(
  //   m => m.categoryMatchCount === 0 && m.languageMatchCount === 0
  // )

  // const filterCategories = Array.from(
  //   new Set(
  //     mentors
  //       .map(mentor => mentor.categories || [])
  //       .flat()
  //       .sort()
  //   )
  // ).map(categorie => ({
  //   value: categorie,
  //   label: categoriesIdToLabelMap[categorie]
  // }))

  const filterLanguages = Array.from(
    new Set(
      mentors
        .map(mentor => mentor.languages || [])
        .flat()
        .sort()
    )
  ).map(language => ({
    value: language,
    label: language
  }))

  useEffect(() => {
    setLoading(true)
    getMentors(activeCategories, activeLanguages).then(mentors => {
      setMentors(mentors)
      setLoading(false)
    })
  }, [activeCategories, activeLanguages])

  useEffect(() => {
    setLoading(true)
    getMentors(currentUserCategories).then(mentors => {
      setMentors(mentors)
      setLoading(false)
    })
  }, [setLoading])

  return (
    <>
      <Loading />
      <Heading subtitle size="small" className="oneandhalf-bs">Available mentors ({mentors.length})</Heading>
      <div className="filters">
        <Columns>
          <Columns.Column size={4}>
            <FilterDropdown
              items={filterCategories}
              label="Topics"
              selected={activeCategories}
              onChange={toggleCategories}
            />
          </Columns.Column>
          <Columns.Column size={4}>
            <FilterDropdown
              items={filterLanguages}
              label="Languages"
              selected={activeLanguages}
              onChange={toggleLanguages}
            />
          </Columns.Column>
        </Columns>
      </div>

      {(activeCategories.length !== 0 || activeLanguages.length !== 0) && <div className="active-filters">
        <Tag.Group>
          {activeCategories.map(catId =>
            <FilterTag id={catId} label={categoriesIdToLabelMap[catId]}onClickHandler={toggleCategories}/>
          )}
          {activeLanguages.map(langId =>
            <FilterTag id={langId} label={langId} onClickHandler={toggleLanguages}/>
          )}
          <span className="active-filters__clear-all" onClick={() => {
            clearCategories()
            clearLanguages()
          }}
          >
            Delete all filters <Icon icon="cancel" size="small" space="left"/>
          </span>
        </Tag.Group>
      </div>}

      {/* {mentors.length === 0 &&
        mentorsWhoHaveSpotsButAreNotActivatedCount > 0 && (
        <h4>
            We have {mentorsWhoHaveSpotsButAreNotActivatedCount} available
            mentors. Unfortunately, they have not activated their profiles yet.
            Please check in again later.
        </h4>
      )} */}
      {/* {!isLoading &&
        mentorsWhoHaveSpotsButAreNotActivatedCount === 0 &&
        mentors.length === 0 && (
        <h4>
            Unfortunately there are no available mentors right now. We are
            constantly recruiting new mentors, so please check back in later.
        </h4>
      )} */}

      <Columns>
        {mentors.map((mentor: RedProfile) => (
          <Columns.Column size={4} key={mentor.id}>
            <ProfileCard profile={mentor} />
          </Columns.Column>
        ))}

        {mentors.length === 0 && <Columns.Column size={4}>
          <>No mentors found</>
        </Columns.Column>}
      </Columns>

      {/* {mentorsWithoutSharedCategories.length > 0 && (
        <>
          <Heading subtitle size="small" className="oneandhalf-bs">All available mentors</Heading>

          <Columns>
            {mentorsWithoutSharedCategories.map((mentor: RedProfile) => (
              <Columns.Column size={4} key={mentor.id}>
                <ProfileCard
                  profile={mentor}
                />
              </Columns.Column>
            ))}
          </Columns>
        </>
      )} */}
    </>
  )
}
