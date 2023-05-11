import { useState } from 'react'
import { Columns, Element, Tag } from 'react-bulma-components'
import {
  ArrayParam,
  BooleanParam,
  useQueryParams,
  withDefault,
} from 'use-query-params'

import {
  Checkbox,
  FilterDropdown,
  Icon,
  SearchField,
} from '@talent-connect/shared-atomic-design-components'
import {
  desiredPositions,
  desiredPositionsIdToLabelMap,
  employmentTypes,
  employmentTypesIdToLabelMap,
  germanFederalStates,
  topSkills,
  topSkillsIdToLabelMap,
} from '@talent-connect/talent-pool/config'

import {
  FederalState,
  JobseekerProfileStatus,
  TpDesiredPosition,
  TpEmploymentType,
  TpTechnicalSkill,
  useMyTpDataQuery,
  useTpJobListingFindAllVisibleQuery,
} from '@talent-connect/data-access'
import { objectEntries } from '@talent-connect/typescript-utilities'
import { useQueryClient } from 'react-query'
import { Redirect } from 'react-router-dom'
import { JobListingCard } from '../../../components/organisms/JobListingCard'
import { LoggedIn } from '../../../components/templates'
import {
  useTpJobListingMarkAsFavouriteMutation,
  useTpJobListingUnfavouriteMutation,
  useTpJobseekerFavouritedJobListingsQuery,
} from './BrowseJobseeker.generated'

export function BrowseJobseeker() {
  const queryClient = useQueryClient()
  const [companyName, setCompanyName] = useState('')
  const myTpData = useMyTpDataQuery()
  const currentJobseekerProfile =
    myTpData.data?.tpCurrentUserDataGet?.tpJobseekerDirectoryEntry
  const favouritedTpJobListingsQuery =
    useTpJobseekerFavouritedJobListingsQuery()
  const markAsFavouriteMutation = useTpJobListingMarkAsFavouriteMutation()
  const unfavouriteMutation = useTpJobListingUnfavouriteMutation()

  const [query, setQuery] = useQueryParams({
    relatedPositions: withDefault(ArrayParam, []),
    idealTechnicalSkills: withDefault(ArrayParam, []),
    employmentType: withDefault(ArrayParam, []),
    federalStates: withDefault(ArrayParam, []),
    onlyFavorites: withDefault(BooleanParam, undefined),
    isRemotePossible: withDefault(BooleanParam, undefined),
    isJobFair2023Participant: withDefault(BooleanParam, undefined),
  })
  const relatedPositions = query.relatedPositions as TpDesiredPosition[]
  const idealTechnicalSkills = query.idealTechnicalSkills as TpTechnicalSkill[]
  const employmentType = query.employmentType as TpEmploymentType[]
  const federalStates = query.federalStates as FederalState[]
  const onlyFavorites = query.onlyFavorites
  const isRemotePossible = query.isRemotePossible
  const isJobFair2023Participant = query.isJobFair2023Participant

  const jobListingsQuery = useTpJobListingFindAllVisibleQuery({
    input: {
      relatesToPositions: relatedPositions,
      skills: idealTechnicalSkills,
      employmentTypes: employmentType,
      federalStates,
      isRemotePossible,
    },
  })
  const jobListings = jobListingsQuery.data?.tpJobListings

  const handleFavoriteJobListing = async (tpJobListingId: string) => {
    const isFavorite =
      favouritedTpJobListingsQuery.data?.tpJobseekerFavoritedJobListings
        ?.map((p) => p.tpJobListingId)
        ?.includes(tpJobListingId)
    if (isFavorite) {
      await unfavouriteMutation.mutateAsync({
        input: { tpJobListingId: tpJobListingId },
      })
    } else {
      await markAsFavouriteMutation.mutateAsync({
        input: { tpJoblistingId: tpJobListingId },
      })
    }
    queryClient.invalidateQueries(
      useTpJobseekerFavouritedJobListingsQuery.getKey()
    )
  }

  const toggleOnlyFavoritesFilter = () => {
    setQuery((latestQuery) => ({
      ...latestQuery,
      onlyFavorites: onlyFavorites ? undefined : true,
    }))
  }

  const toggleRemoteAvailableFilter = () => {
    setQuery((latestQuery) => ({
      ...latestQuery,
      isRemotePossible: isRemotePossible ? undefined : true,
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

  const clearFilters = () => {
    setQuery((latestQuery) => ({
      ...latestQuery,
      idealTechnicalSkills: [],
      employmentType: [],
      federalStates: [],
      isJobFair2023Participant: undefined,
    }))
  }

  // Redirect to homepage if user is not supposed to be browsing yet
  if (
    currentJobseekerProfile &&
    currentJobseekerProfile?.state !== JobseekerProfileStatus.ProfileApproved
  ) {
    return <Redirect to="/" />
  }

  return (
    <LoggedIn>
      <Element
        renderAs="h4"
        textSize={3}
        responsive={{ mobile: { textSize: { value: 7 } } }}
        className="is-flex-grow-1"
        style={{ flexGrow: 1 }}
      >
        Browse open Job Listings{' '}
        {jobListings?.length ? `(${jobListings.length})` : ''}
      </Element>
      <Element
        renderAs="p"
        textSize={4}
        responsive={{ mobile: { textSize: { value: 5 } } }}
        className="oneandhalf-bs"
      >
        Your profile has been approved and you can now browse job listings
        posted by ReDI's partner companies.
      </Element>
      <div className="filters">
        <div className="filters-inner">
          <SearchField
            defaultValue={companyName}
            valueChange={setCompanyName}
            placeholder="Search by Company Name"
          />
        </div>
        <div className="filters-inner">
          <FilterDropdown
            items={relatedPositionsOptions}
            className="filters__dropdown"
            label="Related Positions"
            selected={relatedPositions}
            onChange={(item) =>
              toggleFilters(relatedPositions, 'relatedPositions', item)
            }
          />
        </div>
        <div className="filters-inner">
          <FilterDropdown
            items={employmentTypeOptions}
            className="filters__dropdown"
            label="Employment type"
            selected={employmentType}
            onChange={(item) =>
              toggleFilters(employmentType, 'employmentType', item)
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
            selected={idealTechnicalSkills}
            onChange={(item) =>
              toggleFilters(idealTechnicalSkills, 'idealTechnicalSkills', item)
            }
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
        <div className="filters-inner"></div>
      </div>
      <div className="filters">
        <div className="filters-inner">
          <Checkbox
            name="isRemotePossible"
            checked={isRemotePossible || false}
            handleChange={toggleRemoteAvailableFilter}
          >
            Remote Working Possible
          </Checkbox>
        </div>
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
          {/* Hide after Job Fair */}
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
        {(relatedPositions.length !== 0 ||
          idealTechnicalSkills.length !== 0 ||
          employmentType.length !== 0 ||
          federalStates.length !== 0) && (
          <>
            {(relatedPositions as string[]).map((catId) => (
              <FilterTag
                key={catId}
                id={catId}
                label={desiredPositionsIdToLabelMap[catId]}
                onClickHandler={(item) =>
                  toggleFilters(relatedPositions, 'relatedPositions', item)
                }
              />
            ))}
            {(idealTechnicalSkills as string[]).map((catId) => (
              <FilterTag
                key={catId}
                id={catId}
                label={topSkillsIdToLabelMap[catId]}
                onClickHandler={(item) =>
                  toggleFilters(
                    idealTechnicalSkills,
                    'idealTechnicalSkills',
                    item
                  )
                }
              />
            ))}
            {(employmentType as string[]).map((catId) => (
              <FilterTag
                key={catId}
                id={catId}
                label={employmentTypesIdToLabelMap[catId]}
                onClickHandler={(item) =>
                  toggleFilters(employmentType, 'employmentType', item)
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
        {jobListings
          ?.filter((jobListing) =>
            jobListing.companyName
              .toLowerCase()
              .includes(companyName.toLowerCase())
          )
          .filter((jobListing) => {
            if (!onlyFavorites) return true
            const isFavorite =
              favouritedTpJobListingsQuery.data?.tpJobseekerFavoritedJobListings
                ?.map((p) => p.tpJobListingId)
                ?.includes(jobListing.id)
            return isFavorite
          })
          .map((jobListing) => {
            const isFavorite =
              favouritedTpJobListingsQuery.data?.tpJobseekerFavoritedJobListings
                ?.map((p) => p.tpJobListingId)
                ?.includes(jobListing.id)

            if (!isFavorite && onlyFavorites) return

            return (
              <Columns.Column mobile={{ size: 12 }} tablet={{ size: 6 }}>
                <JobListingCard
                  key={jobListing.id}
                  jobListing={jobListing as unknown as any}
                  toggleFavorite={handleFavoriteJobListing}
                  isFavorite={isFavorite}
                  linkTo={`/app/job-listing/${jobListing.id}`}
                />
              </Columns.Column>
            )
          })}
      </Columns>
    </LoggedIn>
  )
}

/**
 * Following four function are used to convert the lists in the TP Config
 * to a format that is easier to use in a dropdown in the UI. A possible
 * refactor will remove the need for this conversion.
 */
const skillsOptions = topSkills.map(({ id, label }) => ({ value: id, label }))

const employmentTypeOptions = employmentTypes.map(({ id, label }) => ({
  value: id,
  label,
}))

const relatedPositionsOptions = desiredPositions.map(({ id, label }) => ({
  value: id,
  label,
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

const germanFederalStatesOptions = objectEntries(germanFederalStates).map(
  ([value, label]) => ({
    value,
    label,
  })
)
