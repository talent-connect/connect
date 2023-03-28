import { Entity } from '@talent-connect/common-types'
import { TpCompanyFavoritedJobseekerProfileEntityProps } from './tp-company-favorited-jobseeker-profile.entityprops'

export class TpCompanyFavoritedJobseekerProfileEntity extends Entity<TpCompanyFavoritedJobseekerProfileEntityProps> {
  props: TpCompanyFavoritedJobseekerProfileEntityProps

  private constructor(props: TpCompanyFavoritedJobseekerProfileEntityProps) {
    super(props)
  }

  public static create(props: TpCompanyFavoritedJobseekerProfileEntityProps) {
    return new TpCompanyFavoritedJobseekerProfileEntity(props)
  }
}
