import React from 'react'
import { useRouter } from "next/router";
import en from "../components/locales/en"
import fr from "../components/locales/fr"
import FooterArabic from './FooterArabic';
const Footer = () => {
    const router = useRouter()
    const { locale } = router
    const t = locale === 'en' ? en : fr
  return locale === "en" ? (
    <div className='faq__footer container-fluid'>
        <div className='row'>
            <div className='col-md-6 faq__logo'>
                <h1>{t.footer.logoText}</h1>
            </div>
            <div className='col-md-6 faq__subscribe'>
                <h4>{t.footer.subscribeNow}</h4>
                <form>
                    <label htmlFor="exampleInputEmail1" className='text-white'>{t.footer.name}</label>
                    <input
                        type="text" 
                        className="form-control"
                        required
                    />
                    <label htmlFor="exampleInputEmail1" className='text-white pt-3'>{t.footer.email}</label>
                    <input
                        type="text" 
                        className="form-control"
                        required
                    />
                    <div className='faq__footerbtn'>
                        <button className='btn btn-warning'>{t.footer.submitBtn}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  ): <FooterArabic/>
}

export default Footer