import Navbar from '../organisms/Navbar'
import Footer from '../organisms/Footer'
import { ReactNode } from 'react';

function Landing ({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default Landing
