import {
  Grid
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import intersection from 'lodash/intersection'
import { Columns } from 'react-bulma-components'
import { ProfileCard } from '../../../../components/organisms/ProfileCard'
import { useLoading } from '../../../../hooks/WithLoading'
import { getMentors } from '../../../../services/api/api'
import { history } from '../../../../services/history/history'
import { RedProfile } from '../../../../types/RedProfile'
import { getRedProfile } from '../../../../services/auth/auth'
import { CategoryChip } from '../../../../components/CategoryChip'
import { useList } from '../../../../hooks/useList'

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
          <Grid container direction="column">
            <Grid item>
              <h1>
                Recommended mentors
              </h1>
            </Grid>
            <Grid item>
              {currentUserCategories.map(catId => (
                <CategoryChip
                  key={catId}
                  categoryId={catId}
                  overrideBackgroundColour={
                    !activeCategories.includes(catId) ? '#b2b2b2' : ''
                  }
                  onClick={() => toggle(catId)}
                />
              ))}
            </Grid>
            <Grid item style={{ margin: '10px 0', fontWeight: 300 }}>
              These mentors have expertise in one or more of the domains you
              selected of interest in your profile.
            </Grid>
          </Grid>
          <Columns>
            {mentorsWithSharedCategories.map((mentor: RedProfile) => (
              <Columns.Column size={4} key={mentor.id}>
                <ProfileCard
                  profile={mentor}
                  onClick={() => history.push(`/app/profile/${mentor.id}`)}
                />
              </Columns.Column>
            ))}
          </Columns>
        </>
      )}
      {mentorsWithoutSharedCategories.length > 0 && (
        <>
          <h1>
            All available mentors
          </h1>
          <Columns>
            {mentorsWithoutSharedCategories.map((mentor: RedProfile) => (
              <Columns.Column size={4} key={mentor.id}>
                <ProfileCard
                  profile={mentor}
                  onClick={() => history.push(`/app/profile/${mentor.id}`)}
                />
              </Columns.Column>
            ))}
          </Columns>
        </>
      )}
    </>
  )
}
