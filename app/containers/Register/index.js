import React from 'react';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { LoginStyled, LoginWrapper } from '../Login/stylesLogin';

const Register = () => {
  const [form] = Form.useForm();

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
      <LoginWrapper>
        <Row gutter={24} style={{ height: '100%' }}>
          <Col span={12} style={{ background: 'green' }}>
            Left container
          </Col>
          <Col span={12}>
            Dang ky
            <Form form={form}>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item>
                    <div>Ho</div>
                    <Input placeholder="Ho" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <div>Ten</div>
                    <Input placeholder="Ten" />
                  </Form.Item>
                </Col>
              </Row>
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
                <Input placeholder="Your email" prefix={<MailOutlined />} />
              </Form.Item>

              <div>So dien thoai</div>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  placeholder="Your phone"
                  visibilityToggle
                  prefix={<PhoneOutlined />}
                />
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
                <Input.Password
                  placeholder="Your password"
                  visibilityToggle
                  prefix={<LockOutlined />}
                />
              </Form.Item>

              <Form.Item>
                <Checkbox>Ghi nho</Checkbox>
              </Form.Item>

              <div>Quan mat khau?</div>

              <Button style={{ width: '100%' }} onClick={submit}>
                Dang ky
              </Button>

              <div>--- hoac ---</div>
            </Form>
          </Col>
        </Row>
      </LoginWrapper>
    </LoginStyled>
  );
};

export default Register;
