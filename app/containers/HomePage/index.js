import React from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import {
  ButtonLogin,
  DivIconSearch,
  HeaderLayout,
  MenuHomepage,
} from './styled';
import Banner from './component/Banner';

import IconSearch from '../../images/search2.svg';
import ListInfor from './component/ListInfo';
import InfoDiv from './component/InforDiv';
import Options from './component/Options';
const HomePage = () => {
  const history = useHistory();
  const clickLogin = () => {
    history.push('./login');
  };

  const items = [
    {
      label: 'Intro',
      key: 'item1',
    },
    {
      label: 'Guide',
      key: 'item2',
    },
    {
      label: 'Contact',
      key: 'item3',
    },
  ];
  return (
    <div>
      <HeaderLayout>
        <Row>
          <Col span={12}>
            <MenuHomepage mode="horizontal" items={items} />
          </Col>
          <Col span={2} push={10}>
            <div
              style={{ display: 'flex', flexDirection: 'row', height: '100%' }}
            >
              <DivIconSearch>
                <img src={IconSearch} alt="" width={30} height={30} />
              </DivIconSearch>
              <ButtonLogin onClick={clickLogin}>Login</ButtonLogin>
            </div>
          </Col>
        </Row>
      </HeaderLayout>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
          width: '100%',
        }}
      >
        <Banner />
        <ListInfor />
        <InfoDiv
          title="End-to-end smart waste management solutions"
          detail="Providing enterprise-gradesmart waste management solutions that support the digital transformation of waste management to achieve efficiency, transparency, and sustainability "
        />
        <Options />
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        <Row>
          <Col span={8}>
            <div>Product</div>
          </Col>
          <Col span={8}>
            <div>Use Cases</div>
          </Col>
          <Col span={8}>
            <div>Company</div>
          </Col>
        </Row>
      </Footer>
    </div>
  );
};
export default HomePage;
