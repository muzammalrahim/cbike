import React, { useState } from 'react'
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation"
import { useRouter } from 'next/router'
import axios from "axios"
import TopHeader from './TopHeader'
import { toast } from 'react-toastify'
import Footer from '../components/Footer'
import en from "../components/locales/en"
import fr from "../components/locales/fr"
import LoginArabic from './LoginArabic'

const Login = () => {
    const router = useRouter()
    const { locale } = router
    const t = locale === 'en' ? en : fr
    const [showPassword, setShowPassword] = useState(false)
    const [login, setLogin] = useState({
        email: "",
        password: "",
    })
    const { email, password } = login

    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            let payload = {
                email: login.email,
                password: login.password
            }
            const res = await axios.post(`https://3jj2zsfcm6.execute-api.us-east-1.amazonaws.com/dev/api/login`, payload)
            console.log("error message", res.data.response);
            if (res.data.success === true) {
                localStorage.setItem("loginToken", res.data.token)
                localStorage.setItem("loginName", res.data.name)
                toast.success(res.data.response)
                setLogin(res.data)
                router.push("/")
            }
            else {
                toast.error(res.data.response)
            }

        } catch (err) {
            console.log(err);
        }
    }

    return locale === "en" ? (
        <>
            <TopHeader />
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-6 logo'>
                        <h1>{t.login.logoText}</h1>
                    </div>
                    <div className='col-md-6'>
                        <ValidationForm onSubmit={(e) => onSubmit(e)}>

                            <label htmlFor="exampleInputEmail1">{t.login.email}</label>
                            <TextInput
                                type="email"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                required
                                successMessage=""
                                autoComplete="off"
                                errorMessage="Please enter your email"
                            />
                            <label htmlFor="exampleInputEmail1">{t.login.password}</label>
                            <TextInput
                                type={showPassword ? 'text' : 'password'}
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                required
                                successMessage=""
                                autoComplete="off"
                                errorMessage="Please enter your password"
                            />
                            <input onClick={handleShowPassword} type="checkbox" id="showPassword" />
                            <label htmlFor="showPassword" className="pl-2">{t.login.showPassword}</label>
                            <br /><br />
                            <button type="submit" className="btn btn-warning ml-2">{t.login.loginBtn}</button>
                            <button type="submit" className="btn btn-warning ml-2" onClick={() => router.push("/Register")}>Register</button>
                        </ValidationForm>
                    </div>
                </div>
            </div>
            <br /><br /><br /><br /><br /><br />
            <Footer />
        </>
    ) : <LoginArabic />
}

export default Login