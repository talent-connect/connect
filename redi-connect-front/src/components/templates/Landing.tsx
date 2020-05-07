import React from 'react'
import Navbar from '../organisms/Navbar'
import { useHistory } from 'react-router-dom'
import Button from '../atoms/Button'
import Footer from '../organisms/Footer'

const Landing: React.FunctionComponent = ({ children }) => {
  const history = useHistory()

  return (
    <>
      <Navbar>
        <Button
          onClick={() => history.push('/front/login')}
          simple
        >
        log-in
        </Button>
        <Button
          onClick={() => history.push('/front/signup-landing')}
        >
        Sign-up
        </Button>
      </Navbar>
      {children}
      <Footer/>
    </>
  )
}

export default Landing
