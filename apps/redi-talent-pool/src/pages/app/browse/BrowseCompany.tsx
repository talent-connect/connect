import {
  FilterDropdown,
  Checkbox,
  Icon,
  SearchField,
} from '@talent-connect/shared-atomic-design-components'
import {
  desiredPositions,
  desiredPositionsIdToLabelMap,
  topSkills,
  topSkillsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import { mapOptions } from '@talent-connect/typescript-utilities';
import { FC } from 'react'
import { Columns, Element, Tag } from 'react-bulma-components'
import { useHistory } from 'react-router'
import {
  ArrayParam,
  BooleanParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params'
import { JobSeekerProfileCard } from '../../../components/organisms/JobSeekerProfileCard'
import { LoggedIn } from '../../../components/templates'
import { useBrowseTpJobSeekerProfilesQuery } from '../../../react-query/use-tpjobseekerprofile-query'

export const BrowseCompany: FC = () => {
  const [query, setQuery] = useQueryParams({
    name: withDefault(StringParam, ''),
    skills: withDefault(ArrayParam, []),
    desiredPositions: withDefault(ArrayParam, []),
    isJobFair2022Participant: withDefault(BooleanParam, undefined),
  })
  const { name, skills, desiredPositions, isJobFair2022Participant } = query

  const history = useHistory()
  const { data: jobseekerProfiles } = useBrowseTpJobSeekerProfilesQuery({
    name,
    skills,
    desiredPositions,
    isJobFair2022Participant,
  })

  const toggleFilters = (filtersArr, filterName, item) => {
    const newFilters = toggleValueInArray(filtersArr, item)
    setQuery((latestQuery) => ({ ...latestQuery, [filterName]: newFilters }))
  }

  const toggleJobFair2022Filter = () =>
    setQuery((latestQuery) => ({
      ...latestQuery,
      isJobFair2022Participant:
        isJobFair2022Participant === undefined ? true : undefined,
    }))

  const setName = (value) => {
    setQuery((latestQuery) => ({ ...latestQuery, name: value || undefined }))
  }

  const clearFilters = () => {
    setQuery((latestQuery) => ({
      ...latestQuery,
      skills: [],
      desiredPositions: [],
      isJobFair2022Participant: undefined,
    }))
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
        Browse our Talent Pool
      </Element>
      <Element
        renderAs="p"
        textSize={4}
        responsive={{ mobile: { textSize: { value: 5 } } }}
        className="oneandhalf-bs"
      >
        Browse our JobSeeker profiles and find the talent you're looking for.
      </Element>
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
            items={skillsOptions}
            className="filters__dropdown"
            label="Skills"
            selected={skills}
            onChange={(item) => toggleFilters(skills, 'skills', item)}
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
      </div>
      <div className="filters">
        <Checkbox
          name="isJobFair2022Participant"
          checked={isJobFair2022Participant || false}
          handleChange={toggleJobFair2022Filter}
        >
          Filter by ReDI Job Fair 2022
        </Checkbox>
      </div>
      <div className="active-filters">
        {(skills.length || desiredPositions.length || isJobFair2022Participant) && (
          <>
            {skills.map((catId) => (
              <FilterTag
                key={catId}
                id={catId}
                label={topSkillsIdToLabelMap[catId]}
                onClickHandler={(item) => toggleFilters(skills, 'skills', item)}
              />
            ))}
            {desiredPositions.map((id) => (
              <FilterTag
                key={id}
                id={id}
                label={desiredPositionsIdToLabelMap[id]}
                onClickHandler={(item) =>
                  toggleFilters(desiredPositions, 'desiredPositions', item)
                }
              />
            ))}
            {isJobFair2022Participant && (
              <FilterTag
                key="redi-job-fair-2022-filter"
                id="redi-job-fair-2022-filter"
                label="ReDI Job Fair 2022"
                onClickHandler={toggleJobFair2022Filter}
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
        {jobseekerProfiles?.map((profile) => (
          <Columns.Column
            mobile={{ size: 12 }}
            tablet={{ size: 6 }}
            desktop={{ size: 4 }}
          >
            <JobSeekerProfileCard
              key={profile.id}
              jobseekerProfile={profile}
              onClick={() =>
                history.push(`/app/jobseeker-profile/${profile.id}`)
              }
            />
          </Columns.Column>
        ))}
      </Columns>
    </LoggedIn>
  )
}

const skillsOptions = mapOptions(topSkills)
const desiredPositionsOptions = mapOptions(desiredPositions)

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

// TODO repeated
export function toggleValueInArray<T>(array: T[], value: T) {
  return array.includes(value)
    ? array.filter((val) => val !== value)
    : [...array, value]
}
