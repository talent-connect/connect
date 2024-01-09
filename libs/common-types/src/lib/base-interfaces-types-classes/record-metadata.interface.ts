import { OrderByTuple } from './order-by-tuple.type'

export interface RecordMetadata {
  SALESFORCE_OBJECT_NAME: string
  SALESFORCE_OBJECT_FIELDS: string[]
  SALESFORCE_ORDER_BY?: OrderByTuple
  SALESFORCE_CHILD_OBJECTS?: {
    name: string
    fields: string[]
    orderBy?: OrderByTuple
  }[]
}
