import { Box, Dialog } from '@mui/material'
import {
  Button,
  Heading,
} from '@talent-connect/shared-atomic-design-components'

interface ModalProps {
  isOpen: boolean
  handleClose: () => void
  headline: string
  message: string
  ctaLabel: string
  ctaOnClick: () => void
  cancelLabel?: string
}

export function LightModal({
  isOpen,
  handleClose,
  headline,
  message,
  ctaLabel,
  ctaOnClick,
  cancelLabel,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Box sx={{ padding: '4em' }}>
        <Heading>{headline}</Heading>
        <p>{message}</p>
        <Button simple onClick={ctaOnClick}>
          {ctaLabel}
        </Button>
        {cancelLabel && <Button onClick={handleClose}>{cancelLabel}</Button>}
      </Box>
    </Dialog>
  )
}
