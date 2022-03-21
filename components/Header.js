import React from 'react'
import { useRouter } from "next/router";
import en from "../components/locales/en"
import fr from "../components/locales/fr"
import HeaderArabic from './HeaderArabic';
function Header() {
  const router = useRouter()
  const { locale } = router
  // console.log("locales", locale);
  const t = locale === 'en' ? en : fr
  return locale === "en" ? (
    <div className='header container-fluid'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 rent'>
            <div style={{ width: "70%" }}>
              <h1>{t.header.rent}</h1>
              <h5>{t.header.unlock}</h5>
              <div className='reach-btn'>
                <button className='btn btn-warning'>{t.header.reach}</button>
              </div>
            </div>
          </div>
          <div className='col-md-6' style={{ textAlign: "right" }}>
            <img className='img-fluid phone-img' src="/images/header-phone.png" alt='nothing' />
          </div>
        </div>

      </div>
    </div>
  ) : <HeaderArabic />
}

export default Header