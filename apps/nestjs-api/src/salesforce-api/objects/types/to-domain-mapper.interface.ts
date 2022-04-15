import { BaseDomainModel } from '../../../core/models/generics/base-domain.model'

export interface ToDomainMapper<DomainModel extends BaseDomainModel> {
  toDomain: (() => DomainModel) | null
}
