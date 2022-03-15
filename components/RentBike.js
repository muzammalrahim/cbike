import React from 'react'
import { useRouter } from "next/router";
import en from "../components/locales/en"
import fr from "../components/locales/fr"
import RentBikeArabic from './RentBikeArabic';

const RentBike = () => {
  const router = useRouter()
  const { locale } = router
  const t = locale === 'en' ? en : fr
  return locale === "en" ? (
    <div className='rent-bike container-fluid'>
        <h1>{t.work.howWork}</h1>
        <div className='row'>
            <div className='col-md-3'>
                <div className='cycle-img'></div>
                <div className='rent-bike-content'>
                    <h5>{t.work.rentABike.rentaBike}</h5>
                    <p>{t.work.rentABike.location}</p>
                </div>
            </div>
            <div className='col-md-3'>
                <div className='cycle-img cycle2-img'></div>
                <div className='rent-bike-content'>
                    <h5>{t.work.unlockPhone.unlock}</h5>
                    <p>{t.work.unlockPhone.connectBluetooth}</p>
                </div>
            </div>
            <div className='col-md-3'>
                <div className='cycle-img cycle3-img'></div>
                <div className='rent-bike-content'>
                    <h5>{t.work.ride.rideBike}</h5>
                    <p>{t.work.ride.rentals}</p>
                </div>
            </div>
            <div className='col-md-3'>
                <div className='cycle-img cycle4-img'></div>
                <div className='rent-bike-content'>
                    <h5>{t.work.return.returnEnd}</h5>
                    <p>{t.work.return.rideAvailable}</p>
                </div>
            </div>
        </div>
    </div>
  ): <RentBikeArabic/>
}

export default RentBike