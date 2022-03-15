import React from 'react'
import Header from '../components/Header'
import RentBike from '../components/RentBike'
import Faq from '../components/Faq'
import Footer from '../components/Footer'
import GoogleMap from '../components/GoogleMap'

const Homes = () => {
  return (
    <>
      <div>
        <Header />
        <GoogleMap />
        <RentBike />
        <Faq />
        <Footer />
      </div>
    </>
  )
}
export default Homes