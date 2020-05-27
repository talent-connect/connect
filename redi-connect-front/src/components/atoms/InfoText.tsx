import React from 'react';
import { Content, Heading } from 'react-bulma-components'

interface Props {
  infos: string[]
}

const InfoText = ({ infos }: Props) => (
  <Content size="small">
    {infos.map((info: any) => (
      info && <Heading renderAs='p' size={5} subtitle key={info}>
        {info}
      </Heading>
    ))}
  </Content>
);

export default InfoText;