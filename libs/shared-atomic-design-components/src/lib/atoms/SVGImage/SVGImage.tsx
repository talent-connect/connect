import { FC } from 'react';
import { images, SVGImageProps, svgImages } from './SVGImage.props';

const SVGImage: FC<SVGImageProps> = ({ image, className }) => {
  const Image = images[image] || svgImages[image]
  return <Image className={className} /> 
}

export default SVGImage
