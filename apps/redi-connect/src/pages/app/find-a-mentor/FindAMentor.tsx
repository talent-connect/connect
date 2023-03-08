import React, { useCallback, useEffect, useState } from 'react'
import { Content, Columns, Tag, Form } from 'react-bulma-components'
import { debounce, values } from 'lodash'
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
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'
import { LoggedIn } from '../../../components/templates'

import {
  CATEGORIES,
  Language,
  MentoringGoalKey,
  DesiredRolesKey,
  MentoringTopicKey,
  REDI_LOCATION_NAMES,
  MENTORING_TOPICS,
  MENTORING_TOPICS_MAP,
  FIELDS_OF_EXPERTISE,
  FieldOfExperienceKey,
} from '@talent-connect/shared-config'
import './FindAMentor.scss'
import { toggleValueInArray, ensureMenteeProfileIsComplete } from './utils'
import {
  StringParam,
  useQueryParams,
  ArrayParam,
  BooleanParam,
  withDefault,
} from 'use-query-params'
import { objectKeys } from '@talent-connect/typescript-utilities'

interface FindAMentorProps {
  profile: RedProfile
  profileSaveStart: (profile: Partial<RedProfile>) => void
}

function FindAMentor({ profile, profileSaveStart }: FindAMentorProps) {
  profile = ensureNoUndefinedArrayPropertiesInProfile(profile)
  const { Loading, isLoading, setLoading } = useLoading()
  const [allFetchedMentors, setAllFetchedMentors] = useState<RedProfile[]>([])
  const [queryParams, setQuery] = useQueryParams({
    nameQuery: withDefault(StringParam, undefined),
    onlyFavorites: withDefault(BooleanParam, undefined),
    mentoringTopics: withDefault(ArrayParam, []),
    mentoringTopicsToolsAndFrameworks: withDefault(ArrayParam, []),
    locations: withDefault(ArrayParam, []),
    roles: withDefault(ArrayParam, []),
  })

  const nameQuery = queryParams.nameQuery
  const onlyFavorites = queryParams.onlyFavorites
  const mentoringTopics =
    queryParams.mentoringTopics as Array<MentoringTopicKey>
  const mentoringTopicsToolsAndFrameworks =
    queryParams.mentoringTopicsToolsAndFrameworks as Array<MentoringTopicKey>
  const locations = queryParams.locations
  const roles = queryParams.roles

  useEffect(() => {
    setLoading(true)
    getMentors({
      nameQuery: nameQuery ?? '',
    }).then((mentors) => {
      setAllFetchedMentors(ensureNoUndefinedArrayPropertiesInProfiles(mentors))
      setLoading(false)
    })
  }, [nameQuery])

  const { id, favouritedRedProfileIds, rediLocation } = profile
  const [showFavorites, setShowFavorites] = useState<boolean>(false)

  const toggleFilters = (filtersArr, filterName, item) => {
    const newFilters = toggleValueInArray(filtersArr, item)
    setQuery((latestQuery) => ({ ...latestQuery, [filterName]: newFilters }))
  }

  const setName = (value) => {
    setQuery((latestQuery) => ({
      ...latestQuery,
      nameQuery: value || undefined,
    }))
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
      mentoringTopics: [],
      mentoringTopicsToolsAndFrameworks: [],
      locations: [],
      roles: [],
    }))
  }

  const isMenteeProfileComplete = ensureMenteeProfileIsComplete(profile)

  if (profile.userActivated !== true || !isMenteeProfileComplete)
    return <LoggedIn />

  const eligibleMentors = allFetchedMentors
    .filter((mentor) => mentor.currentFreeMenteeSpots > 0)
    .filter(
      (mentor) =>
        !mentor.optOutOfMenteesFromOtherRediLocation ||
        mentor.rediLocation === rediLocation
    )

  const mentorGroups = filterGroupRankMentors(eligibleMentors, {
    menteeDesiredRoles: [
      profile.mentee_primaryRole_fieldOfExpertise,
      profile.mentee_secondaryRole_fieldOfExpertise,
    ],
    menteeLanguages: profile.languages,
    menteeMentoringGoal: profile.mentee_mentoringGoal,
    menteePrimaryRoleMentoringTopics:
      profile.mentee_primaryRole_mentoringTopics,
    menteeSecondaryRoleMentoringTopics:
      profile.mentee_secondaryRole_mentoringTopics,
    menteeToolsAndFrameworksTopics:
      profile.mentee_toolsAndFrameworks_mentoringTopics,

    chosenMentoringTopics: mentoringTopics,
    chosenToolsAndFrameworks: mentoringTopicsToolsAndFrameworks,
    chosenLocations: locations as Array<RediLocation>,
    chosedDesiredRoles: roles as Array<FieldOfExperienceKey>,

    favoritedMentorsEnabled: showFavorites,
    favoritedMentors: favouritedRedProfileIds,
  })

  const mentorCount =
    mentorGroups.bestMatchMentors.length + mentorGroups.otherMentors.length

  return (
    <LoggedIn>
      <Loading />
      <Heading subtitle size="small" className="oneandhalf-bs">
        Available mentors ({mentorCount})
      </Heading>
      <div className="filters">
        <div className="filters-wrapper">
          <SearchField
            defaultValue={nameQuery}
            valueChange={setName}
            placeholder="Search by name"
          />
        </div>

        <div className="filter-favourites" onClick={setFavorites}>
          <Icon
            icon={showFavorites ? 'heartFilled' : 'heart'}
            className="filter-favourites__icon"
            space="right"
          />
          Only Favorites
        </div>
      </div>
      <div className="filters">
        <div className="filters-wrapper">
          <FilterDropdown
            items={filterItemsMentoringTopics}
            className="filters__dropdown"
            label="Topics"
            selected={mentoringTopics}
            onChange={(item) =>
              toggleFilters(mentoringTopics, 'mentoringTopics', item)
            }
          />
        </div>
        <div className="filters-wrapper">
          <FilterDropdown
            items={filterItemsToolsAndFrameworks}
            className="filters__dropdown"
            label="Tools and Frameworks"
            selected={mentoringTopicsToolsAndFrameworks}
            onChange={(item) =>
              toggleFilters(
                mentoringTopicsToolsAndFrameworks,
                'mentoringTopicsToolsAndFrameworks',
                item
              )
            }
          />
        </div>
        <div className="filters-wrapper">
          <FilterDropdown
            items={filterItemsLocations}
            className="filters__dropdown"
            label="Location"
            selected={locations}
            onChange={(item) => toggleFilters(locations, 'locations', item)}
          />
        </div>
      </div>
      <div className="filters">
        <div className="filters-wrapper">
          <FilterDropdown
            items={filterItemsRoles}
            className="filters__dropdown"
            label="Roles"
            selected={roles}
            onChange={(item) => toggleFilters(roles, 'roles', item)}
          />
        </div>
      </div>
      <div className="active-filters">
        {(mentoringTopics.length !== 0 ||
          mentoringTopicsToolsAndFrameworks.length !== 0 ||
          locations.length !== 0 ||
          roles.length !== 0) && (
          <>
            {(mentoringTopics as string[]).map((id) => (
              <FilterTag
                key={id}
                id={id}
                label={MENTORING_TOPICS_MAP[id]}
                onClickHandler={(item) =>
                  toggleFilters(mentoringTopics, 'mentoringTopics', item)
                }
              />
            ))}
            {(mentoringTopicsToolsAndFrameworks as string[]).map((id) => (
              <FilterTag
                key={id}
                id={id}
                label={MENTORING_TOPICS_MAP[id]}
                onClickHandler={(item) =>
                  toggleFilters(
                    mentoringTopicsToolsAndFrameworks,
                    'mentoringTopicsToolsAndFrameworks',
                    item
                  )
                }
              />
            ))}
            {(locations as string[]).map((id) => (
              <FilterTag
                key={id}
                id={id}
                label={REDI_LOCATION_NAMES[id]}
                onClickHandler={(item) =>
                  toggleFilters(locations, 'locations', item)
                }
              />
            ))}
            {(roles as string[]).map((id) => (
              <FilterTag
                key={id}
                id={id}
                label={FIELDS_OF_EXPERTISE[id]}
                onClickHandler={(item) => toggleFilters(roles, 'roles', item)}
              />
            ))}

            <span className="active-filters__clear-all" onClick={clearFilters}>
              Delete all filters
              <Icon icon="cancel" size="small" space="left" />
            </span>
          </>
        )}
      </div>

      {mentorCount === 0 && !isLoading && (
        <Content>
          <>
            Unfortunately <strong>could not find any mentors</strong> matching
            your search criterias.
          </>
        </Content>
      )}
      {mentorCount > 0 && (
        <>
          <h3 style={{ fontSize: '20pt' }}>
            Best Matches ({mentorGroups.bestMatchMentors.length})
          </h3>
          <Columns>
            {mentorGroups.bestMatchMentors.map((mentor: RedProfile) => (
              <Columns.Column size={4} key={mentor.id}>
                <ProfileCard
                  profile={mentor}
                  linkTo={`/app/find-a-mentor/profile/${mentor.id}`}
                  toggleFavorite={(item) =>
                    toggleFavorites(favouritedRedProfileIds, item)
                  }
                  isFavorite={favouritedRedProfileIds.includes(mentor.id)}
                />
              </Columns.Column>
            ))}
          </Columns>
          <h3 style={{ fontSize: '20pt' }}>
            All mentors ({mentorGroups.otherMentors.length})
          </h3>
          <Columns>
            {mentorGroups.otherMentors.map((mentor: RedProfile) => (
              <Columns.Column size={4} key={mentor.id}>
                <ProfileCard
                  profile={mentor}
                  linkTo={`/app/find-a-mentor/profile/${mentor.id}`}
                  toggleFavorite={(item) =>
                    toggleFavorites(favouritedRedProfileIds, item)
                  }
                  isFavorite={favouritedRedProfileIds.includes(mentor.id)}
                />
              </Columns.Column>
            ))}
          </Columns>
        </>
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

const filterItemsMentoringTopics = MENTORING_TOPICS.filter(
  ({ group }) => group !== 'toolsAndFrameworks'
).map((category) => ({
  value: category.id,
  label: category.label,
}))
const filterItemsToolsAndFrameworks = MENTORING_TOPICS.filter(
  ({ group }) => group === 'toolsAndFrameworks'
).map((category) => ({
  value: category.id,
  label: category.label,
}))
const filterItemsLocations = Object.entries(REDI_LOCATION_NAMES).map(
  ([value, label]) => ({ value, label })
)
const filterItemsRoles = Object.entries(FIELDS_OF_EXPERTISE).map(
  ([value, label]) => ({ value, label })
)

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

interface FilteredMentors {
  bestMatchMentors: RedProfile[]
  otherMentors: RedProfile[]
}
interface FiltersValues {
  menteeLanguages: Array<Language>
  menteeMentoringGoal: MentoringGoalKey
  menteeDesiredRoles: Array<DesiredRolesKey>
  menteePrimaryRoleMentoringTopics: Array<MentoringTopicKey>
  menteeSecondaryRoleMentoringTopics: Array<MentoringTopicKey>
  menteeToolsAndFrameworksTopics: Array<MentoringTopicKey>

  chosenMentoringTopics: Array<MentoringTopicKey>
  chosenToolsAndFrameworks: Array<MentoringTopicKey>
  chosenLocations: Array<RediLocation>
  chosedDesiredRoles: Array<FieldOfExperienceKey>

  favoritedMentorsEnabled: boolean
  favoritedMentors: string[]
}

const filterGroupRankMentors = (
  mentors: RedProfile[],
  filters: FiltersValues
): FilteredMentors => {
  const filterFns = curriedFilterFunctions(filters)
  const displayableMentors = mentors
    .filter(filterFns.favorites)
    .filter(filterFns.chosenMentoringTopics)
    .filter(filterFns.chosenToolsAndFrameworks)
    .filter(filterFns.chosenLocations)
    .filter(filterFns.chosenDesiredRoles)
    .filter(filterFns.mentorSharesLanguageWithMentee)
    .filter(filterFns.menteeMentoringGoalCompatibleWithMentor)

  const groupedMentors = {
    bestMatchMentors: [] as Array<RedProfile>,
    otherMentors: [] as Array<RedProfile>,
  }

  for (const mentor of displayableMentors) {
    if (filterFns.isBestMatchMentor(mentor))
      groupedMentors.bestMatchMentors.push(mentor)
    else groupedMentors.otherMentors.push(mentor)
  }

  return groupedMentors
}

const curriedFilterFunctions = (filters: FiltersValues) => {
  const allMenteeRoleMentoringTopics = [
    ...filters.menteePrimaryRoleMentoringTopics,
    ...filters.menteeSecondaryRoleMentoringTopics,
  ]

  return {
    favorites(mentor: RedProfile) {
      if (!filters.favoritedMentorsEnabled) return true
      return filters.favoritedMentors.includes(mentor.id)
    },
    chosenMentoringTopics(mentor: RedProfile) {
      if (filters.chosenMentoringTopics.length === 0) return true
      return mentor.mentor_mentoringTopics.some((topic) =>
        filters.chosenMentoringTopics.includes(topic)
      )
    },
    chosenToolsAndFrameworks(mentor: RedProfile) {
      if (filters.chosenToolsAndFrameworks.length === 0) return true
      return mentor.mentor_mentoringTopics.some((topic) =>
        filters.chosenToolsAndFrameworks.includes(topic)
      )
    },
    chosenLocations(mentor: RedProfile) {
      if (filters.chosenLocations.length === 0) return true
      return filters.chosenLocations.includes(mentor.rediLocation)
    },
    chosenDesiredRoles(mentor: RedProfile) {
      if (filters.chosedDesiredRoles.length === 0) return true
      return mentor.mentor_professionalExperienceFields.some((field) =>
        filters.chosedDesiredRoles.includes(field)
      )
    },
    mentorSharesLanguageWithMentee(mentor: RedProfile) {
      return (
        mentor.languages.some((lang) =>
          filters.menteeLanguages.includes(lang)
        ) || []
      )
    },
    menteeMentoringGoalCompatibleWithMentor(mentor: RedProfile) {
      switch (filters.menteeMentoringGoal) {
        /**
         * When mentee has one of the following goals from a mentorship,
         * we filter the mentors with relevant professional experience with mentee's
         * desired roles
         */
        case 'tutoringInAParticularSkillTool':
        case 'preparationForACertificationInterview':
        case 'careerOrientatioPlanning':
          if (
            !mentor.mentor_professionalExperienceFields.some((field) =>
              filters.menteeDesiredRoles.includes(field)
            )
          )
            return false

        /**
         * If the mentee has Primary or Secondary Skills selected, we match those
         * with the mentor's mentoringTopics to filter mentors. If they are not selected
         * we don't filter.
         */
        case 'tutoringInAParticularSkillTool':
        case 'preparationForACertificationInterview':
          if (
            allMenteeRoleMentoringTopics.length > 0 &&
            !allMenteeRoleMentoringTopics.some((topic) =>
              mentor.mentor_mentoringTopics.includes(topic)
            )
          )
            return false

        default:
          return true
      }
    },
    isBestMatchMentor(mentor: RedProfile) {
      switch (filters.menteeMentoringGoal) {
        case 'tutoringInAParticularSkillTool':
        case 'preparationForACertificationInterview':
          return filters.menteeToolsAndFrameworksTopics.some((topic) =>
            mentor.mentor_mentoringTopics.includes(topic)
          )

        case 'careerOrientatioPlanning':
          return allMenteeRoleMentoringTopics.some((topic) =>
            mentor.mentor_mentoringTopics.includes(topic)
          )

        case 'jobSearchAndApplicationProcess':
        case 'buildingAProfessionalNetwork':
        case 'entrepreneurshipAndFreelancing':
          return allMenteeRoleMentoringTopics.some((topic) =>
            mentor.mentor_mentoringTopics.includes(topic)
          )

        default:
          // Exhaustiveness check: we should never hit this clause
          throw new Error(
            `Unexpected mentee mentoring goal: ${filters.menteeMentoringGoal}`
          )
      }
    },
  }
}

function ensureNoUndefinedArrayPropertiesInProfile(mentor: RedProfile) {
  const keys = [
    'languages',
    'categories',
    'favouritedRedProfileIds',
    'mentor_mentoringTopics',
    'mentor_mentoringGoals',
    'mentor_professionalExperienceFields',
    'mentee_mentoringGoal',
    'mentee_overarchingMentoringTopics',
    'mentee_primaryRole_mentoringTopics',
    'mentee_secondaryRole_mentoringTopics',
    'mentee_toolsAndFrameworks_mentoringTopics',
  ]

  keys.forEach((key) => {
    if (mentor[key] === undefined) {
      mentor[key] = []
    }
  })

  return mentor
}

function ensureNoUndefinedArrayPropertiesInProfiles(mentors: RedProfile[]) {
  const fixedMentors = mentors.map(ensureNoUndefinedArrayPropertiesInProfile)

  return fixedMentors
}
