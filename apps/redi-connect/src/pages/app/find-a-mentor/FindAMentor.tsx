import React, { useCallback, useEffect, useState } from 'react'
import { Content, Columns, Tag, Form } from 'react-bulma-components'
import { debounce } from 'lodash'
import {
  FormInput,
  Heading,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import { FilterDropdown } from '@talent-connect/shared-atomic-design-components'
import { ProfileCard } from '../../../components/organisms'
import { useLoading } from '../../../hooks/WithLoading'
import { getMentors } from '../../../services/api/api'
import { RedProfile } from '@talent-connect/shared-types'
import { useList } from '../../../hooks/useList'
import { profileSaveStart } from '../../../redux/user/actions'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'
import { LoggedIn } from '../../../components/templates'

import {
  categoriesIdToLabelMap,
  categories,
} from '@talent-connect/shared-config'
import './FindAMentor.scss'
import { setUrlParam, getCurrentUrlParams, getUrlParamValue, clearQuery, toggleValueInArray } from './utils'
import { useQueryParam, StringParam, useQueryParams, ArrayParam, withDefault } from 'use-query-params'

const filterCategories = categories.map((category) => ({
  value: category.id,
  label: category.label,
}))

interface FilterTagProps {
  id: string
  label: string
  onClickHandler: (item: string) => void
}

const FilterTag = ({ id, label, onClickHandler }: FilterTagProps) => (
  <Tag size="medium" rounded textWeight="bold">
    {label}
    <Icon
      icon="cancel"
      onClick={() => {
        onClickHandler(id)
      }}
      className="active-filters__remove"
    />
  </Tag>
)

interface FindAMentorProps {
  profile: RedProfile
  profileSaveStart: (profile: Partial<RedProfile>) => void
}

const SearchField = ({
  valueChange
  // defaultValue
}: {
  valueChange: (value: string) => void
  // defaultValue: string
}) => {
  // const [value, setValue] = useState(defaultValue)
  const [value, setValue] = useState('')
  const valueChangeDebounced = useCallback(debounce(valueChange, 400), [])
  const handleChange = useCallback((e: any) => setValue(e.target.value), [])

  useEffect(() => {
    valueChangeDebounced(value)
  }, [value])

  return (
    <Form.Input
      placeholder="Search by name"
      onChange={handleChange}
      value={value}
    />
  )
}

const FindAMentor = ({ profile, profileSaveStart }: FindAMentorProps) => {
  const { Loading, isLoading, setLoading } = useLoading()
  const { id, categories: categoriesFromProfile, favouritedRedProfileIds, rediLocation } = profile
  // const [nameQuery, setNameQuery] = useQueryParam('name', StringParam)
  const [showFavorites, setShowFavorites] = useState<boolean>(false)
  const [mentors, setMentors] = useState<RedProfile[]>([])
  const [query, setQuery] = useQueryParams({
    name: StringParam,
    topics: withDefault(ArrayParam, []),
  })
  const { name: nameQuery, topics } = query;
  
  // useEffect(()=> {
  //   setQuery({...query, topics: categoriesFromProfile})
  // }, [])

  console.log("topics", topics);
  
  
  // const [whatever, setWhatever] = useState(0)

  // const currentUrlParams = getCurrentUrlParams()
  // const hasCategoriesInUrl = currentUrlParams.has("topics")
  // const categoriesStringFromUrl = getUrlParamValue("topics")
  // const categoriesFromUrl = hasCategoriesInUrl ? categoriesStringFromUrl.split(",") : []
  // console.log("categoriesFromUrl", categoriesFromUrl)

  const toggleTopics = (item) => { 
    // const newTopics = toggleValueInArray(categoriesFromUrl, item)
    const newTopics = toggleValueInArray(topics, item)
    setQuery({...query, topics: newTopics})
    // setUrlParam("topics", newTopics)
    // setTimeout(() => {
    //  setWhatever(whatever => whatever + 1)
    // }, 1)
  }

  const clearTopics = () => {
    // clearQuery()
    setQuery({...query, topics: []})
  }

  const [favorites, { toggle: toggleFavorites }] = useList<any>( 
    favouritedRedProfileIds
  )

  const [
    activeLanguages,
    { toggle: toggleLanguages, clear: clearLanguages },
  ] = useList<any>([])

  const filterLanguages = Array.from(
    new Set(
      mentors
        .map((mentor) => mentor.languages || [])
        .flat()
        .sort()
    )
  ).map((language) => ({
    value: language,
    label: language,
  }))

  useEffect(() => {
  console.log("topics", topics);
    setLoading(true)
    getMentors({
      // categories: categoriesFromUrl,
      categories: topics,
      languages: activeLanguages,
      nameQuery,
    }).then((mentors) => {
      setMentors(
        mentors
          .filter((mentor) => mentor.currentFreeMenteeSpots > 0)
          .filter(
            (mentor) =>
              !mentor.optOutOfMenteesFromOtherRediLocation ||
              mentor.rediLocation === rediLocation
          )
      )
      setLoading(false)
    })
  // }, [categoriesStringFromUrl, activeLanguages, nameQuery])
  }, [topics, activeLanguages, nameQuery])


  useEffect(() => {
    setLoading(true)
    profileSaveStart({ favouritedRedProfileIds: favorites, id })
    setLoading(false)
  }, [favorites])

  if (profile.userActivated !== true) return <LoggedIn />

  return (
    <LoggedIn>
      <Loading />
      <Heading subtitle size="small" className="oneandhalf-bs">
        Available mentors ({mentors.length})
      </Heading>
      <div className="filters">
        {/* <SearchField defaultValue={nameQuery} valueChange={setNameQuery} /> */}
        {/* <SearchField valueChange={setNameQuery} /> */}
      </div>
      <div className="filters">
        <FilterDropdown
          items={filterCategories}
          className="filters__dropdown"
          label="Topics"
          // selected={categoriesFromUrl}
          selected={topics}
          onChange={toggleTopics}
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
          onClick={() => setShowFavorites(!showFavorites)}
        >
          <Icon
            icon={showFavorites ? 'heartFilled' : 'heart'}
            className="filter-favourites__icon"
            space="right"
          />
          Only Favorites
        </div>
      </div>

      {/* {(categoriesFromUrl.length !== 0 || activeLanguages.length !== 0) && ( */}
      {(topics.length !== 0 || activeLanguages.length !== 0) && (
        <div className="active-filters">
          <Tag.Group>
            {/* {categoriesFromUrl.map((catId) => ( */}
            {topics.map((catId) => (
              <FilterTag
                key={catId}
                id={catId}
                label={categoriesIdToLabelMap[catId]}
                onClickHandler={toggleTopics}
              />
            ))}
            {activeLanguages.map((langId) => (
              <FilterTag
                key={langId}
                id={langId}
                label={langId}
                onClickHandler={toggleLanguages}
              />
            ))}
            <span
              className="active-filters__clear-all"
              onClick={() => {
                clearTopics()
              }}
            >
              Delete all filters{' '}
              <Icon icon="cancel" size="small" space="left" />
            </span>
          </Tag.Group>
        </div>
      )}

      <Columns>
        {mentors.map((mentor: RedProfile) => {
          const isFavorite = favorites.includes(mentor.id)

          if (!isFavorite && showFavorites) return

          return (
            <Columns.Column size={4} key={mentor.id}>
              <ProfileCard
                profile={mentor}
                linkTo={`/app/find-a-mentor/profile/${mentor.id}`}
                toggleFavorite={toggleFavorites}
                isFavorite={isFavorite}
              />
            </Columns.Column>
          )
        })}
      </Columns>

      {mentors.length === 0 && !isLoading && (
        <Content>
          <>
            Unfortunately <strong>could not find any mentors</strong> matching
            your search criterias.
          </>
        </Content>
      )}
    </LoggedIn>
  )
}
const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile,
})

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) =>
    dispatch(profileSaveStart(profile)),
})
export default connect(mapStateToProps, mapDispatchToProps)(FindAMentor)
