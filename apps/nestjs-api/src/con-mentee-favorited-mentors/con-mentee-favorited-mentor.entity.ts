import { Entity } from '@talent-connect/common-types'
import { ConMenteeFavoritedMentorEntityProps } from './con-mentee-favorited-mentor.entityprops'

export class ConMenteeFavoritedMentorEntity extends Entity<ConMenteeFavoritedMentorEntityProps> {
  props: ConMenteeFavoritedMentorEntityProps

  private constructor(props: ConMenteeFavoritedMentorEntityProps) {
    super(props)
  }

  public static create(props: ConMenteeFavoritedMentorEntityProps) {
    return new ConMenteeFavoritedMentorEntity(props)
  }
}
