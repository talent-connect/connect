import { BaseDomainModel } from '../../../core/models/generics/base-domain.model'
import { ToDomainMapper } from './to-domain-mapper.interface'

function hasDomainMapper<T extends BaseDomainModel>(
  sfObject: any
): sfObject is ToDomainMapper<T> {
  return 'toDomain' in sfObject
}
