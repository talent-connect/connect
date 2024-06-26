import { ReactComponent as HelloMobile } from '../../assets/images/hello-mobile.svg'
import { ReactComponent as Hello } from '../../assets/images/hello.svg'
import { ReactComponent as HeroMentee } from '../../assets/images/hero-mentee.svg'
import { ReactComponent as HeroMentor } from '../../assets/images/hero-mentor.svg'
import { ReactComponent as Hero } from '../../assets/images/hero.svg'
import { ReactComponent as Mentee } from '../../assets/images/mentee.svg'
import { ReactComponent as Mentor } from '../../assets/images/mentor.svg'
import { ReactComponent as Location } from '../../assets/images/location.svg'
import { FunctionComponent, SVGProps } from 'react'

export type SVGTypes = 'heroMentee' | 'heroMentor'

export type SVGImages =
  | 'mentee'
  | 'mentor'
  | 'jobseeker'
  | 'company'
  | 'hero'
  | 'hello'
  | 'helloMobile'
  | 'location'

type ImageProp = SVGImages | SVGTypes
interface Props {
  image: ImageProp
  className?: string
}

// to match the interface declaration of *.svg
type svgImageType = FunctionComponent<
  SVGProps<SVGSVGElement> & {
    title?: string
  }
>

const Images: Record<ImageProp, svgImageType> = {
  heroMentee: HeroMentee,
  heroMentor: HeroMentor,
  mentee: Mentee,
  mentor: Mentor,
  jobseeker: Mentee,
  company: Mentor,
  hero: Hero,
  hello: Hello,
  helloMobile: HelloMobile,
  location: Location,
}

const SVGImage = ({ image, className }: Props) => {
  const Image = image ? Images[image] : undefined

  return Image ? <Image className={className} /> : null
}

export default SVGImage
