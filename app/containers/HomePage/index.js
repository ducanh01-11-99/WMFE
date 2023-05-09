import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Row } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
// import {GoogleMapReact,  } from 'google-map-react';

import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
} from '@react-google-maps/api';

import {
  ButtonLogin,
  DivIconSearch,
  HeaderLayout,
  MenuHomepage,
} from './styled';
import Banner from './component/Banner';

import IconSearch from '../../images/search2.svg';

import IconDustbinGreen from '../../images/icon/dustbin/dustbingreen.svg';

import parking from '../../images/icon/icon-setting-gray.svg';

import ListInfor from './component/ListInfo';
import InfoDiv from './component/InforDiv';
import Options from './component/Options';

const center = {
  lat: 20.993112,
  lng: 105.946659,
};

const listPosition = [
  { lat: 20.993112, lng: 105.946659 },
  { lat: 20.9929, lng: 105.946991 },
  { lat: 20.992316, lng: 105.948049 },
  { lat: 20.991647, lng: 105.949134 },
  { lat: 20.990527, lng: 105.95113 },
  { lat: 20.992117, lng: 105.945606 },
  { lat: 20.993398, lng: 105.944799 },
  { lat: 20.993409, lng: 105.943233 },
  { lat: 20.994697, lng: 105.941137 },
  { lat: 20.993224, lng: 105.940171 },
  { lat: 20.993144, lng: 105.940197 },
  { lat: 20.990682, lng: 105.941175 },
  { lat: 20.988679, lng: 105.943626 },
  { lat: 20.988915, lng: 105.945801 },
  { lat: 20.989871, lng: 105.944429 },
  { lat: 20.989066, lng: 105.948761 },
  { lat: 20.991733, lng: 105.952366 },
  { lat: 20.994232, lng: 105.950008 },
  { lat: 20.996745, lng: 105.954591 },
  { lat: 20.99524, lng: 105.954504 },
  { lat: 20.996078, lng: 105.955895 },
  { lat: 20.995066, lng: 105.958842 },
  { lat: 20.992753, lng: 105.955551 },
];

const listTR = [
  { lat: 20.998098, lng: 105.944198 },
  { lat: 21.000643, lng: 105.954004 },
  { lat: 20.989051, lng: 105.960916 },
  { lat: 20.987125, lng: 105.940406 },
];

const target = {
  lat: 21.027,
  lng: 105.8347,
};

// eslint-disable-next-line react/prop-types
// const AnyReactComponent = ({ text, percent }) => {
//   // eslint-disable-next-line no-unused-vars
//   let label = IconDustbinBlue;
//   if (percent < 50) {
//     label = IconDustbinGreen;
//   } else if (percent >= 50 && percent < 80) {
//     label = IconDustbinOrange;
//   } else {
//     label = IconDustbinRed;
//   }
//   return (
//     <DivIconSearch>
//       {/* <Button>{text} 60%</Button>; */}
//       <Tooltip placement="topLeft" title={InfoToolTip(text, percent)}>
//         <img
//           src={label}
//           alt=""
//           width={30}
//           height={30}
//           style={{ color: 'blue' }}
//         />
//       </Tooltip>
//     </DivIconSearch>
//   );
// };

// const InfoToolTip = (text, number) => (
//   <>
//     <div>
//       {text} - {number}%
//     </div>
//   </>
// );
const HomePage = () => {
  const history = useHistory();
  const [directionResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  console.log(distance, duration);
  const clickLogin = () => {
    history.push('./login');
  };

  const calculateRoute = async () => {
    // eslint-disable-next-line no-undef
    const directonService = new google.maps.DirectionsService();
    const results = await directonService.route({
      origin: { lat: 20.998098, lng: 105.944198 },
      destination: { lat: 20.99524, lng: 105.954504 },

      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.WALKING,
    });

    console.log('adada', results);

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].distance.text);
  };

  // const clearRoute = () => {
  //   setDirectionsResponse(null);
  //   setDistance('');
  //   setDuration('');
  // };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB1fbo7x3EFQrDkKHw70pLIRpKwZXELbuU',
  });

  const [mapA, setMap] = React.useState(null);

  console.log(mapA);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    console.log(map);
    setMap(null);
  }, []);

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
        <Button onClick={calculateRoute}>Click</Button>
        {/* <GoogleMapReact */}
        {/*  bootstrapURLKeys={{ */}
        {/*    key: 'AIzaSyB1fbo7x3EFQrDkKHw70pLIRpKwZXELbuU', */}
        {/*  }} */}
        {/*  defaultCenter={{ lat: 21.15, lng: 105.25 }} */}
        {/*  defaultZoom={20} */}
        {/* > */}
        {/*  <AnyReactComponent */}
        {/*    lat={21.0278} */}
        {/*    lng={105.8342} */}
        {/*    text="TR 1" */}
        {/*    percent={40} */}
        {/*  /> */}

        {/*  <AnyReactComponent */}
        {/*    lat={21.027} */}
        {/*    lng={105.8347} */}
        {/*    text="TR 2" */}
        {/*    percent={70} */}
        {/*  /> */}

        {/*  <AnyReactComponent */}
        {/*    lat={21.027} */}
        {/*    lng={105.835} */}
        {/*    text="TR 3" */}
        {/*    percent={80} */}
        {/*  /> */}
        {/*  <AnyReactComponent */}
        {/*    lat={21.1} */}
        {/*    lng={105.5342} */}
        {/*    text="TR 1" */}
        {/*    percent={120} */}
        {/*  /> */}

        {/*  <AnyReactComponent */}
        {/*    lat={21.227} */}
        {/*    lng={105.6347} */}
        {/*    text="TR 2" */}
        {/*    percent={50} */}
        {/*  /> */}

        {/*  <AnyReactComponent */}
        {/*    lat={21.327} */}
        {/*    lng={105.735} */}
        {/*    text="TR 3" */}
        {/*    percent={100} */}
        {/*  /> */}
        {/* </GoogleMapReact> */}

        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={20}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker position={center} icon={IconDustbinGreen} />
            <Marker position={target} />
            {/* eslint-disable-next-line no-shadow */}
            {listPosition.map(items => (
              <Marker
                position={{ lat: items.lat, lng: items.lng }}
                icon={IconDustbinGreen}
              />
            ))}

            {/* eslint-disable-next-line no-shadow */}
            {listTR.map(items => (
              <Marker
                position={{ lat: items.lat, lng: items.lng }}
                icon={parking}
              />
            ))}

            {directionResponse && (
              <DirectionsRenderer directions={directionResponse} />
            )}
          </GoogleMap>
        )}
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
