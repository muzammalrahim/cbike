import React from 'react'
import { useRouter } from "next/router";
import en from "./locales/en"
import fr from "./locales/fr"
const FooterArabic = () => {
    const router = useRouter()
    const { locale } = router
    const t = locale === 'en' ? en : fr
  return (
    <div className='faq__footer container-fluid'>
        <div className='row'>
            <div className='col-md-6 faq__subscribe'>
                <h4 className='text-right'>{t.footer.subscribeNow}</h4>
                <form>
                    <label htmlFor="exampleInputEmail1" className='text-white float-right ' >{t.footer.name}</label>
                    <input
                        type="text" 
                        className="form-control"
                        required
                    />
                    <label htmlFor="exampleInputEmail1" className='text-white float-right pt-3'>{t.footer.email}</label>
                    <input
                        type="text" 
                        className="form-control"
                        required
                    />
                    <div className='faq__footerbtn text-right'>
                        <button className='btn btn-warning'>{t.footer.submitBtn}</button>
                    </div>
                </form>
            </div>
            <div className='col-md-6 faq__logo'>
                <h1>{t.footer.logoText}</h1>
            </div>
        </div>
    </div>
  )
}

export default FooterArabic