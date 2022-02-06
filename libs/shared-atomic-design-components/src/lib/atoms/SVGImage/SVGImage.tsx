import { images, SVGImageProps, svgImages } from './SVGImage.props';

function SVGImage ({ image, className }: SVGImageProps) {
  const Image = images[image] || svgImages[image]
  return <Image className={className} /> 
}

export default SVGImage
