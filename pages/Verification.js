import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation"
import { toast } from 'react-toastify'
import withAuth from '../components/withAuth';

const Verification = () => {

    const router = useRouter()
    const [code, setCode] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    useEffect(() => {
        setPhoneNo(localStorage.getItem("phoneNo"));
    }, [code])

    const handleChange = (e) => {
        setCode(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`https://3jj2zsfcm6.execute-api.us-east-1.amazonaws.com/dev/api/verifyPhone`, { code, phoneNo })
            console.log("message", res.data.message);
            if (res.data.success === true) {
                setCode(res.data)
                window.localStorage.removeItem("phoneNo");
                router.push("/Login")
            }
            else {
                toast.error(res.data.message)
            }
        } catch (err) {
            console.log("Catch error", err);
            toast.error("Wrong code!!")
        }
    }
    return (
        <div>
            <Modal.Dialog style={{ width: "100%", height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Modal.Title className='text-center'>
                    Verify Code
                </Modal.Title>
                <Modal.Body className='text-center'>
                    <ValidationForm onSubmit={(e) => onSubmit(e)}>
                        <TextInput
                            placeholder='OTP CODE'
                            required
                            successMessage=""
                            autoComplete="off"
                            errorMessage="Please enter your OTP code"
                            onChange={handleChange}
                            name="code"
                            value={code}
                        />
                        <br /><br />
                        <div className='continue-btn'>
                            <button type='submit' className='btn btn-secondary'>Continue</button>
                        </div>
                    </ValidationForm>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
}

export default withAuth(Verification)