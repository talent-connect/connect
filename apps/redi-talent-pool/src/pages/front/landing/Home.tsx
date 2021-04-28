import React from 'react'
import Landing from '../../../components/templates/Landing'
import { useTranslation } from 'react-i18next'
import Hero from '../../../components/organisms/RediHero'
import NavTiles from '../../../components/organisms/NavTiles'
import RediProgram from '../../../components/organisms/RediProgram'

export default function Home() {
  const { t } = useTranslation()
  return (
    <Landing>
      <Hero />
    </Landing>
  )
}
