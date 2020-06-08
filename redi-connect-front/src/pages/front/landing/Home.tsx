import React from 'react'
import Landing from '../../../components/templates/Landing'
import Hero from '../../../components/organisms/RediHero'
import RediProgram from '../../../components/organisms/RediProgram'
import Checklist from '../../../components/organisms/Checklist'
import PreFooter from '../../../components/organisms/PreFooter'

export default function Home() {
  return (
    <Landing>
      <Hero />
      <RediProgram />
      <Checklist.Default type='mentor' />
      <PreFooter />
    </Landing>
  )
}
