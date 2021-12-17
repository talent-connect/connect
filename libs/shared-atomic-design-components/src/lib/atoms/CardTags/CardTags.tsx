import { FunctionComponent } from 'react';
import { Tag } from 'react-bulma-components'
import { CardTagProps, CardTagsProps } from './CardTags.props';
import './CardTags.scss'

const CardTag: FunctionComponent<CardTagProps> = ({ children, className }) => (
  <Tag className={className} size="medium" textWeight="bold" rounded>
    {children}
  </Tag>
)

const CardTags: FunctionComponent<CardTagsProps> = ({ items, shortList, formatter }) => {
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
