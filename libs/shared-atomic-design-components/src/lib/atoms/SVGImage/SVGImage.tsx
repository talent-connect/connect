import { FunctionComponent } from 'react';
import { images, SVGImageProps, svgImages } from './SVGImage.props';

const SVGImage: FunctionComponent<SVGImageProps> = ({ image, className }) => {
  const Image = images[image] || svgImages[image]
  return <Image className={className} /> 
}

export default SVGImage
