import React, { useEffect, useState } from 'react';
import { Form, Input, message, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../resources/authentication.css';
import axios from 'axios';
import Spinner from '../components/Spinner'

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(true);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post('/api/users/register', values);
      message.success('Registration Successful');
      setLoading(false);
    } catch (error) {
      message.error('Something went wrong');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("MoneySpend-user")) {
      navigate("/");
    }
  }, []);

  return (
  
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
            <h2>Money Management Register</h2>
            <hr />
            <Form.Item
              label='Name'
              name='name'
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Email'
              name='email'
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <div className='d-flex justify-content-between align-items-center'>
              <Link to='/login'>Already registered? Click here to login</Link>
              <Button type='primary' htmlType='submit'>
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
