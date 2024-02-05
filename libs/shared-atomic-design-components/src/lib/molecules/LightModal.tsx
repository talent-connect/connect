import { Box, Dialog } from '@mui/material'
import { Button } from '@talent-connect/shared-atomic-design-components'
import { Element } from 'react-bulma-components'

import './LightModal.scss'

interface ModalProps {
  isOpen: boolean
  handleClose: () => void
  headline: string
  message: string
  ctaLabel: string
  ctaOnClick: () => void
  cancelLabel?: string
}

export default function LightModal({
  isOpen,
  handleClose,
  headline,
  message,
  ctaLabel,
  ctaOnClick,
  cancelLabel,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={handleClose} className="light-modal">
      <Box sx={{ padding: '24px 32px' }}>
        <Element
          renderAs="p"
          textSize={4}
          responsive={{ mobile: { textSize: { value: 5 } } }}
          style={{ marginBottom: '1rem' }}
        >
          <strong>{headline}</strong>
        </Element>
        <p>{message}</p>

        <div
          style={{ marginTop: '1rem', display: 'flex', justifyContent: 'end' }}
        >
          {cancelLabel && (
            <Button
              simple
              size="large"
              onClick={handleClose}
              className="light-modal__button light-modal__secondary-button"
            >
              {cancelLabel}
            </Button>
          )}
          <Button
            simple
            size="large"
            onClick={ctaOnClick}
            className="light-modal__button light-modal__primary-button"
          >
            {ctaLabel}
          </Button>
        </div>
      </Box>
    </Dialog>
  )
}
