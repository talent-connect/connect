export type Category = {
  id: string;
  label: string;
  group:
    | 'softwareEngineering'
    | 'design'
    | 'otherProfessions'
    | 'careerSupport'
    | 'language'
    | 'other';
};
