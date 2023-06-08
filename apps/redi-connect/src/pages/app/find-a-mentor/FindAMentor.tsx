import {
  ConnectProfileStatus,
  Language,
  MentoringTopic,
  RediLocation,
  useFavoriteMentorMutation,
  useFindAvailableMentorsQuery,
  useListFavoriteMentorsQuery,
  useLoadMyProfileQuery,
  useUnfavoriteMentorMutation,
} from '@talent-connect/data-access'
import {
  Checkbox,
  FilterDropdown,
  Heading,
  Icon,
  SearchField,
} from '@talent-connect/shared-atomic-design-components'
import {
  CATEGORIES,
  LANGUAGES,
  REDI_LOCATION_NAMES,
} from '@talent-connect/shared-config'
import { objectKeys } from '@talent-connect/typescript-utilities'
import { useEffect, useState } from 'react'
import { Columns, Content, Tag } from 'react-bulma-components'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'
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

const filterLanguages = Object.keys(Language).map((language) => ({
  value: language,
  label: LANGUAGES[language],
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

const FindAMentor = () => {
  const queryClient = useQueryClient()
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const favouriteMentorsQuery = useListFavoriteMentorsQuery({})
  const favoriteMentorMutation = useFavoriteMentorMutation()
  const unfavoriteMentorMutation = useUnfavoriteMentorMutation()

  const { Loading, isLoading } = useLoading()
  const history = useHistory()
  const profile = myProfileQuery.data?.conProfile

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
      languages: languages as Language[],
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
    setQuery(hasQuery ? query : { ...query, topics: profile?.categories ?? [] })
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

  const filterRediLocations = objectKeys(REDI_LOCATION_NAMES).map(
    (location) => ({
      value: location,
      label: REDI_LOCATION_NAMES[location as RediLocation] as string,
    })
  )

  if (profile && profile?.profileStatus !== ConnectProfileStatus.Approved)
    return <LoggedIn />

  const menteeHasAnActiveMatch =
    profile?.userType === 'MENTEE' &&
    profile?.mentorshipMatches.length > 0 &&
    profile?.mentorshipMatches?.[0].status === 'ACCEPTED'

  if (menteeHasAnActiveMatch) {
    const matchId = profile?.mentorshipMatches?.[0].id
    history.replace(`/app/mentorships/${matchId}`)
  }

  // This logic filters away mentors that have have opted out of being
  // receiving application form mentees from other locations
  const mentors = mentorsQuery.data?.conProfilesAvailableMentors.filter(
    (mentor) =>
      !mentor.optOutOfMenteesFromOtherRediLocation ||
      mentor.rediLocation === profile?.rediLocation
  )

  return (
    <LoggedIn>
      <Heading subtitle size="small" className="oneandhalf-bs">
        Available mentors {mentors?.length ? `(${mentors.length})` : ''}
      </Heading>
      <div className="filters">
        <div className="filters-inner">
          <SearchField
            defaultValue={name}
            valueChange={setName}
            placeholder="Search by name"
          />
        </div>
      </div>
      <div className="filters">
        <div className="filters-inner">
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
        </div>
        <div className="filters-inner">
          <FilterDropdown
            items={filterRediLocations}
            className="filters__dropdown"
            label="Location"
            selected={locations}
            onChange={(item) => toggleFilters(locations, 'locations', item)}
          />
        </div>
      </div>
      <div className="filters">
        <div className="filters-inner filter-favourites">
          <Checkbox
            name="onlyFavorites"
            checked={onlyFavorites || false}
            handleChange={setFavorites}
          >
            Only Favorites
          </Checkbox>
          <Icon
            icon="heartFilled"
            className="filter-favourites__icon"
            size="small"
          />
        </div>
      </div>
      <div className="active-filters">
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
