import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { Icon } from '@talent-connect/shared-atomic-design-components'
import { useState } from 'react'
import { Content } from 'react-bulma-components'

type IconOptions = React.ComponentProps<typeof Icon>['icon']

interface CardContextMenuProps {
  menuItems: Array<{ label: string; onClick: () => void; icon: IconOptions }>
  children?: React.ReactNode
}

export function CardContextMenu({ menuItems, children }: CardContextMenuProps) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleOpen = (e: React.MouseEvent) => {
    setAnchorEl(e.currentTarget)
    e.stopPropagation()
    e.preventDefault()
    return false
  }

  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <div onClick={handleOpen}>
        <Icon
          icon="ellipsis"
          className="job-posting-card__ellipsis__icon"
          size="large"
        />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        style={{ fontFamily: 'unset' }}
      >
        <Content style={{ width: '180px' }}>
          {menuItems.map(({ label, onClick, icon }) => (
            <MenuItem
              onClick={() => {
                onClick()
                handleClose()
              }}
              style={{ fontFamily: 'unset' }}
            >
              <ListItemText
                primaryTypographyProps={{ style: { fontFamily: 'unset' } }}
              >
                <p>{label}</p>
              </ListItemText>
              <ListItemIcon style={{ minWidth: '24px' }}>
                <Icon icon={icon} />
              </ListItemIcon>
            </MenuItem>
          ))}
        </Content>
      </Menu>
      {children}
    </>
  )
}
