import { FunctionComponent } from 'react'
import Navbar from '../organisms/Navbar'
import Footer from '../organisms/Footer'

const Landing: FunctionComponent = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
)

export default Landing
