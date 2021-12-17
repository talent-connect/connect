import { FunctionComponent } from 'react';
import { images, SVGImageProps, svgImages } from './SVGImage.props';

const SVGImage: FunctionComponent<SVGImageProps> = ({
  image,
  className
}) => {
  const Image = image ? (images[image] || svgImages[image]) : undefined

  return Image ? <Image className={className} /> : null
}

export default SVGImage
