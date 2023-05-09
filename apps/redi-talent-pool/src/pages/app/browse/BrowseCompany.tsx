import {
  ArrayParam,
  BooleanParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params'

import {
  Checkbox,
  FilterDropdown,
  Icon,
  SearchField,
} from '@talent-connect/shared-atomic-design-components'
import { Columns, Element, Tag } from 'react-bulma-components'

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

import {
  FederalState,
  Language,
  TpDesiredPosition,
  TpEmploymentType,
  TpTechnicalSkill,
  useTpJobseekerDirectoryEntriesFindAllVisibleQuery,
} from '@talent-connect/data-access'
import { useQueryClient } from 'react-query'
import { JobseekerProfileCard } from '../../../components/organisms/JobseekerProfileCard'
import { LoggedIn } from '../../../components/templates'
import {
  useTpCompanyFavouritedJobseekerProfilesQuery,
  useTpCompanyMarkJobseekerAsFavouriteMutation,
  useTpCompanyUnmarkJobseekerAsFavouriteMutation,
} from './BrowseCompany.generated'

const germanFederalStatesOptions = objectEntries(germanFederalStates).map(
  ([value, label]) => ({
    value,
    label,
  })
)

export function BrowseCompany() {
  const queryClient = useQueryClient()

  const [query, setQuery] = useQueryParams({
    name: withDefault(StringParam, ''),
    desiredLanguages: withDefault(ArrayParam, []),
    desiredPositions: withDefault(ArrayParam, []),
    employmentTypes: withDefault(ArrayParam, []),
    skills: withDefault(ArrayParam, []),
    federalStates: withDefault(ArrayParam, []),
    onlyFavorites: withDefault(BooleanParam, undefined),
    // isJobFairJuly2023Participant: withDefault(BooleanParam, undefined),
  })
  const name = query.name
  const desiredLanguages = query.desiredLanguages as Language[]
  const desiredPositions = query.desiredPositions as TpDesiredPosition[]
  const employmentTypes = query.employmentTypes as TpEmploymentType[]
  const skills = query.skills as TpTechnicalSkill[]
  const federalStates = query.federalStates as FederalState[]
  const onlyFavorites = query.onlyFavorites
  // const isJobFairJuly2023Participant = query.isJobFairJuly2023Participant

  const jobseekerProfilesQuery =
    useTpJobseekerDirectoryEntriesFindAllVisibleQuery({
      input: {
        name,
        desiredLanguages,
        desiredPositions,
        employmentTypes,
        skills,
        federalStates,
        // isJobFairJuly2023Participant,
      },
    })
  const jobseekerProfiles =
    jobseekerProfilesQuery.data?.tpJobseekerDirectoryEntriesVisible

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

  // const toggleJobFairJuly2023Filter = () =>
  //   setQuery((latestQuery) => ({
  //     ...latestQuery,
  //     isJobFairJuly2023Participant:
  //       isJobFairJuly2023Participant === undefined ? true : undefined,
  //   }))

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
      // isJobFairJuly2023Participant: undefined,
    }))
  }

  const shouldShowFilters =
    desiredLanguages.length !== 0 ||
    skills.length !== 0 ||
    desiredPositions.length !== 0 ||
    federalStates.length !== 0 ||
    employmentTypes.length !== 0
  //  || isJobFairJuly2023Participant

  return (
    <LoggedIn>
      <Element
        renderAs="h4"
        textSize={3}
        responsive={{ mobile: { textSize: { value: 7 } } }}
        className="is-flex-grow-1"
        style={{ flexGrow: 1 }}
      >
        Browse our Talent Pool
        {jobseekerProfiles?.length ? ` (${jobseekerProfiles.length})` : ''}
      </Element>
      <Element
        renderAs="p"
        textSize={4}
        responsive={{ mobile: { textSize: { value: 5 } } }}
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
        {/* Hidden until the next Job Fair date announced */}
        {/* <div className="filters-inner">
          <Checkbox
            name="isJobFairJuly2023Participant"
            checked={isJobFairJuly2023Participant || false}
            handleChange={toggleJobFairJuly2023Filter}
          >
            Attending ReDI Job Fair 2023
          </Checkbox>
        </div> */}
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
            {/* {isJobFairJuly2023Participant && (
              <FilterTag
                key="redi-job-fair-2022-filter"
                id="redi-job-fair-2022-filter"
                label="Attending ReDI Job Fair 2023"
                onClickHandler={toggleJobFairJuly2023Filter}
              />
            )} */}
            <span className="active-filters__clear-all" onClick={clearFilters}>
              Delete all filters
              <Icon icon="cancel" size="small" space="left" />
            </span>
          </>
        )}
      </div>
      <Columns>
        {jobseekerProfiles
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
