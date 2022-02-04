
/** */
export type CategoryGroupId =
| 'softwareEngineering'
| 'design'
| 'otherProfessions'
| 'careerSupport'
| 'language'
| 'other'

/** */
export type CategoryGroup = {
  id: CategoryGroupId
  label: string
}

/** */
export type Category = {
  id: string
  label: string
  group: CategoryGroup['id']
}
