import { Entity } from '@talent-connect/common-types'
import { TpJobseekerFavoritedJobListingEntityProps } from './tp-jobseeker-favorited-job-listing.entityprops'

export class TpJobseekerFavoritedJobListingEntity extends Entity<TpJobseekerFavoritedJobListingEntityProps> {
  props: TpJobseekerFavoritedJobListingEntityProps

  private constructor(props: TpJobseekerFavoritedJobListingEntityProps) {
    super(props)
  }

  public static create(props: TpJobseekerFavoritedJobListingEntityProps) {
    return new TpJobseekerFavoritedJobListingEntity(props)
  }
}
