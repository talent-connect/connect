import React, { useEffect, useState } from 'react'
import intersection from 'lodash/intersection'
import { Columns, Tag } from 'react-bulma-components'
import { Heading, Icon } from '../../../../components/atoms'
import { ProfileCard } from '../../../../components/organisms/ProfileCard'
import { useLoading } from '../../../../hooks/WithLoading'
import { getMentors } from '../../../../services/api/api'
import { RedProfile } from '../../../../types/RedProfile'
import { getRedProfile } from '../../../../services/auth/auth'
import { useList } from '../../../../hooks/useList'
import { categoriesIdToLabelMap } from '../../../../config/config'
import './AvailableMentorListing.scss'

type MentorCatCount = RedProfile & { categoryMatchCount: number };

const addCategoryMatchCount = (
  mentors: RedProfile[],
  categories: string[]
): MentorCatCount[] =>
  mentors.map(mentor =>
    Object.assign(mentor, {
      categoryMatchCount: intersection(categories, mentor.categories).length
    })
  )

export const AvailableMentorListing = (props: any) => {
  const { Loading, isLoading, setLoading } = useLoading()
  const [_mentors, setMentors] = useState<RedProfile[]>([])
  const currentUserCategories = getRedProfile().categories
  const [activeCategories, { toggle }] = useList(currentUserCategories)

  const mentorsFiltered = _mentors.filter(
    m => m.currentFreeMenteeSpots > 0 && m.userActivated
  )

  const mentorsWhoHaveSpotsButAreNotActivatedCount = _mentors.filter(
    m => m.userActivated === false && m.currentFreeMenteeSpots > 0
  ).length

  const mentors = addCategoryMatchCount(mentorsFiltered, activeCategories)

  const mentorsWithSharedCategories = mentors
    .filter(m => m.categoryMatchCount > 0)
    .sort((a, b) => b.categoryMatchCount - a.categoryMatchCount)
  const mentorsWithoutSharedCategories = mentors.filter(
    m => m.categoryMatchCount === 0
  )

  useEffect(() => {
    setLoading(true)
    getMentors().then(mentors => {
      setMentors(mentors)
      setLoading(false)
    })
  }, [setLoading])
  return (
    <>
      <Loading />
      {mentors.length === 0 &&
        mentorsWhoHaveSpotsButAreNotActivatedCount > 0 && (
        <h4>
            We have {mentorsWhoHaveSpotsButAreNotActivatedCount} available
            mentors. Unfortunately, they have not activated their profiles yet.
            Please check in again later.
        </h4>
      )}
      {!isLoading &&
        mentorsWhoHaveSpotsButAreNotActivatedCount === 0 &&
        mentors.length === 0 && (
        <h4>
            Unfortunately there are no available mentors right now. We are
            constantly recruiting new mentors, so please check back in later.
        </h4>
      )}
      {mentorsWithSharedCategories.length > 0 && (
        <>
          <Heading subtitle size="small" className="oneandhalf-bs">Available mentors ({mentorsFiltered.length})</Heading>

          <div className="active-filters">
            <span className="active-filters__label">{mentorsWithSharedCategories.length} results for:</span>
            <Tag.Group className="selected-filters">
              {activeCategories.map(catId => (
                <Tag
                  key={catId}
                  categoryId={catId}
                  overrideBackgroundColour={
                    !activeCategories.includes(catId) ? '#b2b2b2' : ''
                  }
                  size="large"
                  rounded
                  textWeight="bold"
                >
                  {categoriesIdToLabelMap[catId]}
                  <Icon icon="cancel" onClick={() => toggle(catId)} className="selected-filters__remove"/>
                </Tag>
              ))}
            </Tag.Group>
          </div>

          <Columns>
            {mentorsWithSharedCategories.map((mentor: RedProfile) => (
              <Columns.Column size={4} key={mentor.id}>
                <ProfileCard
                  profile={mentor}
                />
              </Columns.Column>
            ))}
          </Columns>
        </>
      )}
      {mentorsWithoutSharedCategories.length > 0 && (
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
      )}
    </>
  )
}
