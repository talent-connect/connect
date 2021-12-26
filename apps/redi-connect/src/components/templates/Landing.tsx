import { FC } from 'react'
import Navbar from '../organisms/Navbar'
import Footer from '../organisms/Footer'

const Landing: FC = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
)

export default Landing
