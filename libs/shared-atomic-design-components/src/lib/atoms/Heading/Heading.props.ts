export const sizes = {
  large: {
    desktop: 1,
    mobile: 2,
  },
  medium: {
    desktop: 2,
    mobile: 4,
  },
  small: {
    desktop: 3,
    mobile: 4,
  },
  smaller: {
    desktop: 4,
    mobile: 5,
  },
}

export interface HeadingProps {
  /** */
  children: string
  /** */
  className?: string;
  /** */
  size?: keyof typeof sizes;
  /** */
  tag?: string;
  /** */
  border?: 'topCenter' | 'bottomLeft';
  /** */
  center?: boolean;
  /** */
  subtitle?: boolean;
}