import { Button, Form, Input } from 'antd'
import React from 'react'
import Layout from './Layout'

const Signin = () => {
  return (
    <Layout title='登陆' subTitle=''>
      <Form>
        <Form.Item name='password' label='密码'>
          <Input.Password />
        </Form.Item>
        <Form.Item name='email' label='邮箱'>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            登陆
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}

export default Signin
