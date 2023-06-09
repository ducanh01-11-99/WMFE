import React, { useEffect, useState } from 'react';
import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import axios from 'axios';
import { Content, ContentWrapper } from '../../res/commonStyles';
import IconDustbinGreen from '../../images/icon/dustbin/dustbingreen.svg';
import Parking from '../../images/icon/dustbin/parking.svg';
import { statusToColor, statusToText } from '../../res/commonFunction';
import IconDustbinYellow from '../../images/icon/dustbin/dustbinorange.svg';
import IconDustbinRed from '../../images/icon/dustbin/dustbinred.svg';
import IconDustbinGray from '../../images/icon/dustbin/dustbinblue.svg';

import IconGreenTruck from '../../images/icon/truck/greenTRuck.svg';
// eslint-disable-next-line import/no-unresolved
import IconYellowTruck from '../../images/icon/truck/YellowTruck.svg';
import IconRedTruck from '../../images/icon/truck/redTruck.svg';
import IconGrayTruck from '../../images/icon/truck/grayTruck.svg';

// import IconGreenGara from '../../images/icon/garage/greenGarage.svg';
// import IconYellowGara from '../../images/icon/garage/yellowGarage.svg';
// import IconRedGara from '../../images/icon/garage/redGarage.svg';
// import IconGrayGara from '../../images/icon/garage/grayGarage.svg';

const center = {
  lat: 21.036891,
  lng: 105.781659,
};

const fakeData = [
  { lat: 21.036891, lng: 105.781659 },
  { lat: 21.031891, lng: 105.784659 },
  { lat: 21.016891, lng: 105.741659 },
];

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

  const [activeBin, setNumberActiveBin] = useState(0);
  const [noActiveBin, setNumberNoActiveBin] = useState(0);

  const [activeTruck, setNumberActiveTruck] = useState(0);
  const [noActiveTruck, setNumberNoActiveTruck] = useState(0);

  // eslint-disable-next-line no-unused-vars
  const [showInfo, setShowInfor] = useState(false);

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

  const calculateRoute = async () => {
    // eslint-disable-next-line no-undef
    const directonService = new google.maps.DirectionsService();
    for (let i = 0; i < fakeData.length - 2; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const results = await directonService.route({
        origin: {
          lat: parseFloat(fakeData[i].lat),
          lng: parseFloat(fakeData[i].lng),
        },
        destination: {
          lat: parseFloat(fakeData[i + 1].lat),
          lng: parseFloat(fakeData[i + 1].lng),
        },
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse([...directionResponse, results]);
      // setDirectionsResponse(results);
    }
  };

  useEffect(() => {
    console.log(directionResponse);
  }, [directionResponse]);

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
    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;
    if (listTruck.length > 0 && listRecycleBin.length > 0) {
      // eslint-disable-next-line array-callback-return
      listTruck.map(item => {
        if (item.status === 0) {
          a += 1;
        } else {
          b += 1;
        }
      });

      // eslint-disable-next-line array-callback-return
      listRecycleBin.map(item => {
        if (item.recyclebinStatus === 0) {
          c += 1;
        } else {
          d += 1;
        }
      });
      setNumberActiveBin(c);
      setNumberActiveTruck(a);
      setNumberNoActiveTruck(b);
      setNumberNoActiveBin(d);
    }
  }, [listRecycleBin, listTruck]);

  // 30s load api 1 lan
  setTimeout(() => {
    loadData();
    calculateRoute();
  }, 30000);

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

  const statusToIcon = idStatus => {
    let iCon = null;
    switch (idStatus) {
      case 0:
        iCon = IconDustbinGreen;
        break;
      case 2:
        iCon = IconDustbinYellow;
        break;
      case 1:
        iCon = IconDustbinRed;
        break;
      case 3:
        iCon = IconDustbinGray;
        break;
      default:
        iCon = IconDustbinGray;
        break;
    }
    return iCon;
  };

  const statusToIconTruck = idStatus => {
    let iCon = null;
    switch (idStatus) {
      case 0:
        iCon = IconGreenTruck;
        break;
      case 2:
        iCon = IconGrayTruck;
        break;
      case 1:
        iCon = IconRedTruck;
        break;
      case 3:
        iCon = IconYellowTruck;
        break;
      default:
        iCon = IconGrayTruck;
        break;
    }
    return iCon;
  };

  const [idSelected, setIdSelected] = useState(0);
  return (
    <Content>
      <ContentWrapper showAdvanceSearch={false}>
        <div>Số xe di chuyển: {noActiveTruck}</div>
        <div>Số xe đang trống: {activeTruck}</div>
        <div>Số thùng rác trống: {activeBin}</div>
        <div>Số thùng rác đã đầy: {noActiveBin}</div>
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
                {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
                <Marker
                  position={{
                    lat: parseFloat(items.location.split(',')[0]),
                    lng: parseFloat(items.location.split(',')[1]),
                  }}
                  onMouseOver={e => {
                    // setShowInfor(true);
                    console.log(e);
                    setIdSelected(items.recycleBinID);
                  }}
                  onClick={e => {
                    console.log(e);
                    // setShowInfor(true);
                  }}
                  icon={statusToIcon(items.recyclebinStatus)}
                />
                {idSelected === items.recycleBinID && (
                  <InfoWindow
                    position={{
                      lat: parseFloat(items.location.split(',')[0]),
                      lng: parseFloat(items.location.split(',')[1]),
                    }}
                    zIndex={1000}
                    onCloseClick={() => {
                      // setShowInfor(false);
                    }}
                  >
                    <div style={{ width: '200px' }}>
                      <div>Thùng rác: {items.name}</div>
                      <div>Tọa độ: {items.location}</div>
                      <div
                        style={{ color: statusToColor(items.recyclebinStatus) }}
                      >
                        Trạng thái: {statusToText(items.recyclebinStatus)}
                      </div>
                      {/* eslint-disable-next-line react/button-has-type */}
                      <button
                        style={{
                          height: '32px',
                          width: '80px',
                          borderRadius: '12px',
                        }}
                        onClick={() => {
                          calculateRoute(
                            '21.036891, 105.781659',
                            items.location,
                          );
                        }}
                      >
                        Chỉ đường
                      </button>
                    </div>
                  </InfoWindow>
                )}
              </>
            ))}
            {listTruck.map(items => (
              <>
                {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
                <Marker
                  position={{
                    lat: parseFloat(items.location.split(',')[0]),
                    lng: parseFloat(items.location.split(',')[1]),
                  }}
                  onMouseOver={e => {
                    console.log(e);
                    setShowInfor(true);
                    setIdSelected(items.garbageTruckID);
                  }}
                  onClick={e => {
                    console.log(e);
                    setShowInfor(true);
                  }}
                  icon={statusToIconTruck(items.status)}
                />
                {idSelected === items.garbageTruckID && (
                  <InfoWindow
                    position={{
                      lat: parseFloat(items.location.split(',')[0]),
                      lng: parseFloat(items.location.split(',')[1]),
                    }}
                    zIndex={1000}
                    onCloseClick={() => {
                      setShowInfor(false);
                    }}
                  >
                    <div style={{ width: '200px' }}>
                      <div>Tên xe: {items.name}</div>
                      <div>Tọa độ: {items.location}</div>
                      <div
                        style={{
                          color: items.status === 0 ? '#00FF00' : '#FFFF00',
                        }}
                      >
                        Trạng thái:{' '}
                        {items.status === 0 ? 'Đang chờ' : 'Đang đi đổ rác'}
                      </div>
                    </div>
                  </InfoWindow>
                )}
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
            {directionResponse &&
              directionResponse.map(item => (
                <DirectionsRenderer directions={item} />
              ))}
          </GoogleMap>
        )}
      </ContentWrapper>
    </Content>
  );
};
DashBoard.propTypes = {};
export default DashBoard;
