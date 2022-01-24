import { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { Content, Columns, Tag } from 'react-bulma-components'
import {
  Heading,
  Icon,
  SearchField,
} from '@talent-connect/shared-atomic-design-components'
import { FilterDropdown } from '@talent-connect/shared-atomic-design-components'
import { ProfileCard } from '../../../components/organisms'
import { useLoading } from '../../../hooks/WithLoading'
import { getMentors } from '../../../services/api/api'
import { RediLocation, RedProfile } from '@talent-connect/shared-types'
import { profileSaveStart } from '../../../redux/user/actions'
import { LoggedIn } from '../../../components/templates'

import { CATEGORIES, REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import './FindAMentor.scss'
import { toggleValueInArray } from './utils'
import {
  StringParam,
  useQueryParams,
  ArrayParam,
  BooleanParam,
  withDefault,
} from 'use-query-params'
import { objectKeys } from '@talent-connect/typescript-utilities'
import { mapStateToProps } from '../../../helpers';

const filterCategories = CATEGORIES.map(({ id, label }) => ({ value: id, label }))

interface FilterTagProps {
  id: string
  label: string
  onClickHandler: (item: string) => void
}

const FilterTag: FC<FilterTagProps> = ({ id, label, onClickHandler }) => (
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

const FindAMentor: FC<FindAMentorProps> = ({
  profile: {
    id,
    userActivated,
    categories: categoriesFromProfile,
    favouritedRedProfileIds,
    rediLocation,
  },
  profileSaveStart
}) => {
  const { Loading, isLoading, setLoading } = useLoading()
  const [showFavorites, setShowFavorites] = useState<boolean>(false)
  const [mentors, setMentors] = useState<RedProfile[]>([])
  const [query, setQuery] = useQueryParams({
    name: withDefault(StringParam, undefined),
    topics: withDefault(ArrayParam, []),
    languages: withDefault(ArrayParam, []),
    locations: withDefault(ArrayParam, []),
    onlyFavorites: withDefault(BooleanParam, undefined),
  })
  const { topics, name, languages, locations, onlyFavorites } = query

  useEffect(() => {
    const hasQuery =
      topics.length ||
      languages.length ||
      locations.length ||
      !!name ||
      onlyFavorites
    setQuery(hasQuery ? query : { ...query, topics: categoriesFromProfile })
  }, [])

  const toggleFilters = (filtersArr, filterName, item) => {
    const newFilters = toggleValueInArray(filtersArr, item)
    setQuery((latestQuery) => ({ ...latestQuery, [filterName]: newFilters }))
  }

  const setName = (value) => {
    setQuery((latestQuery) => ({ ...latestQuery, name: value || undefined }))
  }

  const toggleFavorites = (favoritesArr, value) => {
    const newFavorites = toggleValueInArray(favoritesArr, value)
    setLoading(true)
    profileSaveStart({ favouritedRedProfileIds: newFavorites, id })
    setLoading(false)
  }

  const setFavorites = () => {
    setShowFavorites(!showFavorites)
    setQuery((latestQuery) => ({
      ...latestQuery,
      onlyFavorites: showFavorites ? undefined : true,
    }))
  }

  const clearFilters = () => {
    setQuery((latestQuery) => ({
      ...latestQuery,
      topics: [],
      languages: [],
      locations: [],
    }))
  }

  const filterLanguages = Array.from(
    new Set(
      mentors
        .map(({ languages = [] }) => languages)
        .flat()
        .sort()
    )
  ).map((language) => ({
    value: language,
    label: language,
  }))

  const filterRediLocations = objectKeys(REDI_LOCATION_NAMES)
    .map((location) => ({
      value: location,
      label: REDI_LOCATION_NAMES[location],
    })
  )

  useEffect(() => {
    setLoading(true)
    getMentors({
      categories: topics,
      languages,
      nameQuery: name || '',
      locations,
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
  }, [topics, languages, locations, name])

  if (userActivated !== true) return <LoggedIn />

  return (
    <LoggedIn>
      <Loading />
      <Heading subtitle size="small" className="oneandhalf-bs">
        Available mentors ({mentors.length})
      </Heading>
      <div className="filters">
        <SearchField
          defaultValue={name}
          valueChange={setName}
          placeholder="Search by name"
        />
      </div>
      <div className="filters">
        <div className="filters-wrapper">
          <FilterDropdown
            items={filterCategories}
            className="filters__dropdown"
            label="Topics"
            selected={topics}
            onChange={(item) => toggleFilters(topics, 'topics', item)}
          />
        </div>
        <div className="filters-inner">
          <FilterDropdown
            items={filterLanguages}
            className="filters__dropdown"
            label="Languages"
            selected={languages}
            onChange={(item) => toggleFilters(languages, 'languages', item)}
          />
          <div className="filter-favourites" onClick={setFavorites}>
            <Icon
              icon={showFavorites ? 'heartFilled' : 'heart'}
              className="filter-favourites__icon"
              space="right"
            />
            Only Favorites
          </div>
        </div>
      </div>
      <div className="active-filters">
        <div className="location-filter-wrapper">
          <FilterDropdown
            items={filterRediLocations}
            className="filters__dropdown"
            label="Location"
            selected={locations}
            onChange={(item) => toggleFilters(locations, 'locations', item)}
          />
        </div>

        {(topics.length !== 0 ||
          languages.length !== 0 ||
          locations.length !== 0) && (
          <>
            {(topics as string[]).map((catId) => (
              <FilterTag
                key={catId}
                id={catId}
                label={CATEGORIES[catId]}
                onClickHandler={(item) => toggleFilters(topics, 'topics', item)}
              />
            ))}
            {(languages as string[]).map((langId) => (
              <FilterTag
                key={langId}
                id={langId}
                label={langId}
                onClickHandler={(item) =>
                  toggleFilters(languages, 'languages', item)
                }
              />
            ))}
            {(locations as RediLocation[]).map((locId) =>
                locId && (
                  <FilterTag
                    key={locId}
                    id={locId}
                    label={REDI_LOCATION_NAMES[locId as RediLocation] as string}
                    onClickHandler={(item) =>
                      toggleFilters(locations, 'locations', item)
                    }
                  />
                )
            )}
            <span className="active-filters__clear-all" onClick={clearFilters}>
              Delete all filters
              <Icon icon="cancel" size="small" space="left" />
            </span>
          </>
        )}
      </div>

      <Columns>
        {mentors.map((mentor: RedProfile) => {
          const isFavorite = favouritedRedProfileIds.includes(mentor.id)

          if (!isFavorite && showFavorites) return

          return (
            <Columns.Column size={4} key={mentor.id}>
              <ProfileCard
                profile={mentor}
                linkTo={`/app/find-a-mentor/profile/${mentor.id}`}
                toggleFavorite={(item) =>
                  toggleFavorites(favouritedRedProfileIds, item)
                }
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

const mapDispatchToProps = (dispatch: Function) => ({
  profileSaveStart: (profile: Partial<RedProfile>) =>
    dispatch(profileSaveStart(profile)),
})
export default connect(mapStateToProps, mapDispatchToProps)(FindAMentor)
