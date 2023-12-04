import './CardTags.scss'
import React, { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import { useMediaQuery } from '@material-ui/core'
import { log } from 'console'

export interface CardTagsProps {
  items: string[]
  shortList?: boolean
  formatter?: (item: string) => string
}

const CardTags = ({ items, shortList = false, formatter }: CardTagsProps) => {
  const [visibleChips, setVisibleChips] = useState([])
  const [remainingChips, setRemainingChips] = useState([])

  const parentRefDesktop = React.useRef<HTMLDivElement>()
  const parentRefMobile = React.useRef<HTMLDivElement>()

  const isMobile = useMediaQuery('(max-width:768px)')

  const additionalTagsCount = items.length - 3
  const itemsShowMobile = items.map(formatter).slice(0, 3)
  const hasAdditionalTags = (shortList || isMobile) && additionalTagsCount > 0

  useEffect(() => {
    const formattedItems = items.map(formatter)

    const calculateChips = () => {
      const parentWidth = parentRefDesktop.current?.offsetWidth
      const gapSize = 16 // Adjust this based on the design (16px gap)
      const sidePadding = 12 // Adjust this based on the design (12px padding each side )
      const chipTotalMargin = 2 * sidePadding + gapSize

      const chipWidths = formattedItems.map((chip) => {
        const chipSpan = document.createElement('span')
        chipSpan.style.visibility = 'hidden'
        chipSpan.classList.add('chip')
        chipSpan.innerHTML = chip

        parentRefDesktop.current.appendChild(chipSpan)

        const width = chipSpan.offsetWidth + chipTotalMargin

        parentRefDesktop.current.removeChild(chipSpan)

        return width
      })

      let totalWidth = 0
      let visibleChipsCount = 0

      for (let i = 0; i < chipWidths.length; i++) {
        totalWidth += chipWidths[i]

        if (totalWidth <= parentWidth) {
          visibleChipsCount = i + 1
        } else {
          break
        }
      }

      setVisibleChips(formattedItems.slice(0, visibleChipsCount))
      setRemainingChips(formattedItems.slice(visibleChipsCount))
    }

    const throttledCalculateChips = debounce(calculateChips, 100)

    throttledCalculateChips()

    // Recalculate on window resize
    window.addEventListener('resize', throttledCalculateChips)

    return () => {
      window.removeEventListener('resize', throttledCalculateChips)
    }
  }, [formatter, items])

  return isMobile || shortList ? (
    <div className="wrapper__mobile" ref={parentRefMobile}>
      {itemsShowMobile.map((chip, i) => {
        const currentTag = (
          <p key={chip} className="chip">
            {chip}
          </p>
        )
        const isLastVisibleTag = i === 2

        return hasAdditionalTags && isLastVisibleTag ? (
          <div className="wrapper__mobile last_row" key={chip}>
            {currentTag}
            <p key={`restNr-${i}`} className="chip">
              {'+' + additionalTagsCount}
            </p>
          </div>
        ) : (
          currentTag
        )
      })}
    </div>
  ) : (
    <div className="wrapper__desktop" ref={parentRefDesktop}>
      {visibleChips.map((chip) => (
        <p key={chip} className="chip">
          {chip}
        </p>
      ))}
      {remainingChips.length > 0 && (
        <p className="chip">+{remainingChips.length}</p>
      )}
    </div>
  )
}
export default CardTags
