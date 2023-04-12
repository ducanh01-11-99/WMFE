import React, { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { LoginStyled, LoginWrapper } from './stylesLogin';
import ChangePasswordModal from '../component/ChangePasswordModal';

const Login = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  console.log('openModal', openModal);

  const submit = () => {
    form
      .validateFields()
      .then(value => {
        console.log('value', value);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const clickRegister = () => {
    history.push('./register');
    console.log('dang ky');
  };

  const clickForgetPassword = () => {
    history.push('./forgot-password');
  };

  console.log(1234);
  return (
    <LoginStyled>
      <LoginWrapper>
        <Row gutter={24} style={{ height: '100%' }}>
          <Col span={12} style={{ background: 'green' }}>
            Left container
          </Col>
          <Col span={12}>
            <Button
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Test Quen mat khau
            </Button>
            <br />
            Ban chua co tai khoan?
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <span onClick={clickRegister}> Dang ki </span>
            <Form form={form}>
              <div>Ten dang nhap hoac dai chi email</div>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} />
              </Form.Item>

              <div>Mat khau</div>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input.Password visibilityToggle prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item>
                <Checkbox>Ghi nho</Checkbox>
              </Form.Item>

              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <span onClick={clickForgetPassword}>Quan mat khau?</span>

              <Button style={{ width: '100%' }} onClick={submit}>
                Dang nhap
              </Button>

              <div>--- hoac ---</div>
            </Form>
          </Col>
        </Row>

        {openModal && (
          <ChangePasswordModal
            onClose={() => {
              setOpenModal(false);
            }}
          />
        )}
      </LoginWrapper>
    </LoginStyled>
  );
};

export default Login;
