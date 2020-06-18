import React from 'react'
import { ReactComponent as Mentee } from '../../assets/images/hero-mentee.svg'
import { ReactComponent as Mentor } from '../../assets/images/hero-mentor.svg'

interface Props {
  image: 'mentee' | 'mentor'
  className?: string
}

const Images = {
  mentee: Mentee,
  mentor: Mentor,
}

const Image = ({ image, className }: Props) => {
  const Image = image ? Images[image] : undefined

  return Image
    ? <Image
      className={className}
    />
    : null
}

export default Image
