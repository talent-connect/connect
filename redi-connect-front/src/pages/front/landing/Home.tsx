import React from 'react'
import Landing from '../../../components/templates/Landing'
import Hero from '../../../components/organisms/RediHero'
import RediProgram from '../../../components/organisms/RediProgram'
import PreFooter from '../../../components/organisms/PreFooter'

export default function Home () {
  return (
    <Landing>
      <Hero />
      <RediProgram />
      <PreFooter />
    </Landing>
  )
}
