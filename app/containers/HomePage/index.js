import React from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row, Tooltip } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import GoogleMapReact from 'google-map-react';
import {
  ButtonLogin,
  DivIconSearch,
  HeaderLayout,
  MenuHomepage,
} from './styled';
import Banner from './component/Banner';

import IconSearch from '../../images/search2.svg';

import IconDustbinGreen from '../../images/icon/dustbin/dustbingreen.svg';
import IconDustbinRed from '../../images/icon/dustbin/dustbinred.svg';
import IconDustbinBlue from '../../images/icon/dustbin/dustbinblue.svg';
import IconDustbinOrange from '../../images/icon/dustbin/dustbinorange.svg';

import ListInfor from './component/ListInfo';
import InfoDiv from './component/InforDiv';
import Options from './component/Options';
// eslint-disable-next-line react/prop-types
const AnyReactComponent = ({ text, percent }) => {
  // eslint-disable-next-line no-unused-vars
  let label = IconDustbinBlue;
  if (percent < 50) {
    label = IconDustbinGreen;
  } else if (percent >= 50 && percent < 80) {
    label = IconDustbinOrange;
  } else {
    label = IconDustbinRed;
  }
  return (
    <DivIconSearch>
      {/* <Button>{text} 60%</Button>; */}
      <Tooltip placement="topLeft" title={InfoToolTip(text, percent)}>
        <img
          src={label}
          alt=""
          width={30}
          height={30}
          style={{ color: 'blue' }}
        />
      </Tooltip>
    </DivIconSearch>
  );
};

const InfoToolTip = (text, number) => (
  <>
    <div>
      {text} - {number}%
    </div>
  </>
);
const HomePage = () => {
  const history = useHistory();
  const clickLogin = () => {
    history.push('./login');
  };

  // const [isModalOpen, setModalOpen] = useState(false);

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
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyB1fbo7x3EFQrDkKHw70pLIRpKwZXELbuU',
          }}
          defaultCenter={{ lat: 21.15, lng: 105.25 }}
          defaultZoom={20}
        >
          <AnyReactComponent
            lat={21.0278}
            lng={105.8342}
            text="TR 1"
            percent={40}
          />

          <AnyReactComponent
            lat={21.027}
            lng={105.8347}
            text="TR 2"
            percent={70}
          />

          <AnyReactComponent
            lat={21.027}
            lng={105.835}
            text="TR 3"
            percent={80}
          />
          <AnyReactComponent
            lat={21.1}
            lng={105.5342}
            text="TR 1"
            percent={120}
          />

          <AnyReactComponent
            lat={21.227}
            lng={105.6347}
            text="TR 2"
            percent={50}
          />

          <AnyReactComponent
            lat={21.327}
            lng={105.735}
            text="TR 3"
            percent={100}
          />
        </GoogleMapReact>
      </div>
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
