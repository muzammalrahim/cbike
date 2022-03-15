import React, { useEffect, useState } from 'react'
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation"
import { useRouter } from 'next/router'
import TopHeader from './TopHeader'
import Link from 'next/link'
import axios from "axios"
import { toast } from 'react-toastify'
import Footer from '../components/Footer'
import en from "../components/locales/en"
import fr from "../components/locales/fr"
import RegisterArabic from './RegisterArabic'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Register = () => {

    const router = useRouter()
    const { locale } = router
    const t = locale === 'en' ? en : fr
    const [showPassword, setShowPassword] = useState(false)
    const [phone, setPhone] = useState()

    const [signUp, setSignUp] = useState({
        name: "",
        email: "",
        phoneNo: "",
        password: "",
        confirmPassword: ""
    })


    const { name, email, phoneNo, password, confirmPassword } = signUp

    const handleChange = (e) => {
        setSignUp({ ...signUp, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const matchPassword = (value) => {
        return value && value === password;
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            let payload = {
                name: signUp.name,
                email: signUp.email,
                phoneNo: phone,
                password: signUp.password
            }
            const res = await axios.post(`https://3jj2zsfcm6.execute-api.us-east-1.amazonaws.com/dev/api/signup`, payload)
            if (res.data.success === true) {
                console.log("phoneNo", res.data.phoneNo);
                localStorage.setItem("phoneNo", res.data.phoneNo)
                toast.success(res.data.response)
                setSignUp(res.data)
                router.push("/Verification")
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
                        <h1>{t.register.logoText}</h1>
                    </div>
                    <div className='col-md-6'>
                        <ValidationForm onSubmit={(e) => onSubmit(e)}>
                            <label htmlFor="exampleInputEmail1">{t.register.name}</label>
                            <TextInput
                                type="text"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={handleChange}
                                required
                                successMessage=""
                                autoComplete="off"
                                errorMessage="Please enter your name"
                            />
                            <label htmlFor="exampleInputEmail1">{t.register.email}</label>
                            <TextInput
                                type="email"
                                className="form-control"
                                name="email"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                                value={email}
                                onChange={handleChange}
                                required
                                successMessage=""
                                autoComplete="off"
                                errorMessage={{ required: "email is required", pattern: "email is not matching" }}
                            // errorMessage="Please enter your email"
                            />
                            <label htmlFor="exampleInputEmail1">{t.register.phoneNo}</label>
                            <PhoneInput
                                // type="text" 
                                country={'pk'}
                                value={phone}
                                onChange={e => setPhone(`+${e}`)}
                                inputStyle={{ width: "100%" }}
                            // className="form-control"
                            // name="phoneNo"
                            // value={phoneNo}
                            // onChange={handleChange}
                            // required
                            // successMessage=""
                            // autoComplete="off"
                            // errorMessage="Please enter your phone number"
                            />
                            <label htmlFor="exampleInputEmail1">{t.register.password}</label>
                            <TextInput
                                type={showPassword ? 'text' : 'password'}
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                pattern="(?=.*[a-z]).{8,}"
                                required
                                successMessage=""
                                autoComplete="off"
                                errorMessage={{ required: "Password is required", pattern: "Password should be at least 8 alpha-numeric" }}
                            />
                            <label htmlFor="exampleInputEmail1">{t.register.confirmPassword}</label>
                            <TextInput
                                type={showPassword ? 'text' : 'password'}
                                className="form-control"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleChange}
                                pattern="(?=.*[a-z]).{8,}"
                                validator={(value) => matchPassword(value)}
                                required
                                successMessage=""
                                autoComplete="off"
                                errorMessage={{ required: "Confirm password is required", validator: "Password does not match" }}
                            />
                            <input onClick={handleShowPassword} type="checkbox" id="showPassword" />
                            <label htmlFor="showPassword" className="pl-2">{t.register.showPassword}</label>
                            <br /><br />
                            <button type="submit" className="btn btn-warning">{t.register.registerBtn}</button>
                            <Link href="/Login" passHref>
                                <button type="submit" className="btn btn-warning ml-2">{t.register.loginBtn}</button>
                            </Link>
                        </ValidationForm>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    ) : <RegisterArabic />
}
export default Register
