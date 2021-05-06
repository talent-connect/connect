import React, { useCallback, useEffect, useState } from 'react';
import { Content, Columns, Tag, Form } from 'react-bulma-components';
import { debounce } from 'lodash';
import { FormInput, Heading, Icon } from '../../../components/atoms';
import { FilterDropdown } from '../../../components/molecules';
import { ProfileCard } from '../../../components/organisms';
import { useLoading } from '../../../hooks/WithLoading';
import { getMentors } from '../../../services/api/api';
import { RedProfile } from '../../../types/RedProfile';
import { useList } from '../../../hooks/useList';
import { profileSaveStart } from '../../../redux/user/actions';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/types';
import { LoggedIn } from '../../../components/templates';

import { categoriesIdToLabelMap, categories } from '../../../config/config';
import './FindAMentor.scss';
import { RediLocation } from '../../../types/RediLocation';

const filterCategories = categories.map((category) => ({
  value: category.id,
  label: category.label,
}));

interface FilterTagProps {
  id: string;
  label: string;
  onClickHandler: (item: string) => void;
}

const FilterTag = ({ id, label, onClickHandler }: FilterTagProps) => (
  <Tag size="medium" rounded textWeight="bold">
    {label}
    <Icon
      icon="cancel"
      onClick={() => {
        onClickHandler(id);
      }}
      className="active-filters__remove"
    />
  </Tag>
);

interface FindAMentorProps {
  profile: RedProfile;
  profileSaveStart: (profile: Partial<RedProfile>) => void;
}

const SearchField = ({ valueChange }: { valueChange: (value: string) => void }) => {
  const [value, setValue] = useState('');
  const valueChangeDebounced = useCallback(debounce(valueChange, 400), []);
  const handleChange = useCallback((e: any) => setValue(e.target.value), []);

  useEffect(() => {
    valueChangeDebounced(value)
  }, [value])

  return (
    <Form.Input
      placeholder="Search by name"
      onChange={handleChange}
      value={value}
    />
  )
}

const FindAMentor = ({ profile, profileSaveStart }: FindAMentorProps) => {
  const { Loading, isLoading, setLoading } = useLoading();
  const { id, categories, favouritedRedProfileIds, rediLocation } = profile;
  const [nameQuery, setNameQuery] = useState('')
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [mentors, setMentors] = useState<RedProfile[]>([]);
  const [activeCategories, { toggle: toggleCategories, clear: clearCategories }] = useList(
    categories
  );
  const [favorites, { toggle: toggleFavorites }] = useList<any>(favouritedRedProfileIds);
  const [activeLanguages, { toggle: toggleLanguages, clear: clearLanguages }] = useList<any>([]);
  const [activeLocations, { toggle: toggleLocations, clear: clearLocations }] = useList<any>([]);

  const filterLanguages = Array.from(
    new Set(
      mentors
        .map((mentor) => mentor.languages || [])
        .flat()
        .sort()
    )
  ).map((language) => ({
    value: language,
    label: language,
  }));

  const filterRediLocations = Object.keys(rediLocationNames).map((location) => ({
    value: location,
    label: rediLocationNames[location as RediLocation] as string
  }));

  useEffect(() => {
    setLoading(true);
    getMentors({ categories: activeCategories, languages: activeLanguages, locations: activeLocations, nameQuery }).then((mentors) => {
      setMentors(
        mentors
          .filter((mentor) => mentor.currentFreeMenteeSpots > 0)
          .filter(mentor => !mentor.optOutOfMenteesFromOtherRediLocation || mentor.rediLocation === rediLocation)
      );
      setLoading(false);
    });
  }, [activeCategories, activeLanguages, activeLocations, nameQuery]);

  useEffect(() => {
    setLoading(true);
    profileSaveStart({ favouritedRedProfileIds: favorites, id });
    setLoading(false);
  }, [favorites]);

  if (profile.userActivated !== true) return <LoggedIn />;

  return (
    <LoggedIn>
      <Loading/>
      <Heading subtitle size="small" className="oneandhalf-bs">
                Available mentors ({mentors.length})
      </Heading>
      {/*
      <div className="filters">
        <SearchField valueChange={setNameQuery} />
      </div>
*/}
      <div className="filters">
        <FilterDropdown
          items={filterCategories}
          className="filters__dropdown"
          label="Topics"
          selected={activeCategories}
          onChange={toggleCategories}
        />
        <FilterDropdown
          items={filterLanguages}
          className="filters__dropdown"
          label="Languages"
          selected={activeLanguages}
          onChange={toggleLanguages}
        />
        <div className="filter-favourites" onClick={() => setShowFavorites(!showFavorites)}>
          <Icon
            icon={showFavorites ? 'heartFilled' : 'heart'}
            className="filter-favourites__icon"
            space="right"
          />
              Only Favorites
        </div>
      </div>
      <div className="filters">
        <FilterDropdown
          items={filterRediLocations}
          className="filters__dropdown"
          label="Location"
          selected={activeLocations}
          onChange={toggleLocations}
        />
      </div>

      {(activeCategories.length !== 0 || activeLanguages.length !== 0 || activeLocations.length !== 0) && (
        <div className="active-filters">
          <Tag.Group>
            {activeCategories.map((catId) => (
              <FilterTag
                key={catId}
                id={catId}
                label={categoriesIdToLabelMap[catId]}
                onClickHandler={toggleCategories}
              />
            ))}
            {activeLanguages.map((langId) => (
              <FilterTag key={langId} id={langId} label={langId} onClickHandler={toggleLanguages}/>
            ))}
            {activeLocations.map((locId?: RediLocation) => (
              locId && <FilterTag key={locId} id={locId} label={rediLocationNames[locId as RediLocation] as string} onClickHandler={toggleLocations}/>
            ))}
            <span
              className="active-filters__clear-all"
              onClick={() => {
                clearCategories();
                clearLanguages();
                clearLocations();
              }}
            >
              Delete all filters <Icon icon="cancel" size="small" space="left"/>
            </span>
          </Tag.Group>
        </div>
      )}

      <Columns>
        {mentors.map((mentor: RedProfile) => {
          const isFavorite = favorites.includes(mentor.id);

          if (!isFavorite && showFavorites) return;

          return (
            <Columns.Column size={4} key={mentor.id}>
              <ProfileCard
                profile={mentor}
                linkTo={`/app/find-a-mentor/profile/${mentor.id}`}
                toggleFavorite={toggleFavorites}
                isFavorite={isFavorite}
              />
            </Columns.Column>
          );
        })}
      </Columns>

      {mentors.length === 0 && !isLoading && (
        <Content>
          <>
                        Unfortunately <strong>could not find any mentors</strong> matching your search
                        criterias.
          </>
        </Content>
      )}
    </LoggedIn>
  );
};
const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile,
});

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) => dispatch(profileSaveStart(profile)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FindAMentor);
