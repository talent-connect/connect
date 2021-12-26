import React from 'react'
import Footer from '../organisms/Footer'
import Navbar from '../organisms/Navbar'

const Landing: React.FC = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
)

export default Landing
