import {
  FederalState,
  Language,
  TpDesiredPosition,
  TpEmploymentType,
  TpTechnicalSkill,
  useTpJobseekerDirectoryEntriesFindAllVisibleQuery,
} from '@talent-connect/data-access'
import {
  Checkbox,
  FilterDropdown,
  Icon,
  Paginate,
  SearchField,
} from '@talent-connect/shared-atomic-design-components'
import { LANGUAGES } from '@talent-connect/shared-config'
import {
  desiredPositions,
  desiredPositionsIdToLabelMap,
  employmentTypes,
  employmentTypesIdToLabelMap,
  germanFederalStates,
  topSkills,
  topSkillsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import { objectEntries } from '@talent-connect/typescript-utilities'
import { useState } from 'react'
import { Columns, Element, Tag } from 'react-bulma-components'
import { useQueryClient } from 'react-query'
import {
  ArrayParam,
  BooleanParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params'
import { JobseekerProfileCard } from '../../../components/organisms/JobseekerProfileCard'
import { LoggedIn } from '../../../components/templates'
import {
  useTpCompanyFavouritedJobseekerProfilesQuery,
  useTpCompanyMarkJobseekerAsFavouriteMutation,
  useTpCompanyUnmarkJobseekerAsFavouriteMutation,
} from './BrowseCompany.generated'

export function BrowseCompany() {
  const queryClient = useQueryClient()
  const JOBSEEKER_CARDS_PER_PAGE = 12

  const [currentPageNumber, setCurrentPageNumber] = useState(1)
  const [query, setQuery] = useQueryParams({
    name: withDefault(StringParam, ''),
    desiredLanguages: withDefault(ArrayParam, []),
    desiredPositions: withDefault(ArrayParam, []),
    employmentTypes: withDefault(ArrayParam, []),
    skills: withDefault(ArrayParam, []),
    federalStates: withDefault(ArrayParam, []),
    onlyFavorites: withDefault(BooleanParam, undefined),
    joinsMunich24SummerJobFair: withDefault(BooleanParam, undefined),
  })
  const name = query.name
  const desiredLanguages = query.desiredLanguages as Language[]
  const desiredPositions = query.desiredPositions as TpDesiredPosition[]
  const employmentTypes = query.employmentTypes as TpEmploymentType[]
  const skills = query.skills as TpTechnicalSkill[]
  const federalStates = query.federalStates as FederalState[]
  const onlyFavorites = query.onlyFavorites
  const joinsMunich24SummerJobFair = query.joinsMunich24SummerJobFair

  const jobseekerProfilesQuery =
    useTpJobseekerDirectoryEntriesFindAllVisibleQuery({
      input: {
        name,
        desiredLanguages,
        desiredPositions,
        employmentTypes,
        skills,
        federalStates,
        joinsMunich24SummerJobFair,
      },
    })

  const jobseekerProfiles =
    jobseekerProfilesQuery?.data?.tpJobseekerDirectoryEntriesVisible

  const lastItemIndex = currentPageNumber * JOBSEEKER_CARDS_PER_PAGE
  const firstItemIndex = lastItemIndex - JOBSEEKER_CARDS_PER_PAGE
  const currentItems = jobseekerProfiles?.slice(firstItemIndex, lastItemIndex)

  const totalItems = jobseekerProfiles?.length
  const totalPagesNumber = totalItems
    ? Math.ceil(totalItems / JOBSEEKER_CARDS_PER_PAGE)
    : undefined

  const favoritedJobseekersQuery =
    useTpCompanyFavouritedJobseekerProfilesQuery()
  const favouriteJobseekerMutation =
    useTpCompanyMarkJobseekerAsFavouriteMutation()
  const unfavouriteJobseekerMutation =
    useTpCompanyUnmarkJobseekerAsFavouriteMutation()

  const handleFavoriteJobseeker = async (tpJobseekerProfileId: string) => {
    const isFavorite =
      favoritedJobseekersQuery.data?.tpCompanyFavoritedJobseekerProfiles
        ?.map((p) => p.favoritedTpJobseekerProfileId)
        ?.includes(tpJobseekerProfileId)
    if (isFavorite) {
      await unfavouriteJobseekerMutation.mutateAsync({
        input: { tpJobseekerProfileId: tpJobseekerProfileId },
      })
    } else {
      await favouriteJobseekerMutation.mutateAsync({
        input: { tpJobseekerProfileId: tpJobseekerProfileId },
      })
    }
    queryClient.invalidateQueries(
      useTpCompanyFavouritedJobseekerProfilesQuery.getKey()
    )
  }

  const toggleOnlyFavoritesFilter = () => {
    setQuery((latestQuery) => ({
      ...latestQuery,
      onlyFavorites: onlyFavorites ? undefined : true,
    }))
  }

  const toggleFilters = (filtersArr, filterName, item) => {
    const newFilters = toggleValueInArray(filtersArr, item)
    setQuery((latestQuery) => ({ ...latestQuery, [filterName]: newFilters }))
  }

  const toggleMunich24SummerJobFairFilter = () =>
    setQuery((latestQuery) => ({
      ...latestQuery,
      joinsMunich24SummerJobFair:
        joinsMunich24SummerJobFair === undefined ? true : undefined,
    }))

  const setName = (value) => {
    setQuery((latestQuery) => ({ ...latestQuery, name: value || undefined }))
  }

  const clearFilters = () => {
    setQuery((latestQuery) => ({
      ...latestQuery,
      desiredLanguages: [],
      skills: [],
      desiredPositions: [],
      employmentTypes: [],
      federalStates: [],
      joinsMunich24SummerJobFair: undefined,
    }))
  }

  const shouldShowFilters =
    desiredLanguages.length !== 0 ||
    skills.length !== 0 ||
    desiredPositions.length !== 0 ||
    federalStates.length !== 0 ||
    employmentTypes.length !== 0 ||
    joinsMunich24SummerJobFair

  return (
    <LoggedIn>
      <Element
        renderAs="h4"
        textSize={3}
        responsive={{ mobile: { textSize: { value: 4 } } }}
        className="is-flex-grow-1"
        style={{ flexGrow: 1 }}
      >
        Browse our Talent Pool
        {jobseekerProfiles?.length ? ` (${jobseekerProfiles.length})` : ''}
      </Element>
      <Element
        renderAs="p"
        textSize={4}
        responsive={{ mobile: { textSize: { value: 6 } } }}
        className="oneandhalf-bs"
      >
        Browse our Jobseeker profiles and find the talent you're looking for.
      </Element>
      <div className="filters">
        <div className="filters-inner">
          <SearchField
            defaultValue={name}
            valueChange={setName}
            placeholder="Search by name"
          />
        </div>
        <div className="filters-inner">
          <FilterDropdown
            items={desiredPositionsOptions}
            className="filters__dropdown"
            label="Desired position"
            selected={desiredPositions}
            onChange={(item) =>
              toggleFilters(desiredPositions, 'desiredPositions', item)
            }
          />
        </div>
        <div className="filters-inner">
          <FilterDropdown
            items={employmentTypesOptions}
            className="filters__dropdown"
            label="Employment Type"
            selected={employmentTypes}
            onChange={(item) =>
              toggleFilters(employmentTypes, 'employmentTypes', item)
            }
          />
        </div>
      </div>
      <div className="filters">
        <div className="filters-inner">
          <FilterDropdown
            items={skillsOptions}
            className="filters__dropdown"
            label="Skills"
            selected={skills}
            onChange={(item) => toggleFilters(skills, 'skills', item)}
          />
        </div>
        <div className="filters-inner">
          <FilterDropdown
            items={germanFederalStatesOptions}
            className="filters__dropdown"
            label="Federal State"
            selected={federalStates}
            onChange={(item) =>
              toggleFilters(federalStates, 'federalStates', item)
            }
          />
        </div>
        <div className="filters-inner">
          <FilterDropdown
            items={desiredLanguagesOptions}
            className="filters__dropdown"
            label="Languages"
            selected={desiredLanguages}
            onChange={(item) =>
              toggleFilters(desiredLanguages, 'desiredLanguages', item)
            }
          />
        </div>
      </div>
      <div className="filters">
        <div className="filters-inner filter-favourites">
          <Checkbox
            name="onlyFavorites"
            checked={onlyFavorites || false}
            handleChange={toggleOnlyFavoritesFilter}
          >
            Only Favorites
          </Checkbox>
          <Icon
            icon="heartFilled"
            className="filter-favourites__icon"
            size="small"
          />
        </div>
        <div className="filters-inner">
          <Checkbox
            name="joinsMunich24SummerJobFair"
            checked={joinsMunich24SummerJobFair || false}
            handleChange={toggleMunich24SummerJobFairFilter}
          >
            ReDI Munich Summer Job Fair 2024
          </Checkbox>
        </div>
        {/* Next Div is to keep three filters sizing for two checkboxes. Remove if necessary */}
        <div className="filters-inner"></div>
      </div>

      <div className="active-filters">
        {shouldShowFilters && (
          <>
            {(skills as string[]).map((catId) => (
              <FilterTag
                key={catId}
                id={catId}
                label={topSkillsIdToLabelMap[catId]}
                onClickHandler={(item) => toggleFilters(skills, 'skills', item)}
              />
            ))}
            {(desiredLanguages as string[]).map((id) => (
              <FilterTag
                key={id}
                id={id}
                label={id}
                onClickHandler={(item) =>
                  toggleFilters(desiredLanguages, 'desiredLanguages', item)
                }
              />
            ))}
            {(desiredPositions as string[]).map((id) => (
              <FilterTag
                key={id}
                id={id}
                label={desiredPositionsIdToLabelMap[id]}
                onClickHandler={(item) =>
                  toggleFilters(desiredPositions, 'desiredPositions', item)
                }
              />
            ))}
            {(employmentTypes as string[]).map((id) => (
              <FilterTag
                key={id}
                id={id}
                label={employmentTypesIdToLabelMap[id]}
                onClickHandler={(item) =>
                  toggleFilters(employmentTypes, 'employmentTypes', item)
                }
              />
            ))}
            {(federalStates as string[]).map((id) => (
              <FilterTag
                key={id}
                id={id}
                label={germanFederalStates[id]}
                onClickHandler={(item) =>
                  toggleFilters(federalStates, 'federalStates', item)
                }
              />
            ))}
            {joinsMunich24SummerJobFair && (
              <FilterTag
                key="redi-munich-summer-job-fair-2024-filter"
                id="redi-munich-summer-job-fair-2024-filter"
                label="ReDI Munich Summer Job Fair 2024"
                onClickHandler={toggleMunich24SummerJobFairFilter}
              />
            )}
            <span className="active-filters__clear-all" onClick={clearFilters}>
              Delete all filters
              <Icon icon="cancel" size="small" space="left" />
            </span>
          </>
        )}
      </div>
      <Columns>
        {currentItems
          ?.filter((profile) => {
            if (!onlyFavorites) return true
            const isFavorite =
              favoritedJobseekersQuery.data?.tpCompanyFavoritedJobseekerProfiles
                ?.map((p) => p.favoritedTpJobseekerProfileId)
                ?.includes(profile.id)
            return isFavorite
          })
          .map((profile) => {
            const isFavorite =
              favoritedJobseekersQuery.data?.tpCompanyFavoritedJobseekerProfiles
                ?.map((p) => p.favoritedTpJobseekerProfileId)
                ?.includes(profile.id)

            if (!isFavorite && onlyFavorites) return

            return (
              <Columns.Column
                key={profile.id}
                mobile={{ size: 12 }}
                tablet={{ size: 6 }}
                desktop={{ size: 4 }}
              >
                <JobseekerProfileCard
                  key={profile.id}
                  jobseekerProfile={profile}
                  linkTo={`/app/jobseeker-profile/${profile.id}`}
                  toggleFavorite={handleFavoriteJobseeker}
                  isFavorite={isFavorite}
                />
              </Columns.Column>
            )
          })}
      </Columns>
      <Paginate
        totalPagesNumber={totalPagesNumber}
        currentPageNumber={currentPageNumber}
        setCurrentPageNumber={setCurrentPageNumber}
      />
    </LoggedIn>
  )
}

const skillsOptions = topSkills.map(({ id, label }) => ({ value: id, label }))
const desiredPositionsOptions = desiredPositions.map(({ id, label }) => ({
  value: id,
  label,
}))
const employmentTypesOptions = employmentTypes.map(({ id, label }) => ({
  value: id,
  label,
}))
const desiredLanguagesOptions = Object.entries(LANGUAGES).map(
  ([value, label]) => ({
    value,
    label,
  })
)
const germanFederalStatesOptions = objectEntries(germanFederalStates).map(
  ([value, label]) => ({
    value,
    label,
  })
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

export function toggleValueInArray<T>(array: Array<T>, value: T) {
  if (array.includes(value)) return array.filter((val) => val !== value)
  else return [...array, value]
}
