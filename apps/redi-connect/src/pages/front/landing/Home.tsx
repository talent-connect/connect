import React from 'react'
import Landing from '../../../components/templates/Landing'
import { useTranslation } from 'react-i18next'
import Hero from '../../../components/organisms/RediHero'
import NavTiles from '../../../components/organisms/NavTiles'
import RediProgram from '../../../components/organisms/RediProgram'
import Carousel from '../../../components/organisms/Carousel'
import PreFooter from '../../../components/organisms/PreFooter'
import { useTestQuery } from './home.generated'

export default function Home() {
  const { t } = useTranslation()

  const { data } = useTestQuery()

  if (data) {
    data.conProfiles.forEach((profile) => {
      if (profile?.gender === 'Male') {
      }
    })
  }

  return (
    <Landing>
      <Hero />
      <NavTiles />
      <RediProgram />
      {/* // TODO: had to disable the entire carousel on 21 July 2021.
      We upgraded // to latest Nx version and relative imports done INSIDE of
      slick-carousel broke. */}
      {/* <Carousel
        border="orange"
        headline={t('loggedOutArea.homePage.carousel.headlineAbout')}
        title={t('loggedOutArea.homePage.carousel.titleAbout')}
      /> */}
      <PreFooter />
    </Landing>
  )
}

// schema: http://localhost:3333/graphql
// documents: './src/**/*.tsx'
// generates:
//   ./graphql/generated.ts:
//     plugins:
//       - typescript
//       - typescript-operations
//       - typescript-react-query
//     config:
//       fetcher: fetch

// # src/generated/graphql.ts:
// #   plugins:
// #     - 'typescript'
// #     - 'typescript-operations'
// #     - typescript-react-query
// #   config:
// #     fetcher: fetch
// # ./graphql.schema.json:
// #   plugins:
// #     - 'introspection'
