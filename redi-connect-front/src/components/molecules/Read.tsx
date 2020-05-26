import React from 'react';
import { Heading } from 'react-bulma-components'
import '../../pages/app/me/Me.scss'

interface Props {
  title: string
  children: any
}
const Read = ({ title, children }: Props) => (
  <>
    <Heading
      size={5}
      weight="normal"
      renderAs="h3"
      subtitle
      textTransform="uppercase"
    >
      {title}
    </Heading>
    {children}
  </>
);

export default Read;