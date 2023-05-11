import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ContainerLoading, Icon } from './style';
import { useInjectReducer } from '../../../../utils/injectReducer';
import { useInjectSaga } from '../../../../utils/injectSaga';
import * as actions from '../../actions';
import CustomModal from '../../../../res/components/CustomModal';
import reducer from '../../reducer';
import saga from '../../saga';
import { REDUX_KEY } from '../../../../utils/constants';
import iconAlert from '../../../../images/icon/iconAlert.svg';

const key = REDUX_KEY.garage;
const DeleteGarage = ({ data, visible, onClose }) => {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const onSubmit = () => {
    dispatch(actions.deleteGarage(data));
  };

  return (
    <CustomModal
      title="Xóa Bãi đỗ xe"
      width={550}
      visible={visible}
      onClickCancel={() => {
        onClose();
      }}
      onSave={() => {
        onSubmit();
        onClose();
      }}
    >
      <ContainerLoading style={{ paddingTop: 35 }}>
        <Icon src={iconAlert} alt="" />
        <div>Bạn có muốn xóa Bãi để xe: + {data}</div>
      </ContainerLoading>
    </CustomModal>
  );
};

DeleteGarage.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func,
  visible: PropTypes.bool,
};

export default DeleteGarage;
