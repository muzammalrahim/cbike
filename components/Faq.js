import React from 'react'
import { Accordion } from 'react-bootstrap'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useRouter } from "next/router";
import en from "../components/locales/en"
import fr from "../components/locales/fr"
import FaqArabic from "../components/FaqArabic"
const Faq = () => {

    const router = useRouter()
    const { locale } = router
    const t = locale === 'en' ? en : fr
  return locale === "en" ? (
    <div className='faq container-fluid'>
        <h1>{t.faq.question}</h1>
        <Accordion defaultActiveKey="0" className="faq__accordian">
            <Accordion.Item eventKey="0">
                <Accordion.Header>{t.faq.accordianHeading}</Accordion.Header>
                <Accordion.Body>
                {t.faq.accordianItem1}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>{t.faq.accordianHeading}</Accordion.Header>
                <Accordion.Body>
                {t.faq.accordianItem2}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>{t.faq.accordianHeading}</Accordion.Header>
                <Accordion.Body>
                {t.faq.accordianItem3}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </div>
  ): <FaqArabic/>
}

export default Faq