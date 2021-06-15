import React from 'react'
import { useTranslation } from 'react-i18next'
import Hero from '../../../components/organisms/RediHero'
import Landing from '../../../components/templates/Landing'

export default function Home() {
  const { t } = useTranslation()
  return (
    <Landing>
      <Hero />
    </Landing>
  )
}
