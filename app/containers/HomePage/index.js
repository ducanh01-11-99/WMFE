import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';

import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
} from '@react-google-maps/api';

import axios from 'axios';
import {
  ButtonLogin,
  DivIconSearch,
  HeaderLayout,
  MenuHomepage,
} from './styled';
import Banner from './component/Banner';

import IconSearch from '../../images/search2.svg';

import IconDustbinGreen from '../../images/icon/dustbin/dustbingreen.svg';

import ListInfor from './component/ListInfo';
import InfoDiv from './component/InforDiv';
import Options from './component/Options';
const center = {
  lat: 21.036891,
  lng: 105.781659,
};

const HomePage = () => {
  const history = useHistory();
  const [directionResponse, setDirectionsResponse] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [distance, setDistance] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [duration, setDuration] = useState('');
  const clickLogin = () => {
    history.push('./login');
  };

  const [listRecycleBin, setListRecycleBin] = useState([]);

  const calculateRoute = async (userPost, recycleBinPost) => {
    console.log(userPost);
    console.log(recycleBinPost);
    // eslint-disable-next-line no-undef
    const directonService = new google.maps.DirectionsService();
    const results = await directonService.route({
      origin: {
        lat: parseFloat(userPost.toString().split(',')[0]),
        lng: parseFloat(userPost.toString().split(',')[1]),
      },
      destination: {
        lat: parseFloat(recycleBinPost.toString().split(',')[0]),
        lng: parseFloat(recycleBinPost.toString().split(',')[1]),
      },

      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.WALKING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].distance.text);
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB1fbo7x3EFQrDkKHw70pLIRpKwZXELbuU',
  });

  // eslint-disable-next-line no-unused-vars
  const [mapA, setMap] = React.useState(null);

  // lấy danh sách thùng rác
  const loadData = async () => {
    const res = await axios.get('https://localhost:7145/api/v1/RecycleBin');
    console.log(res);
    setListRecycleBin(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

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
        <>
          <span>vị trí của bạn</span>
          <input id="theInput" />
        </>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={5}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {/* eslint-disable-next-line no-shadow */}
            {listRecycleBin.map(items => (
              <>
                <Marker
                  title={`Thùng rác${items.recycleBinID}.Tình trạng${
                    items.recyclebinStatus
                  }`}
                  position={{
                    lat: parseFloat(items.location.split(',')[0]),
                    lng: parseFloat(items.location.split(',')[1]),
                  }}
                  icon={IconDustbinGreen}
                  onClick={() => {
                    calculateRoute(
                      '21.036891, 105.781659',
                      items.location.toString(),
                    );
                  }}
                />
              </>
            ))}

            {directionResponse && (
              <DirectionsRenderer directions={directionResponse} />
            )}
          </GoogleMap>
        )}
      </div>
      <Footer
        style={{
          marginTop: '-10px',
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
