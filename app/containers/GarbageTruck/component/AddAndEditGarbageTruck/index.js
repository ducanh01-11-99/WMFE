import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Radio } from 'antd';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { FormCustom } from './style';
import { useInjectReducer } from '../../../../utils/injectReducer';
import { useInjectSaga } from '../../../../utils/injectSaga';
import * as actions from '../../actions';
import CustomModal from '../../../../res/components/CustomModal';
import FloatingLabel from '../../../../res/components/FloatingLabel/Input';
import { RadioGroup } from '../../../../res/components/CopyPageSignModal/styled';
import reducer from '../../reducer';
import saga from '../../saga';
import { REDUX_KEY } from '../../../../utils/constants';
import Notice from '../../../../res/components/Notice';
import SelectFloat from '../../../../res/components/FloatingLabel/SelectFloat';

const key = REDUX_KEY.garage;
const AddAndEditGarage = ({ data, visible, onClose, refreshT }) => {
  console.log(data);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const clearForm = () => {
    form.resetFields();
  };

  useEffect(() => {
    if (JSON.stringify(data) !== '{}') {
      const body = {
        garbageTruckID: data.garbageTruckID,
        lon: data.location.toString().split(',')[0],
        lat: data.location.toString().split(',')[1],
        status: data.status,
        garageID: data.garageID,
      };
      form.setFieldsValue(body);
    }
  }, [data]);

  const onSubmit = () => {
    form.validateFields().then(async value => {
      const body = {
        garbageTruckID: value.name,
        location: `${value.lon},${value.lat}`,
      };
      if (JSON.stringify(data) !== '{}') {
        dispatch(actions.addGarbageTruck(body));
      } else {
        const res = await axios.put(
          `https://localhost:7145/api/v1/Garage/${data.garbageTruckID}`,
          { garageID: data.garageID, location: `${value.lon},${value.lat}` },
        );
        if (res.data === 1) {
          refreshT();
          onClose();
        } else {
          Notice({
            msg: 'Đã có lỗi xả ra. Bạn vui lòng thử lại',
            isSuccess: false,
          });
        }
      }
    });
    refreshT();
    onClose();
  };
  const fakeData = [
    { label: 'TR1', value: 1 },
    { label: 'TR2', value: 2 },
    { label: 'TR3', value: 3 },
    { label: 'TR4', value: 4 },
  ];

  // eslint-disable-next-line no-unused-vars
  const [selectedID, setSelectedID] = useState(1);

  return (
    <CustomModal
      title={JSON.stringify(data) === '{}' ? 'Thêm xe' : 'Sửa thông tin xe'}
      width={850}
      visible={visible}
      onClickCancel={() => {
        onClose();
        clearForm();
      }}
      onSave={() => {
        onSubmit();
      }}
    >
      <FormCustom form={form}>
        <Form.Item name="garbageTruckID">
          <FloatingLabel label="Tên Bãi đỗ xe" isRequired disabled />
        </Form.Item>
        {/* <div>Vị trí</div> */}
        <Row gutter={18}>
          <Col span={12}>
            <Form.Item name="lon">
              <FloatingLabel label="Kinh độ" isRequired />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="lat">
              <FloatingLabel label="Vĩ độ" isRequired />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item>
              <SelectFloat
                label="Chọn bãi xe"
                dataSelect={fakeData}
                onChangeSelect={value => {
                  setSelectedID(value);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={12}>
            <Form.Item name="garageID">
              <FloatingLabel label="Mã bãi đỗ xe" isRequired />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="status">
          <RadioGroup defaultValue={0}>
            <Radio value={1}>Admin</Radio>
            <Radio value={0}>Quản lý</Radio>
          </RadioGroup>
        </Form.Item>
      </FormCustom>
    </CustomModal>
  );
};

AddAndEditGarage.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func,
  visible: PropTypes.bool,
  refreshT: PropTypes.func,
};

export default AddAndEditGarage;
