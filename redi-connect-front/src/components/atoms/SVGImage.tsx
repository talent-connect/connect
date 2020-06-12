import React from 'react'
import { ReactComponent as Dragos } from '../../assets/images/profile-dragos.svg'
import { ReactComponent as Khaled } from '../../assets/images/profile-khaled.svg'
import { ReactComponent as Halil } from '../../assets/images/profile-halil.svg'

interface Props {
  image: 'dragos' | 'halil' | 'khaled'
  className?: string
}

const CarouselImages = {
  dragos: Dragos,
  khaled: Khaled,
  halil: Halil
}

const SVGImage = ({ image, className }: Props) => {
  const Image = image ? CarouselImages[image] : undefined
  return Image
    ? <Image className={className} />
    : null
}

export default SVGImage
