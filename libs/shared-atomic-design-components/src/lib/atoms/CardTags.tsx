import { Tag } from 'react-bulma-components'
import './CardTags.scss'

export interface CardTagsProps {
  items: string[]
  shortList?: boolean
  formatter?: (item: string) => string
}

interface CardTagProps {
  children: string
  className?: string
  key: string
}

const CardTag = ({ children, className }: CardTagProps) => (
  <>
    <Tag
      className={className}
      size="normal"
      textWeight="bold"
      responsive={{ tablet: { hide: { value: true } } }}
    >
      {children}
    </Tag>
    <Tag
      className={className}
      size="medium"
      textWeight="bold"
      responsive={{ mobile: { hide: { value: true } } }}
    >
      {children}
    </Tag>
  </>
)

const CardTags = ({ items, shortList, formatter }: CardTagsProps) => {
  const additionalTagsCount = items.length - 3
  const tagList = shortList ? items.slice(0, 3) : items
  const hasAdditionalTags = shortList && additionalTagsCount > 0

  return (
    <Tag.Group>
      {tagList.map((tagId, i) => {
        const currentTag = (
          <CardTag key={tagId}>{formatter ? formatter(tagId) : tagId}</CardTag>
        )
        const isLastVisibleTag = i === 2

        return hasAdditionalTags && isLastVisibleTag ? (
          <div className="tags__last-row" key={tagId}>
            {currentTag}
            <CardTag key={`restNr-${i}`} className="tag--rest">
              {'+' + additionalTagsCount}
            </CardTag>
          </div>
        ) : (
          currentTag
        )
      })}
    </Tag.Group>
  )
}

export default CardTags
