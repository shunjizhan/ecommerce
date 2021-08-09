import { Button, Form, Input, Result } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { isAuth } from '../../helpers/auth'
import { signin, SigninPayload } from '../../store/actions'
import { Jwt } from '../../store/models/auth'
import { AppState } from '../../store/reducers'
import { AuthState } from '../../store/reducers/auth.reducer'
import Layout from './Layout'

const Signin = () => {
  const dispatch = useDispatch();
  const auth = useSelector<AppState, AuthState>(state => state.auth);

  const onFinish = (data: SigninPayload) => {
    dispatch(signin(data));
  }

  const redirectToDashboard = () => {
    const auth = isAuth();
    if (auth) {
      const { user: { role }} = auth as Jwt;    // Auth的type有可能是false，所以这里告诉TS这里确定是Jwt type

      if (role === 0) {   // 用户
        return <Redirect to='/user/dashboard' />
      } else {            // 管理员
        return <Redirect to='/admin/dashboard' />
      }
    }
  }

  const shouldShowError = auth.signin.loaded && !auth.signin.success;
  const showError = () => (
    <Result
      status='warning'
      title='登陆失败'
      subTitle={ auth.signin.msg }
    />
  );

  const LoginForm = () => (
    <Form onFinish={onFinish}>
      <Form.Item name='email' label='邮箱'>
        <Input />
      </Form.Item>
      <Form.Item name='password' label='密码'>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          登陆
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <Layout title='登陆' subTitle=''>
      { shouldShowError && showError() }
      { redirectToDashboard() }
      { LoginForm() }
    </Layout>
  )
}

export default Signin
