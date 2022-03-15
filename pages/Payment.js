import React from 'react'
import Header from './TopHeader'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from "next/router";
import en from "../components/locales/en"
import fr from "../components/locales/fr"
import Footer from '../components/Footer';

const Payment = () => {
    const router = useRouter()
    const { locale } = router
    const t = locale === 'en' ? en : fr

    const onSubscribeForPerYear = async e => {
        e.preventDefault()
        const token = localStorage.getItem("loginToken")
        var config = {
            method: 'post',
            url: `https://3jj2zsfcm6.execute-api.us-east-1.amazonaws.com/dev/api/checkout`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };
        axios(config)
            .then(function (response) {
                if (token) {
                    window.open(response.data.url);
                }
                else {
                    toast.error("user not registered")
                    router.push("/Login")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onSubscribeForPerMonth = async e => {
        e.preventDefault()
        const token = localStorage.getItem("loginToken")
        var config = {
            method: 'post',
            url: `https://3jj2zsfcm6.execute-api.us-east-1.amazonaws.com/dev/api/checkout-50`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };
        axios(config)
            .then(function (response) {
                if (token) {
                    window.open(response.data.url);
                }
                else {
                    toast.error("user not registered")
                    router.push("/Login")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onSubscribeForPerDay = async e => {
        e.preventDefault()
        const token = localStorage.getItem("loginToken")
        var config = {
            method: 'post',
            url: `https://3jj2zsfcm6.execute-api.us-east-1.amazonaws.com/dev/api/checkout-8`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };
        axios(config)
            .then(function (response) {
                if (token) {
                    window.open(response.data.url);
                }
                else {
                    toast.error("user not registered")
                    router.push("/Login")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <>
            <Header />
            <div className='container mt-5 ' >
                <h1 className='text-center pb-5'>{t.payment.bundle}</h1>
                <div className='row'>
                    <div className='col-md-3 card__container'>
                        <div className="card text-center payment payment">
                            <div className="card-body">
                                <h5 className="card-title">{t.payment.settler}</h5>
                                <h1 className="card-text pt-5 payment__amount">{t.payment.EGP500}</h1>
                                <p className='card-text'>{t.payment.year}</p>
                                <div className='btn-radius'>
                                    <button type='submit' className='btn btn-dark' onClick={e => onSubscribeForPerYear(e)}>{t.payment.subscribe}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 card__container'>
                        <div className="card text-center payment">
                            <div className="card-body">
                                <h5 className="card-title">{t.payment.commuter}</h5>
                                <h1 className="card-text payment__amount pt-5">{t.payment.EGP50}</h1>
                                <p className='card-text'>{t.payment.month}</p>
                                <div className='btn-radius'>
                                    <button type='submit' className='btn btn-dark' onClick={e => onSubscribeForPerMonth(e)}>{t.payment.subscribe}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 card__container'>
                        <div className="card text-center payment">
                            <div className="card-body">
                                <h5 className="card-title">{t.payment.personal}</h5>
                                <h1 className="card-text  payment__amount pt-5">{t.payment.EGP8}</h1>
                                <p className='card-text'>{t.payment.day}</p>
                                <div className='btn-radius'>
                                    <button type='submit' className='btn btn-dark' onClick={e => onSubscribeForPerDay(e)}>{t.payment.subscribe}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 card__container'>
                        <div className="card text-center payment">
                            <div className="card-body">
                                <h5 className="card-title">{t.payment.explorer}</h5>
                                <h1 className="card-text  payment__amount pt-5">{t.payment.EGP3}</h1>
                                <p className='card-text'>{t.payment.hour}</p>
                                <div className='btn-radius'>
                                    <button className='btn btn-dark'>{t.payment.subscribe}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Payment