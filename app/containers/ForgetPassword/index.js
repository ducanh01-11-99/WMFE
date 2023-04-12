import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { LoginStyled, LoginWrapper } from '../Login/stylesLogin';

const ForgetPassword = () => {
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
  return (
    <LoginStyled>
      <LoginWrapper>
        <Row gutter={24} style={{ height: '100%' }}>
          <Col span={12} style={{ background: 'green' }}>
            Left container
          </Col>
          <Col span={12}>
            <div style={{ height: '30%', marginTop: '35%' }}>
              <Form form={form}>
                <div>Địa chỉ Email</div>
                <Form.Item
                  placeholder="Your email"
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
                <Button style={{ width: '100%' }} onClick={submit}>
                  Dang nhap
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </LoginWrapper>
    </LoginStyled>
  );
};

export default ForgetPassword;
