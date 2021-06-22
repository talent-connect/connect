import React from 'react'
import { ReactComponent as HeroMentee } from '../../assets/images/hero-mentee.svg'
import { ReactComponent as HeroMentor } from '../../assets/images/hero-mentor.svg'
import { ReactComponent as Hero } from '../../assets/images/hero.svg'
import { ReactComponent as Hello } from '../../assets/images/hello.svg'
import { ReactComponent as HelloMobile } from '../../assets/images/hello-mobile.svg'
import { ReactComponent as Mentee } from '../../assets/images/mentee.svg'
import { ReactComponent as Mentor } from '../../assets/images/mentor.svg'

export type SVGImages =
  | 'heroMentee'
  | 'heroMentor'
  | 'mentee'
  | 'mentor'
  | 'jobseeker'
  | 'company'
  | 'hero'
  | 'hello'
  | 'helloMobile'

interface Props {
  image: SVGImages
  className?: string
}

const Images = {
  heroMentee: HeroMentee,
  heroMentor: HeroMentor,
  mentee: Mentee,
  mentor: Mentor,
  jobseeker: Mentee,
  company: Mentor,
  hero: Hero,
  hello: Hello,
  helloMobile: HelloMobile,
}

const SVGImage = ({ image, className }: Props) => {
  const Image = image ? Images[image] : undefined

  return Image ? <Image className={className} /> : null
}

export default SVGImage
