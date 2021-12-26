import { FC } from 'react'
import Footer from '../organisms/Footer'
import Navbar from '../organisms/Navbar'

const Landing: FC = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
)

export default Landing
