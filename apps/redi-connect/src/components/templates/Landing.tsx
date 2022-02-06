import Navbar from '../organisms/Navbar'
import Footer from '../organisms/Footer'

function Landing ({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default Landing
