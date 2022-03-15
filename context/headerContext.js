import React, { createContext, useState } from "react";
import { useRouter } from "next/router";
import en from "../components/locales/en"
import ar from "../components/locales/fr"
export const HeaderContext = createContext()

const HeaderContextProvider = (props) => {
    const router = useRouter()
    const { locale } = router
    const [header, setHeader] = useState(true)
    const t = locale === 'en' ? en : ar
  
    const language = (e) => {
        const locale = e.target.value
        if (locale == 'en') {
          setHeader(true)
        }
        else {
          setHeader(false)
        }
        router.push(locale)
    }

    return <div>
        <HeaderContext.Provider value={{locale, language, header }}>
            {props.children}
        </HeaderContext.Provider>
    </div>
}

export default HeaderContextProvider