import React from 'react'
import { useRouter } from "next/router";
import en from "../components/locales/en"
import fr from "../components/locales/fr"
function HeaderArabic() {
  const router = useRouter()
  const { locale } = router
  const t = locale === 'en' ? en : fr
  return (
    <div className='header container-fluid'>
      {/* <img src="/images/header-map.png"/> */}
      <div className='container'>
        <div className='row'>
          <div className='col-md-6' style={{ textAlign: "left" }}>
            <img className='img-fluid phone-img' src="/images/header-phone.png" alt='nothing' />
          </div>
          <div className='col-md-6 rent'>
            <div style={{ width: "70%" }}>
              <h1>{t.header.rent}</h1>
              <h5>{t.header.unlock}</h5>
              <div className='reach-btn'>
                <button className='btn btn-warning'>{t.header.reach}</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HeaderArabic