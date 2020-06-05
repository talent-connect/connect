import React from 'react'
import Landing from '../../../components/templates/Landing'
import Hero from '../../../components/organisms/RediHero'
import RediProgram from '../../../components/organisms/RediProgram'
import Checklist from '../../../components/organisms/Checklist'
import Carousel from '../../../components/organisms/Carousel'
import PreFooter from '../../../components/organisms/PreFooter'

export default function Home () {
  return (
    <Landing>
      <Hero />
      <RediProgram />
      <Checklist type='mentee' />
      <Carousel border="blue" headline="What mentees say about our mentorship" title="testimonials" />
      <PreFooter />
    </Landing>
  )
}
