import { useState } from 'react'
import { useHistory } from 'react-router-dom'
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

import { useBrowseTpJobListingsQuery } from '../../../react-query/use-tpjoblisting-all-query'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'

import { LoggedIn } from '../../../components/templates'
import { JobListingCard } from '../../../components/organisms/JobListingCard'
import { objectEntries } from '@talent-connect/typescript-utilities'

export function BrowseJobseeker() {
  const [companyName, setCompanyName] = useState('')
  const { data: currentJobseekerProfile } = useTpJobseekerProfileQuery()

  const [query, setQuery] = useQueryParams({
    relatedPositions: withDefault(ArrayParam, []),
    idealTechnicalSkills: withDefault(ArrayParam, []),
    employmentType: withDefault(ArrayParam, []),
    federalStates: withDefault(ArrayParam, []),
  })
  const {
    relatedPositions,
    idealTechnicalSkills,
    employmentType,
    federalStates,
  } = query

  const history = useHistory()
  const { data: jobListings } = useBrowseTpJobListingsQuery({
    relatedPositions,
    idealTechnicalSkills,
    employmentType,
    federalStates,
  })

  const toggleFilters = (filtersArr, filterName, item) => {
    const newFilters = toggleValueInArray(filtersArr, item)
    setQuery((latestQuery) => ({ ...latestQuery, [filterName]: newFilters }))
  }

  const clearFilters = () => {
    setQuery((latestQuery) => ({
      ...latestQuery,
      idealTechnicalSkills: [],
      employmentType: [],
      federalStates: [],
    }))
  }

  if (currentJobseekerProfile?.state !== 'profile-approved') return null

  return (
    <LoggedIn>
      <Element
        renderAs="h4"
        textSize={3}
        responsive={{ mobile: { textSize: { value: 7 } } }}
        className="is-flex-grow-1"
        style={{ flexGrow: 1 }}
      >
        Browse open Job Listings
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
            jobListing.tpCompanyProfile.companyName
              .toLowerCase()
              .includes(companyName.toLowerCase())
          )
          .map((jobListing) => (
            <Columns.Column mobile={{ size: 12 }} tablet={{ size: 6 }}>
              <JobListingCard
                key={jobListing.id}
                jobListing={jobListing}
                onClick={() =>
                  history.push(`/app/job-listing/${jobListing.id}`)
                }
              />
            </Columns.Column>
          ))}
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
