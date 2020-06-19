import React from 'react'
import { ReactComponent as Mentee } from '../../assets/images/hero-mentee.svg'
import { ReactComponent as Mentor } from '../../assets/images/hero-mentor.svg'
import { ReactComponent as Hero } from '../../assets/images/hero.svg'
import { ReactComponent as Hello } from '../../assets/images/hello.svg'
import { ReactComponent as HelloMobile } from '../../assets/images/hello-mobile.svg'

interface Props {
  image: 'mentee' | 'mentor' | 'hero' | 'hello' | 'helloMobile'
  className?: string
}

const Images = {
  mentee: Mentee,
  mentor: Mentor,
  hero: Hero,
  hello: Hello,
  helloMobile: HelloMobile
}

const SVGImage = ({ image, className }: Props) => {
  const Image = image ? Images[image] : undefined

  return Image
    ? <Image
      className={className}
    />
    : null
}

export default SVGImage
