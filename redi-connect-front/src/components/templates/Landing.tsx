import React from 'react'
import Navbar from '../organisms/Navbar'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../atoms/Button'
import Footer from '../organisms/Footer'

const Landing: React.FunctionComponent = ({ children }) => {
  const history = useHistory()
  const { t } = useTranslation()

  return (
    <>
      <Navbar>
        <Button
          onClick={() => history.push('/front/login')}
          simple
        >
          {t('button.login')}
        </Button>
        <Button
          onClick={() => history.push('/front/signup-landing')}
        >
          {t('button.signUp')}
        </Button>
      </Navbar>
      {children}
      <Footer/>
    </>
  )
}

export default Landing
