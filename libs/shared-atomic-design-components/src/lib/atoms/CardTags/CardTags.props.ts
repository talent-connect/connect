export interface CardTagsProps {
  /** */
  items: string[]
  /** */
  shortList?: boolean
  /** */
  formatter?: (item: string) => string
}

export interface CardTagProps {
  /** */
  className?: string
  /** */
  key: string
}