import { FunctionComponent, SVGProps } from 'react'

export type SVGFile = FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;