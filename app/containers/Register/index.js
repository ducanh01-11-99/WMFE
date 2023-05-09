import React from 'react';
import { Button, Col, Form, Row } from 'antd';
import { LoginStyled, LoginWrapper } from '../Login/stylesLogin';
import FloatingLabel from '../../res/components/FloatingLabel/Input';

const Register = () => {
  const [form] = Form.useForm();

  // call API tai day
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
  console.log(4321);
  return (
    <LoginStyled>
      <LoginWrapper style={{ backgroundColor: 'white' }}>
        <Row gutter={24} style={{ height: '100%' }}>
          <Col span={12} style={{ background: 'green' }}>
            Left container
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
              Đăng kí tài khoản
            </div>
            <Form form={form}>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="fName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your fName!',
                      },
                    ]}
                  >
                    <FloatingLabel label="Họ" isRequired />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your lastName!',
                      },
                    ]}
                  >
                    <FloatingLabel label="Tên" isRequired />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <FloatingLabel label="Email" isRequired />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <FloatingLabel label="Số điện thoại" isRequired />
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
                <FloatingLabel label="Mật khẩu" isRequired isPass />
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
                Đăng kí
              </Button>
            </Form>
          </Col>
        </Row>
      </LoginWrapper>
    </LoginStyled>
  );
};

export default Register;
