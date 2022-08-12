import {
  ConnectProfileLanguage,
  ConnectProfileStatus,
  MentoringTopic,
  RediLocation,
  useFavoriteMentorMutation,
  useFindAvailableMentorsQuery,
  useListFavoriteMentorsQuery,
  useLoadMyProfileQuery,
  useUnfavoriteMentorMutation,
} from '@talent-connect/data-access'
import {
  FilterDropdown,
  Heading,
  Icon,
  SearchField,
} from '@talent-connect/shared-atomic-design-components'
import { CATEGORIES, REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import { RedProfile } from '@talent-connect/shared-types'
import { objectKeys } from '@talent-connect/typescript-utilities'
import { useEffect, useState } from 'react'
import { Columns, Content, Tag } from 'react-bulma-components'
import { useQueryClient } from 'react-query'
import {
  ArrayParam,
  BooleanParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params'
import { ProfileCard } from '../../../components/organisms'
import { LoggedIn } from '../../../components/templates'
import { useLoading } from '../../../hooks/WithLoading'
import { getAccessTokenFromLocalStorage } from '../../../services/auth/auth'
import './FindAMentor.scss'
import { toggleValueInArray } from './utils'

const filterCategories = CATEGORIES.map((category) => ({
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

const FindAMentor = () => {
  const queryClient = useQueryClient()
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const favouriteMentorsQuery = useListFavoriteMentorsQuery({})
  const favoriteMentorMutation = useFavoriteMentorMutation()
  const unfavoriteMentorMutation = useUnfavoriteMentorMutation()

  const { Loading, isLoading } = useLoading()

  // const {
  //   id,
  //   categories: categoriesFromProfile,
  //   favouritedRedProfileIds,
  //   rediLocation,
  // } = profile

  const [showFavorites, setShowFavorites] = useState<boolean>(false)
  const [query, setQuery] = useQueryParams({
    name: withDefault(StringParam, undefined),
    topics: withDefault(ArrayParam, []),
    languages: withDefault(ArrayParam, []),
    locations: withDefault(ArrayParam, []),
    onlyFavorites: withDefault(BooleanParam, undefined),
  })
  const { topics, name, languages, locations, onlyFavorites } = query

  const mentorsQuery = useFindAvailableMentorsQuery({
    filter: {
      // TODO: find a way to pass type information to the useQueryParams() above
      categories: topics as MentoringTopic[],
      name,
      languages: languages as ConnectProfileLanguage[],
      locations: locations as RediLocation[],
    },
  })

  useEffect(() => {
    const hasQuery =
      topics.length > 0 ||
      languages.length > 0 ||
      locations.length > 0 ||
      Boolean(name) ||
      onlyFavorites
    setQuery(
      hasQuery
        ? query
        : { ...query, topics: myProfileQuery.data?.conProfile.categories ?? [] }
    )
  }, [myProfileQuery.data])

  const toggleFilters = (filtersArr, filterName, item) => {
    const newFilters = toggleValueInArray(filtersArr, item)
    setQuery((latestQuery) => ({ ...latestQuery, [filterName]: newFilters }))
  }

  const setName = (value) => {
    setQuery((latestQuery) => ({ ...latestQuery, name: value || undefined }))
  }

  const currentFavorites =
    favouriteMentorsQuery.data?.conMenteeFavoritedMentors.map(
      (item) => item.mentorId
    ) ?? []

  const toggleFavorite = async (mentorId) => {
    const isMentorCurrentlyFavorited = currentFavorites.includes(mentorId)
    if (isMentorCurrentlyFavorited) {
      await unfavoriteMentorMutation.mutateAsync({ input: { mentorId } })
      queryClient.invalidateQueries(useListFavoriteMentorsQuery.getKey())
    } else {
      await favoriteMentorMutation.mutateAsync({ input: { mentorId } })
      queryClient.invalidateQueries(useListFavoriteMentorsQuery.getKey())
    }
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

  const [filterLanguages, setFilterLanguages] = useState([])
  useEffect(() => {
    if (mentorsQuery?.data?.conProfilesAvailableMentors?.length > 0)
      setFilterLanguages(
        Array.from(
          new Set(
            mentorsQuery.data.conProfilesAvailableMentors
              .map((mentor) => mentor.languages || [])
              .flat()
              .sort()
          )
        ).map((language) => ({
          value: language,
          label: language,
        }))
      )
  }, [mentorsQuery.data?.conProfilesAvailableMentors])

  const filterRediLocations = objectKeys(REDI_LOCATION_NAMES).map(
    (location) => ({
      value: location,
      label: REDI_LOCATION_NAMES[location as RediLocation] as string,
    })
  )

  if (
    myProfileQuery.data?.conProfile &&
    myProfileQuery.data?.conProfile?.profileStatus !==
      ConnectProfileStatus.Approved
  )
    return <LoggedIn />

  const mentors = mentorsQuery.data?.conProfilesAvailableMentors

  return (
    <LoggedIn>
      <Loading />
      <Heading subtitle size="small" className="oneandhalf-bs">
        Available mentors ({mentors?.length})
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
                label={CATEGORIES.find((item) => item.id === catId).label}
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
            {(locations as RediLocation[]).map(
              (locId) =>
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
        {mentors?.map((mentor) => {
          const isFavorite = currentFavorites.includes(mentor.id)

          if (!isFavorite && showFavorites) return

          return (
            <Columns.Column size={4} key={mentor.id}>
              <ProfileCard
                profile={mentor}
                linkTo={`/app/find-a-mentor/profile/${mentor.id}`}
                toggleFavorite={() => toggleFavorite(mentor.id)}
                isFavorite={isFavorite}
              />
            </Columns.Column>
          )
        })}
      </Columns>

      {mentors?.length === 0 && !isLoading && (
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

export default FindAMentor
