import { Button, Form, Input, Result } from 'antd'
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetSignup, signup, SignupPayload } from '../../store/actions'
import { AppState } from '../../store/reducers';
import { AuthState } from '../../store/reducers/auth.reducer';
import Layout from './Layout'

const Signup = () => {
  const dispatch = useDispatch();
  const handleSignup = (data: SignupPayload) => {
    dispatch(signup(data));
  }

  const auth = useSelector<AppState, AuthState>(state => state.auth);

  useEffect(() => {
    if (auth.signup.loaded && auth.signup.success) {
      form.resetFields();   // 注册成功，清空表单
    }
  }, [auth]);

  useEffect(() => {
    // 在组件卸载的时候，把注册状态reset，这样用户再次到注册界面，就不会显示上次的成功界面
    return () => {
      dispatch(resetSignup());
    }
  }, []);

  const showSuccess = () => (
    <Result
      status='success'
      title='注册成功！'
      extra={[
        <Button type='primary'>
          <Link to='/signin'>登陆</Link>
        </Button>
      ]}
    />
  );

  const showError = () => (
    <Result
      status='warning'
      title='注册失败'
      subTitle={ auth.signup.msg }
    />
  );

  const [form] = Form.useForm();
  const signupForm = () => (
    <Form form={form} onFinish={handleSignup}>
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
  );

  const shouldShowSuccess = auth.signup.loaded && auth.signup.success;
  const shouldShowError = auth.signup.loaded && !auth.signup.success;

  return (
    <Layout title='注册' subTitle=''>
      { shouldShowSuccess && showSuccess() }
      { shouldShowError && showError() }
      { signupForm() }
    </Layout>
  )
}

export default Signup
