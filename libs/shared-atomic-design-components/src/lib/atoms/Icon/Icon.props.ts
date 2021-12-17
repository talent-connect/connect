
import { ReactComponent as ArrowLeft } from '../../../assets/images/arrow-left.svg'
import { ReactComponent as ArrowRight } from '../../../assets/images/arrow-right.svg'
import { ReactComponent as Hamburger } from '../../../assets/images/hamburger.svg'
import { ReactComponent as Account } from '../../../assets/images/account.svg'
import { ReactComponent as Checkmark } from '../../../assets/images/checkmark.svg'
import { ReactComponent as Edit } from '../../../assets/images/edit.svg'
import { ReactComponent as Cancel } from '../../../assets/images/cancel.svg'
import { ReactComponent as Chevron } from '../../../assets/images/chevron.svg'
import { ReactComponent as Mail } from '../../../assets/images/mail.svg'
import { ReactComponent as Heart } from '../../../assets/images/heart.svg'
import { ReactComponent as HeartFilled } from '../../../assets/images/heart-filled.svg'
import { ReactComponent as Clipboard } from '../../../assets/images/clipboard.svg'
import { ReactComponent as Calendar } from '../../../assets/images/calendar.svg'
import { ReactComponent as Certificate } from '../../../assets/images/certificate.svg'
import { ReactComponent as Search } from '../../../assets/images/search.svg'
import { ReactComponent as Career } from '../../../assets/images/career.svg'
import { ReactComponent as Arrow } from '../../../assets/images/arrow-step.svg'
import { ReactComponent as Chat } from '../../../assets/images/chat.svg'
import { ReactComponent as Handshake } from '../../../assets/images/handshake.svg'
import { ReactComponent as Plus } from '../../../assets/images/plus.svg'
import { ReactComponent as TpPlus } from '../../../assets/images/tp-plus.svg'
import { ReactComponent as Linkedin } from '../../../assets/images/linkedin.svg'
import { ReactComponent as Twitter } from '../../../assets/images/twitter.svg'
import { ReactComponent as Instagram } from '../../../assets/images/instagram.svg'
import { ReactComponent as Meetup } from '../../../assets/images/meetup.svg'
import { ReactComponent as Fb } from '../../../assets/images/fb.svg'
import { ReactComponent as Loader } from '../../../assets/images/loader.svg'
import { ReactComponent as MapPin } from '../../../assets/images/map-pin.svg'

export const Icons = {
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  account: Account,
  hamburger: Hamburger,
  check: Checkmark,
  edit: Edit,
  cancel: Cancel,
  chevron: Chevron,
  heart: Heart,
  heartFilled: HeartFilled,
  clipboard: Clipboard,
  calendar: Calendar,
  certificate: Certificate,
  search: Search,
  career: Career,
  arrow: Arrow,
  handshake: Handshake,
  chat: Chat,
  mail: Mail,
  plus: Plus,
  tpPlus: TpPlus,
  instagram: Instagram,
  meetup: Meetup,
  twitter: Twitter,
  fb: Fb,
  linkedin: Linkedin,
  loader: Loader,
  mapPin: MapPin,
}

export interface IconProps {
  icon: keyof typeof Icons
  size?: 'small' | 'medium' | 'large' | 'x-large'
  space?: 'left' | 'right'
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}