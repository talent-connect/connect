import React from 'react'
import { ReactComponent as Clipboard } from '../../assets/images/clipboard.svg'
import { ReactComponent as Calendar } from '../../assets/images/calendar.svg'
import { ReactComponent as Certificate } from '../../assets/images/certificate.svg'
import { ReactComponent as Search } from '../../assets/images/search.svg'
import { ReactComponent as Career } from '../../assets/images/career.svg'
import { ReactComponent as Arrow } from '../../assets/images/arrow-step.svg'
import { ReactComponent as Mentee } from '../../assets/images/hero-mentee.svg'
import { ReactComponent as Mentor } from '../../assets/images/hero-mentor.svg'
import { ReactComponent as Chat } from '../../assets/images/chat.svg'
import { ReactComponent as Handshake } from '../../assets/images/handshake.svg'

interface Props {
  image: 'clipboard' | 'certificate' | 'search' | 'arrow' | 'calendar' |
          'career' | 'mentee' | 'mentor' | 'chat' | 'handshake'
  className?: string
}

const Images = {
  clipboard: Clipboard,
  calendar: Calendar,
  certificate: Certificate,
  search: Search,
  career: Career,
  arrow: Arrow,
  mentee: Mentee,
  mentor: Mentor,
  handshake: Handshake,
  chat: Chat
}

const SVGImage = ({ image, className }: Props) => {
  const Image = image ? Images[image] : undefined
  return Image
    ? <Image className={className} />
    : null
}

export default SVGImage
