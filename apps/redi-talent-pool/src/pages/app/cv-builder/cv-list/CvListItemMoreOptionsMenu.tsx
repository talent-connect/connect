/**
 * TODO: This component is only used in CvListPage, thus it makes sense to
 * have it located here. However, upon further discussion, this co-locating
 * must be standardized within the project.
 */

import React from 'react'

import { Content } from 'react-bulma-components'
import { Button, Popover } from '@mui/material'
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material'

interface CvListItemMoreOptionsMenuProps {
  handleRenameClick(): void
  handleDeleteClick(): void
  handleDuplicateClick(): void
}

export function CvListItemMoreOptionsMenu(
  props: CvListItemMoreOptionsMenuProps
) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopover = (): void => {
    setAnchorEl(null)
  }

  const handleRenameClick = (): void => {
    props.handleRenameClick()
    handleClosePopover()
  }

  const handleDeleteClick = (): void => {
    props.handleDeleteClick()
    handleClosePopover()
  }

  const handleDuplicateClick = (): void => {
    props.handleDuplicateClick()
    handleClosePopover()
  }

  return (
    <div style={{ display: 'flex' }}>
      <Button onClick={handleButtonClick}>
        <MoreHorizIcon style={{ color: '#EEEEEE', fontSize: 40 }} />
      </Button>
      <Popover
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Content style={{ padding: 10, minWidth: 120 }}>
          <Content
            marginless
            style={{ borderBottom: '1px solid #DADADA', cursor: 'pointer' }}
            onClick={handleDeleteClick}
          >
            Delete
          </Content>
          <Content
            marginless
            style={{ borderBottom: '1px solid #DADADA', cursor: 'pointer' }}
            onClick={handleRenameClick}
          >
            Rename
          </Content>
          <Content style={{ cursor: 'pointer' }} onClick={handleDuplicateClick}>
            Duplicate
          </Content>
        </Content>
      </Popover>
    </div>
  )
}
