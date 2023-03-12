import { TpJobseekerDirectoryEntryEntityProps } from '..'
import { Entity } from '../../base-interfaces-types-classes'

export class TpJobseekerDirectoryEntryEntity extends Entity<TpJobseekerDirectoryEntryEntityProps> {
  private constructor(props: TpJobseekerDirectoryEntryEntityProps) {
    super(props)
  }

  public static create(props: TpJobseekerDirectoryEntryEntityProps) {
    return new TpJobseekerDirectoryEntryEntity(props)
  }
}
