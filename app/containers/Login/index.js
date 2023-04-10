import React from 'react';
import { Button } from 'antd';
import GoogleMapReact from 'google-map-react';
import { LoginStyled, LoginWrapper } from './stylesLogin';

// eslint-disable-next-line react/prop-types
const AnyReactComponent = ({ text }) => <Button>{text} 60%</Button>;

const Login = () => {
  console.log(1234);
  return (
    <LoginStyled>
      <LoginWrapper>
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyB1fbo7x3EFQrDkKHw70pLIRpKwZXELbuU',
            }}
            defaultCenter={{ lat: 21, lng: 105 }}
            defaultZoom={11}
          >
            <AnyReactComponent lat={21.0278} lng={105.8342} text="TR 1" />

            <AnyReactComponent lat={21.027} lng={105.8347} text="TR 2" />

            <AnyReactComponent lat={21.027} lng={105.835} text="TR 3" />
          </GoogleMapReact>
        </div>
      </LoginWrapper>
    </LoginStyled>
  );
};

export default Login;
