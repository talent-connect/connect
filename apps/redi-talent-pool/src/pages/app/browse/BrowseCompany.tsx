import { useState } from 'react'
import { useHistory } from 'react-router'
import {
  ArrayParam,
  BooleanParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params'

import { Columns, Element, Tag } from 'react-bulma-components'
import {
  Checkbox,
  FilterDropdown,
  Icon,
  SearchField,
} from '@talent-connect/shared-atomic-design-components'

import {
  desiredEmploymentTypeOptions,
  desiredEmploymentTypeOptionsIdToLabelMap,
  desiredPositions,
  desiredPositionsIdToLabelMap,
  germanFederalStates,
  topSkills,
  topSkillsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import { LANGUAGES } from '@talent-connect/shared-config'
import { objectEntries } from '@talent-connect/typescript-utilities'

import { LoggedIn } from '../../../components/templates'
import { JobseekerProfileCard } from '../../../components/organisms/JobseekerProfileCard'

import { useTpCompanyProfileUpdateMutation } from '../../../react-query/use-tpcompanyprofile-mutation'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { useBrowseTpJobseekerProfilesQuery } from '../../../react-query/use-tpjobseekerprofile-query'

const germanFederalStatesOptions = objectEntries(germanFederalStates).map(
  ([value, label]) => ({
    value,
    label,
  })
)

export function BrowseCompany() {
  const [query, setQuery] = useQueryParams({
    name: withDefault(StringParam, ''),
    desiredLanguages: withDefault(ArrayParam, []),
    desiredPositions: withDefault(ArrayParam, []),
    employmentTypes: withDefault(ArrayParam, []),
    skills: withDefault(ArrayParam, []),
    federalStates: withDefault(ArrayParam, []),
    onlyFavorites: withDefault(BooleanParam, undefined),
    isJobFair2023Participant: withDefault(BooleanParam, undefined),
  })
  const {
    name,
    desiredLanguages,
    desiredPositions,
    employmentTypes,
    skills,
    federalStates,
    onlyFavorites,
    isJobFair2023Participant,
  } = query

  const history = useHistory()

  const { data: jobseekerProfiles } = useBrowseTpJobseekerProfilesQuery({
    name,
    workingLanguages: desiredLanguages,
    desiredPositions,
    employmentTypes,
    skills,
    federalStates,
    isJobFair2023Participant,
  })

  console.log('jobseekerProfiles', jobseekerProfiles)
  console.log('desiredLanguages', desiredLanguages)

  const { data: companyProfile } = useTpCompanyProfileQuery()
  const tpCompanyProfileUpdateMutation = useTpCompanyProfileUpdateMutation()

  const handleFavoriteJobseeker = (value) => {
    const newFavorites = !companyProfile.favouritedTpJobseekerIds
      ? [value]
      : toggleValueInArray(companyProfile.favouritedTpJobseekerIds, value)

    tpCompanyProfileUpdateMutation.mutate({
      favouritedTpJobseekerIds: newFavorites,
    })
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

  const toggleJobFair2023Filter = () =>
    setQuery((latestQuery) => ({
      ...latestQuery,
      isJobFair2023Participant:
        isJobFair2023Participant === undefined ? true : undefined,
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
      isJobFair2023Participant: undefined,
    }))
  }

  const shouldShowFilters =
    desiredLanguages.length !== 0 ||
    skills.length !== 0 ||
    desiredPositions.length !== 0 ||
    federalStates.length !== 0 ||
    employmentTypes.length !== 0 ||
    isJobFair2023Participant

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
        <div
          className="filters-inner filter-favourites"
          onClick={toggleOnlyFavoritesFilter}
        >
          <Icon
            icon={onlyFavorites ? 'heartFilled' : 'heart'}
            className="filter-favourites__icon"
            space="right"
          />
          Only Favorites
        </div>
      </div>
      <div className="filters">
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
        <div className="filters-inner filters__jobfair">
          <Checkbox
            name="isJobFair2023Participant"
            checked={isJobFair2023Participant || false}
            handleChange={toggleJobFair2023Filter}
          >
            Attending ReDI Job Fair 2023
          </Checkbox>
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
                label={desiredEmploymentTypeOptionsIdToLabelMap[id]}
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
            {isJobFair2023Participant && (
              <FilterTag
                key="redi-job-fair-2022-filter"
                id="redi-job-fair-2022-filter"
                label="Attending ReDI Job Fair 2023"
                onClickHandler={toggleJobFair2023Filter}
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
        {jobseekerProfiles?.map((profile) => {
          const isFavorite = companyProfile.favouritedTpJobseekerIds?.includes(
            profile.id
          )

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
                onClick={() =>
                  history.push(`/app/jobseeker-profile/${profile.id}`)
                }
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
const employmentTypesOptions = desiredEmploymentTypeOptions.map(
  ({ id, label }) => ({
    value: id,
    label,
  })
)
const desiredLanguagesOptions = LANGUAGES.map((language) => ({
  value: language,
  label: language,
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

export function toggleValueInArray<T>(array: Array<T>, value: T) {
  if (array.includes(value)) return array.filter((val) => val !== value)
  else return [...array, value]
}
