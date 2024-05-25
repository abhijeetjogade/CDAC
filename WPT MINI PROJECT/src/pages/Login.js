//useEffect, useState: Hooks for managing side effects and state within the functional component.
import React, { useEffect, useState } from 'react'
import { Form, Input, message } from 'antd';
//Link, useNavigate: Components and hooks from react-router-dom for navigation.
import { Link, useNavigate } from 'react-router-dom'
import '../resources/authentication.css'
import axios from 'axios'
import Spinner from '../components/Spinner';


function Login() {
    const [loading, setLoading] = useState(false)  //loading: State variable to manage the loading state
    const navigate = useNavigate()  //navigate: Hook for navigation.
    //onFinish: Async function triggered when the form is submitted.
    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', values)
            localStorage.setItem('SpendMoney-user', JSON.stringify({ ...response.data, password: "" }))
            setLoading(false);
            message.success('Login Successful')
            navigate('/');
        } catch (error) {
            setLoading(false)
            message.error('Login Fail')
        }
    }
    //this use effect Checks if the user is already logged in by looking for SpendMoney-user in localStorage.
    useEffect(() => {
        if (localStorage.getItem("SpendMoney-user")) {
            navigate("/"); //If found, navigates to the home page, preventing access to the login page.
        }
    }, []);

    return (
        <>
            <div className='register'>
                {loading && <Spinner />}
                <div className='row justify-content-center align-items-center w-100 h-100'>
                    <div className='col-md-5'>
                        <div className="lottie">
                            <lottie-player
                                src="https://assets3.lottiefiles.com/packages/lf20_06a6pf9i.json"
                                background="transparent"
                                speed="1"
                                loop
                                autoplay
                            ></lottie-player>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <Form layout='vertical' onFinish={onFinish}>
                            <h2>Money Management Login</h2>
                            <hr />
                            <Form.Item label='Email' name='email' rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                                <Input />
                            </Form.Item>
                            <div className='d-flex justify-content-between align-items-center'>
                                <Link to='/register'>Not Registered Yet Click here to Register</Link>
                                <button className='primary' type='submit' >Login</button>
                            </div>
                        </Form>
                    </div>

                </div>

            </div>
        </>
    )

}
export default Login