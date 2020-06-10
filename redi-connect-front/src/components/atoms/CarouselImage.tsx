import React from 'react'
import classnames from 'classnames'
import { ReactComponent as Dragos } from '../../assets/images/profile-dragos.svg'
import { ReactComponent as Khaled } from '../../assets/images/profile-khaled.svg'
import { ReactComponent as Halil } from '../../assets/images/profile-halil.svg'
import './CarouselImage.scss'

interface Props {
  image: 'dragos' | 'halil' | 'khaled'
  border: 'orange' | 'blue'
}

const CarouselImages = {
  dragos: Dragos,
  khaled: Khaled,
  halil: Halil
}

const CarouselImage = ({ image, border }: Props) => {
  const Image = image ? CarouselImages[image] : undefined
  return Image
    ? <Image className={classnames('carousel-image', {
      [`carousel-image--border-${border}`]: border
    })} />
    : null
}

export default CarouselImage
