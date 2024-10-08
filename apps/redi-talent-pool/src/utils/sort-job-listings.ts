import { TpJobListing } from '@talent-connect/data-access'

export const careerPartnerSortFn = (a: TpJobListing, b: TpJobListing) => {
  console.log('sorting')

  if (a.isFromCareerPartner && !b.isFromCareerPartner) {
    return -1
  } else if (!a.isFromCareerPartner && b.isFromCareerPartner) {
    return 1
  } else {
    return 0
  }
}
