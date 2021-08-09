import { Button, Form, Input, message } from "antd"
import React, { useEffect, useState } from "react"
import Layout from "../core/Layout"
import axios from "axios"
import { API } from "../../config"
import { isAuth } from "../../helpers/auth"
import { Jwt } from "../../store/models/auth"
import { Link } from "react-router-dom"

const AddCategory = () => {
  const [name, setName] = useState<string>("")

  const { user, token } = isAuth() as Jwt

  useEffect(() => {
    async function addCategory() {
      const url = `${API}/category/create/${user._id}`;
      const params = { name: name };
      const headers = { headers: { Authorization: `Bearer ${token}` } };

      try {
        const res = await axios.post<{ name: string }>(url, params, headers);
        message.success(`[${res.data.name}] 分类添加成功`)
      } catch (error) {
        message.error(error.res.data.error)
      }
    }

    name && addCategory();
  }, [name])

  const onFinish = (value: { name: string }) => {
    setName(value.name)
  }
  return (
    <Layout title="添加分类" subTitle="">
      <Form onFinish={ onFinish }>
        <Form.Item name="name" label="分类名称">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加分类
          </Button>
        </Form.Item>
      </Form>
      <Button>
        <Link to="/admin/dashboard">返回 Dashboard</Link>
      </Button>
    </Layout>
  )
}

export default AddCategory
