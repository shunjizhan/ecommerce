import { Button, Form, Input } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux';
import { signup, SignupPayload } from '../../store/actions'
import Layout from './Layout'

const Signup = () => {
  const dispatch = useDispatch();
  const handleSignup = (data: SignupPayload) => {
    dispatch(signup(data));
  }

  return (
    <Layout title='注册' subTitle=''>
      <Form onFinish= { handleSignup }>
        <Form.Item name='name' label='昵称'>
          <Input />
        </Form.Item>
        <Form.Item name='password' label='密码'>
          <Input.Password />
        </Form.Item>
        <Form.Item name='email' label='邮箱'>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            注册
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}

export default Signup
