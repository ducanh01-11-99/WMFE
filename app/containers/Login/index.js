import React, { useState } from 'react';
import { Button, Col, Form, Row, Image } from 'antd';
import { useHistory } from 'react-router-dom';
import { LoginStyled, LoginWrapper } from './stylesLogin';
import ChangePasswordModal from '../component/ChangePasswordModal';
import image from '../../images/checkedIcon.svg';
import FloatingLabel from '../../res/components/FloatingLabel/Input';

const Login = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  // Xu ly call api login
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

  return (
    <LoginStyled>
      <LoginWrapper style={{ backgroundColor: 'white' }}>
        <Row gutter={24} style={{ height: '100%' }}>
          <Col span={12} style={{ background: 'green' }}>
            <Image src={image} />
          </Col>
          <Col span={12}>
            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                margin: 'auto',
                textAlign: 'center',
                marginBottom: 20,
                color: '#219653',
                marginTop: '15%',
              }}
            >
              Đăng nhập
            </div>
            <Form form={form}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <FloatingLabel label="Tên đăng nhập" isRequired />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <FloatingLabel label="Mật khẩu" isPass isRequired />
              </Form.Item>

              <Button
                style={{
                  height: '40px',
                  width: '100%',
                  borderRadius: '8px',
                  backgroundColor: '#219653',
                  color: 'white',
                }}
                onClick={submit}
              >
                Đăng nhập
              </Button>

              <div
                style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}
              >
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <span onClick={clickForgetPassword}>Quên mật khẩu?</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span> Bạn chưa có tài khoản? </span>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <span onClick={clickRegister}> Đăng kí </span>
              </div>
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
