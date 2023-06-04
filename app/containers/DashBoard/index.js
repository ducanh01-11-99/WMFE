import React, { useEffect, useState } from 'react';
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import axios from 'axios';
import { Content, ContentWrapper } from '../../res/commonStyles';
import IconDustbinGreen from '../../images/icon/dustbin/dustbingreen.svg';
import TruckIcon from '../../images/icon/dustbin/truck.svg';
import Parking from '../../images/icon/dustbin/parking.svg';
const center = {
  lat: 21.036891,
  lng: 105.781659,
};

const DashBoard = () => {
  // eslint-disable-next-line no-unused-vars
  const [directionResponse, setDirectionsResponse] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [distance, setDistance] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [duration, setDuration] = useState([]);
  const [listRecycleBin, setListRecycleBin] = useState([]);
  const [listGara, setListGara] = useState([]);
  const [listTruck, setListTruck] = useState([]);

  // const getCoordinatesAA = id => {
  //   for (let i = 0; i < listRecycleBin.length; i++) {
  //     if (listRecycleBin[i].recycleBinID === id) {
  //       return listRecycleBin[i].location.toString();
  //     }
  //   }
  // };

  // const calculateRoute = async () => {
  //   // eslint-disable-next-line no-undef
  //   const directonService = new google.maps.DirectionsService();
  //   listTruck.map(async item => {
  //     // duyet qua tung xe trong mang danh sach xe
  //     if (item.recycleBinIDList !== null) {
  //       const arr = item.recycleBinIDList.split(';');
  //       // Danh sách thùng rác đã được sắp xếp theo thứ tự, đường đi A -> B, B -> C
  //       for (let i = 0; i < arr.length - 2; i++) {
  //         const cor1 = getCoordinatesAA(arr[i]);
  //         const cor2 = getCoordinatesAA(arr[i + 1]);
  //         // eslint-disable-next-line no-await-in-loop
  //         const results = await directonService.route({
  //           origin: {
  //             lat: parseFloat(cor1 ? cor1.split(',')[0] : null),
  //             lng: parseFloat(cor1 ? cor1.split(',')[1] : null),
  //           },
  //           destination: {
  //             lat: parseFloat(cor2 ? cor2.split(',')[0] : null),
  //             lng: parseFloat(cor2 ? cor2.split(',')[1] : null),
  //           },
  //           // eslint-disable-next-line no-undef
  //           travelMode: google.maps.TravelMode.DRIVING,
  //         });
  //         setDirectionsResponse([...directionResponse, results]);
  //       }
  //     }
  //   });
  // };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBhP-QUDjRJcOHhu5dzxSmXo3LR3nuxkAo',
  });

  useEffect(() => {
    loadData();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const [mapA, setMap] = React.useState(null);

  // lấy danh sách thùng rác
  const loadData = async () => {
    const res = await axios.get('https://localhost:7145/api/v1/RecycleBin');
    const listGaraA = await axios.get('https://localhost:7145/api/v1/Garage');
    const listTruckA = await axios.get(
      'https://localhost:7145/api/v1/Garbagetruck',
    );
    setListGara(listGaraA.data);
    setListRecycleBin(res.data);
    setListTruck(listTruckA.data);
  };
  useEffect(() => {
    if (listTruck.length > 0 && listRecycleBin.length > 0) {
      // calculateRoute();
    }
  }, [listRecycleBin, listTruck]);

  // 30s load api 1 lan
  setTimeout(() => {
    loadData();
  }, 10000);

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
  return (
    <Content>
      <ContentWrapper showAdvanceSearch={false}>
        <div>
          So xe: {listTruck.length}
          So thung rac: {listRecycleBin.length}
        </div>
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
                />
              </>
            ))}
            {listTruck.map(items => (
              <>
                <Marker
                  title={`Xe ${items.recycleBinID}.Tình trạng${
                    items.recyclebinStatus
                  }`}
                  position={{
                    lat: parseFloat(items.location.split(',')[0]),
                    lng: parseFloat(items.location.split(',')[1]),
                  }}
                  icon={TruckIcon}
                />
              </>
            ))}
            {listGara.map(items => (
              <>
                <Marker
                  title={`Tram dung ${items.recycleBinID}.Tình trạng${
                    items.recyclebinStatus
                  }`}
                  position={{
                    lat: parseFloat(items.location.split(',')[0]),
                    lng: parseFloat(items.location.split(',')[1]),
                  }}
                  icon={Parking}
                />
              </>
              // eslint-disable-next-line react/jsx-no-comment-textnodes
            ))}
            // tao danh sach tat ca ket noi xong cho vao map item
            {directionResponse &&
              // eslint-disable-next-line array-callback-return
              directionResponse.map(item => {
                // eslint-disable-next-line no-unused-expressions
                <DirectionsRenderer directions={item} />;
              })}
          </GoogleMap>
        )}
      </ContentWrapper>
    </Content>
  );
};
DashBoard.propTypes = {};
export default DashBoard;
