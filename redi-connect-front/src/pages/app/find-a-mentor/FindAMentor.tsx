import React, { useEffect, useState } from 'react'
import { Content, Columns, Tag } from 'react-bulma-components'
import { Heading, Icon } from '../../../components/atoms'
import { FilterDropdown } from '../../../components/molecules'
import { ProfileCard } from '../../../components/organisms'
import { useLoading } from '../../../hooks/WithLoading'
import { getMentors } from '../../../services/api/api'
import { RedProfile } from '../../../types/RedProfile'
import { useList } from '../../../hooks/useList'
import { profileSaveStart } from '../../../redux/user/actions'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'
import { LoggedIn } from '../../../components/templates'

import { categoriesIdToLabelMap, categories } from '../../../config/config'
import './FindAMentor.scss'

const filterCategories = categories.map(category => ({ value: category.id, label: category.label }))

interface FilterTagProps {
  id: string
  label: string
  onClickHandler: (item: string) => void
}

const FilterTag = ({ id, label, onClickHandler }: FilterTagProps) => (
  <Tag
    size="medium"
    rounded
    textWeight="bold"
  >
    {label}
    <Icon icon="cancel" onClick={() => {
      onClickHandler(id)
    }} className="active-filters__remove" />
  </Tag>
)

interface FindAMentorProps {
  profile: RedProfile
  profileSaveStart: (profile: Partial<RedProfile>) => void
}

const FindAMentor = ({ profile, profileSaveStart }: FindAMentorProps) => {
  const { Loading, isLoading, setLoading } = useLoading()
  const { id, categories, favouritedRedProfileIds } = profile
  const [showFavorites, setShowFavorites] = useState<boolean>(false)
  const [mentors, setMentors] = useState<RedProfile[]>([])
  const [activeCategories, { toggle: toggleCategories, clear: clearCategories }] = useList(categories)
  const [favorites, { toggle: toggleFavorites }] = useList<any>(favouritedRedProfileIds)
  const [activeLanguages, { toggle: toggleLanguages, clear: clearLanguages }] = useList<any>([])

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
    getMentors({ categories: activeCategories, languages: activeLanguages }).then(mentors => {

      setMentors(mentors.filter(mentor => mentor.currentFreeMenteeSpots > 0))
      setLoading(false)
    })
  }, [activeCategories, activeLanguages])

  useEffect(() => {
    setLoading(true)
    profileSaveStart({ favouritedRedProfileIds: favorites, id })
    setLoading(false)
  }, [favorites])

  return (
    <LoggedIn>
      <Loading />
      <Heading subtitle size="small" className="oneandhalf-bs">Available mentors ({mentors.length})</Heading>
      <div className="filters">
        <FilterDropdown
          items={filterCategories}
          className="filters__dropdown"
          label="Topics"
          selected={activeCategories}
          onChange={toggleCategories}
        />
        <FilterDropdown
          items={filterLanguages}
          className="filters__dropdown"
          label="Languages"
          selected={activeLanguages}
          onChange={toggleLanguages}
        />
        <div
          className="filter-favourites"
          onClick={() => setShowFavorites(!showFavorites)}>
          <Icon icon={showFavorites ? 'heartFilled' : 'heart'} className="filter-favourites__icon" space="right" />
              Only Favorites
        </div>
      </div>

      {(activeCategories.length !== 0 || activeLanguages.length !== 0) && <div className="active-filters">
        <Tag.Group>
          {activeCategories.map(catId =>
            <FilterTag
              key={catId}
              id={catId}
              label={categoriesIdToLabelMap[catId]}
              onClickHandler={toggleCategories} />
          )}
          {activeLanguages.map(langId =>
            <FilterTag key={langId} id={langId} label={langId} onClickHandler={toggleLanguages} />
          )}
          <span
            className="active-filters__clear-all"
            onClick={() => {
              clearCategories()
              clearLanguages()
            }}
          >
            Delete all filters <Icon icon="cancel" size="small" space="left" />
          </span>
        </Tag.Group>
      </div>}

      <Columns>
        {mentors.map((mentor: RedProfile) => {
          const isFavorite = favorites.includes(mentor.id)

          if (!isFavorite && showFavorites) return

          return <Columns.Column size={4} key={mentor.id}>
            <ProfileCard
              profile={mentor}
              linkTo={`/app/find-a-mentor/profile/${mentor.id}`}
              toggleFavorite={toggleFavorites}
              isFavorite={isFavorite}
            />
          </Columns.Column>
        })}
      </Columns>

      {(mentors.length === 0 && !isLoading) && <Content>
        <>Unfortunately <strong>could not find any mentors</strong> matching your search criterias.</>
      </Content>}
    </LoggedIn>
  )
}
const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile
})

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) => dispatch(profileSaveStart(profile))
})
export default connect(mapStateToProps, mapDispatchToProps)(FindAMentor)
