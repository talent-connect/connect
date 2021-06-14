import React from 'react'
import Footer from '../organisms/Footer'
import Navbar from '../organisms/Navbar'

const Landing: React.FunctionComponent = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
)

export default Landing
