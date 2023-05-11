import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from './reducer';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import * as actions from './actions';
import * as selectors from './selector';
import BoldItaly from '../../res/components/TableOtherView/BoldItaly';
import TableFunction from '../../res/components/TableOtherView/TableFunction';
import {
  AdvanceSearchWrapper,
  CloseAdvanceView,
  Content,
  ContentAdvanceView,
  ContentHeader,
  ContentTitle,
  ContentWrapper,
  HeaderAdvanceView,
  HeaderLeft,
  HeaderRight,
  TitleAdvance,
} from '../../res/commonStyles';
import Button from '../../res/components/Button';
import Table from '../../res/components/Table';
import advanceIcon from '../../images/iconAdvance.svg';
import refreshAdvanceIcon from '../../images/iconRefeshAdvance.svg';
import closeAdvanceIcon from '../../images/iconCloseAdvance.svg';
import AddAndEditRecycleBin from './component/AddAndEditRecycleBin';
import DeleteRecycleBin from './component/DeleteRecycleBin';
import { REDUX_KEY } from '../../utils/constants';

const key = REDUX_KEY.recycleBin;

const RecycleBin = ({ showAdvanceSearch, onCloseAdvanceSearch }) => {
  const [showAddAndEdit, setShowAddAndEdit] = useState(false);
  const [idRecycleBinSelected, setRecycleBinSelected] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showInformation, setShowInformation] = useState(false);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getListRecycleBin({}));
  }, []);
  const onClickRow = data => {
    console.log('data', data);
    setRecycleBinSelected(data.RecycleBinID);
    setShowInformation(true);
  };
  const listPartner = useSelector(selectors.selectRecycleBin());
  const TABLE_ACCOUNT = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: '50px',
      align: 'center',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Mã Bãi đỗ xe',
      dataIndex: 'RecycleBinID',
      key: 'RecycleBinID',
      width: '400px',
    },
    {
      title: 'Tọa độ',
      dataIndex: 'code',
      key: 'code',
      render: (text, record) => (
        <BoldItaly
          name1={record.location.toString().split(',')[0]}
          name2={record.location.toString().split(',')[1]}
        />
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'RecycleBinID',
      width: '400px',
      render: (text, record) => (
        <TableFunction
          type="normal"
          text={text}
          record={record}
          titleEdit="Sửa Bãi đỗ xe"
          onClickEdit={() => {
            setShowAddAndEdit(true);
            setRecycleBinSelected(record.RecycleBinID);
          }}
          titleDelete="Xóa Bãi đõ xe"
          onClickDelete={() => {
            setShowDelete(true);
            setRecycleBinSelected(record.RecycleBinID);
          }}
        />
      ),
    },
  ];
  const handleCloseAdvanceSearch = () => {
    onCloseAdvanceSearch();
  };
  return (
    <Content>
      <ContentWrapper showAdvanceSearch={showAdvanceSearch}>
        <ContentHeader>
          <HeaderLeft>
            <ContentTitle>
              Danh sách Bãi để xe: {listPartner ? listPartner.length : 0}
            </ContentTitle>
          </HeaderLeft>
          <HeaderRight>
            <Button
              iconName="add"
              type="primary"
              onClick={() => {
                setShowAddAndEdit(true);
                setRecycleBinSelected('');
              }}
            >
              Thêm mới
            </Button>
          </HeaderRight>
        </ContentHeader>
        <Table
          columns={TABLE_ACCOUNT}
          data={listPartner}
          minWidth={1100}
          isLoading={false}
          disableClickRowExpand
          onClickRow={onClickRow}
        />
      </ContentWrapper>
      {showAdvanceSearch && (
        <AdvanceSearchWrapper>
          <HeaderAdvanceView>
            <img alt="" src={advanceIcon} />
            <TitleAdvance>Lọc nâng cao</TitleAdvance>
            <Tooltip title="Đặt lại">
              <img
                style={{ cursor: 'pointer', marginLeft: '5px' }}
                alt=""
                src={refreshAdvanceIcon}
              />
            </Tooltip>
            <CloseAdvanceView>
              <Tooltip title="Đóng" onClick={handleCloseAdvanceSearch}>
                <img
                  style={{ cursor: 'pointer' }}
                  alt=""
                  src={closeAdvanceIcon}
                />
              </Tooltip>
            </CloseAdvanceView>
          </HeaderAdvanceView>
          <ContentAdvanceView />
        </AdvanceSearchWrapper>
      )}
      <AddAndEditRecycleBin
        visible={showAddAndEdit}
        onClose={() => {
          setShowAddAndEdit(false);
        }}
        data={idRecycleBinSelected}
      />

      <DeleteRecycleBin
        onClose={() => {
          setShowDelete(false);
        }}
        data={idRecycleBinSelected}
        visible={showDelete}
      />
    </Content>
  );
};
RecycleBin.propTypes = {
  showAdvanceSearch: PropTypes.bool,
  onCloseAdvanceSearch: PropTypes.func,
};
export default RecycleBin;
