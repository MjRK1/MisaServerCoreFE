import React, { useState } from 'react';
import { Button, Form } from 'antd';
import { InputText } from 'commonComponents/Input/inputText';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from 'hooks/AuthProvider';
import { ILoginProps } from 'types/Auth/Login';


export const Login = (
  { setRegisterModalOpen }: ILoginProps
) => {
  const user = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onFinish = async (values: { username: string; password: string }) => {
    // @ts-ignore
    const err = await user.login(values?.username, values?.password);
    if (err?.message) {
      setErrorMessage(err?.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-wrapper__title">Вход</div>
      <Form
        name="login"
        onFinish={onFinish}
        onFieldsChange={() => {
          if (errorMessage) {
            setErrorMessage(null);
          }
        }}
      >
        <div className="login-wrapper__login-form">
          <div className="login-form__username-field">
            <Form.Item name="username" rules={[{ required: true, message: 'Пожалуйста введите логин' }]}>
              <InputText placeholder="Введите логин" style={{ width: '100%' }} prefix={<UserOutlined />} />
            </Form.Item>
          </div>
          <div className="login-form__password-field">
            <Form.Item name="password" rules={[{ required: true, message: 'Пожалуйста введите пароль' }]} style={{ marginBottom: '15px' }}>
              <InputText password placeholder="Введите пароль" prefix={<LockOutlined />} />
            </Form.Item>
          </div>
          {errorMessage && <div className="login-form__error-message">{errorMessage}</div>}
          <div className="login-form__submit-button">
            <Form.Item style={{ marginBottom: '5px' }}>
              <Button htmlType="submit" style={{ width: '100%' }}>
                Авторизоваться
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
      <div className="login-form__register-modal-open">
        или
        <div className="register-modal-button" onClick={() => setRegisterModalOpen(true)}>
          зарегистрируйтесь
        </div>
      </div>
    </div>
  );
};
