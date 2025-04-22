import React, { useState } from 'react';
import { Modal } from 'commonComponents/Modal';
import { IRegisterModalProps } from 'types/Auth/RegisterModal';
import { Button, Form } from 'antd';
import { InputText } from 'commonComponents/Input/inputText';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from 'hooks/AuthProvider';


export const RegisterModal = (props: IRegisterModalProps) => {
  const {
    isOpen,
    setOpen,
  } = props;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register } = useAuth();

  const handleRegister = async (values) => {
    if (register) {
      const error = await register(values.username, values.password, values.displayName);
      if (error) setErrorMessage(error.message);
      else {
        setOpen(false);
      }
    }
  };

  return (
    <Modal
      title="Регистрация"
      withCross
      withSuccess={false}
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      // onSuccess={handleSuccess}
    >
      <Form
        name="register"
        onFinish={handleRegister}
        onFieldsChange={() => {
          if (errorMessage) {
            setErrorMessage(null);
          }
        }}
      >
        <div className="register-wrapper__register-form">
          <div className="register-form__username-field">
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Пожалуйста введите логин' }]}
              style={{ marginTop: '20px' }}
            >
              <InputText
                placeholder="Введите логин"
                style={{ width: '100%' }}
                prefix={<UserOutlined />}
              />
            </Form.Item>
          </div>
          <div className="register-form__password-field">
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Пожалуйста введите пароль' }]}
              style={{ marginTop: '20px' }}
            >
              <InputText
                password
                placeholder="Введите пароль"
                prefix={<LockOutlined />}
              />
            </Form.Item>
          </div>
          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Пожалуйста подтвердите пароль!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Пароли не совпадают"));
                },
              }),
            ]}
            style={{ marginTop: '20px' }}
          >
            <InputText
              password
              placeholder="Подтвердите пароль"
            />
          </Form.Item>
          <Form.Item
            name="displayName"
            tooltip="Какое имя будет отображаться в приложении?"
            rules={[{ required: true, message: 'Пожалуйста введите отображаемое имя' }]}
            style={{ marginTop: '20px', marginBottom: 0 }}
          >
            <InputText
              placeholder="Введите отображаемое имя"
              style={{ width: '100%' }}
            />
          </Form.Item>
          {errorMessage && <div className="register-form__error-message">{errorMessage}</div>}
          <div className="register-form__submit-button">
            <Form.Item style={{ marginBottom: '20px', marginTop: '20px' }}>
              <Button htmlType="submit" style={{ width: '100%' }}>
                Зарегистрироваться
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
