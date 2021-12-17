import { ReactComponent as HeroMentee } from '../../../assets/images/hero-mentee.svg'
import { ReactComponent as HeroMentor } from '../../../assets/images/hero-mentor.svg'
import { ReactComponent as Hero } from '../../../assets/images/hero.svg'
import { ReactComponent as Hello } from '../../../assets/images/hello.svg'
import { ReactComponent as HelloMobile } from '../../../assets/images/hello-mobile.svg'
import { ReactComponent as Mentee } from '../../../assets/images/mentee.svg'
import { ReactComponent as Mentor } from '../../../assets/images/mentor.svg'

/** */
export const svgImages = {
  heroMentee: HeroMentee,
  heroMentor: HeroMentor,
}

/** */
export const images = {
  mentee: Mentee,
  mentor: Mentor,
  jobseeker: Mentee,
  company: Mentor,
  hero: Hero,
  hello: Hello,
  helloMobile: HelloMobile,
}

export type SVGImages = keyof typeof images
export type SVGTypes = keyof typeof svgImages

export interface SVGImageProps {
  image: SVGImages | SVGTypes
  className?: string
}
