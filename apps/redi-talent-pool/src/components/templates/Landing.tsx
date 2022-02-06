import { ReactNode } from 'react'
import Footer from '../organisms/Footer'
import Navbar from '../organisms/Navbar'

interface LandingProps {
  children: ReactNode
}

function Landing ({ children }: LandingProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default Landing
