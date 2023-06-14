import React from 'react'
import { Button, Form, Input, notification } from 'antd'
import { setCookie } from 'nookies'

import { RegisterFormDTO } from '@/api/dto/auth.dto'
import * as Api from '@/api'

import style from './Auth.module.scss'

const RegisterForm: React.FC = () => {
  const onSubmit = async (values: RegisterFormDTO) => {
    try {
      const { token } = await Api.auth.register(values)

      notification.success({
        message: 'Успешно!',
        description: 'Переходим в админ-панель...',
        duration: 2
      })
      
      setCookie(null, "_token", token, {
        path: '/'
      })

      location.href = '/dashboard'
    } catch (error) {
      console.warn('RegisterForm', error)
      
      notification.error({
        message: "Ошибка!",
        description: "Не удалось зарегестрироваться.",
        duration: 2,
      });
    }
  }

  return (
    <div className={style.formBlock}>
      <Form
        name='basic'
        labelCol={{
          span: 8
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: 'Укажите почту!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Полное имя"
          name="fullname"
          rules={[{ required: true, message: 'Укажите полное имя!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Укажите пароль!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Зарегестрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RegisterForm