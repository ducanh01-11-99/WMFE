import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import Sidebar from '../../res/components/Sidebar';
import { COOKIES, PATH_LOGIN, STORAGE } from '../../utils/constants';
import iconMenuPartner from '../../images/menuPartner.svg';
import iconMenuProfile from '../../images/menuProfile.svg';
import iconMenuDashBoard from '../../images/menuDashboard.svg';
import iconMenu from '../../images/iconMenu.svg';
import Header from '../../res/components/Header';
import { getMsgClient } from '../../res/commonFunction';
const { Content } = Layout;

const LayoutLogged = ({
  /* path , */ component: Component,
  showSearch,
  placeholderSearch,
}) => {
  const MENU_DATA = [
    {
      // garage
      key: '1',
      path: '/garage',
      icon: iconMenuDashBoard,
      label: 'Quản lý Bãi đỗ xe',
    },
    // garbageTruck
    {
      key: '2',
      path: '/garbageTruck',
      icon: iconMenuPartner,
      label: 'Quản lý xe rác',
    },
    // notification
    {
      key: '3',
      path: '/notification',
      icon: iconMenuProfile,
      label: 'Quản lý thông báo',
    },
    // recycleBin
    {
      key: '4',
      path: '/RecycleBin',
      icon: iconMenuProfile,
      label: 'Quản lý Thùng rác',
    },
    {
      key: '5',
      path: '/User',
      icon: iconMenuProfile,
      label: 'Quản lý Tài khoản',
    },
  ];

  const history = useHistory();
  const PERMISSION_MENU = ['1', '2', '3', '4', '5'];
  const token = Cookies.get(COOKIES.accessTokenTest);
  const [menuExpand, setMenuExpand] = useState(true);
  const { pathname } = history.location;
  const [isShowSearch, setIsShowSearch] = useState(showSearch);
  const [openPopoverAccount, setOpenPopoverAccount] = useState(false);
  const [easyTextSearch, setEasyTextSearch] = useState('');
  const [objectId, setObjectId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    if (token) {
      if (!localStorage.getItem(STORAGE.expandMenu)) {
        setMenuExpand(true);
      } else {
        setMenuExpand(localStorage.getItem(STORAGE.expandMenu) === '1');
      }
    }
    setIsShowSearch(showSearch);
  }, [Component]);

  if (!token) return <Redirect to={PATH_LOGIN} />;

  const onClickMenu = () => {
    setMenuExpand(!menuExpand);
    localStorage.setItem(STORAGE.expandMenu, !menuExpand ? '1' : '0');
  };

  const onPressEnter = e => {
    setEasyTextSearch(e.target.value);
    setCategoryId(0);
    setObjectId(0);
  };

  const onSelectSearch = (value, option) => {
    if (option.categoryid !== 0 && option.objectid === 0) {
      setEasyTextSearch(option.text_search);
      setCategoryId(option.categoryid);
      setObjectId(option.categoryid);
    } else {
      setEasyTextSearch(getMsgClient(value || ''));
      setCategoryId(option.categoryid);
      setObjectId(option.objectid);
    }
  };

  // const permission = [1];

  return (
    <Route
      render={() => (
        <Layout style={{ height: '100vh' }}>
          <Header
            iconMenu={iconMenu}
            onClickMenu={onClickMenu}
            onClickLogo={() => history.push('/')}
            visible={openPopoverAccount}
            onVisibleChange={visible => setOpenPopoverAccount(visible)}
            showSearch={isShowSearch}
            placeholderSearch={placeholderSearch}
            onPressEnter={onPressEnter}
            onSelectSearch={onSelectSearch}
            onClickFilterBtn={() => setIsShowSearch(false)}
          />
          <Layout style={{ backgroundColor: 'white', height: '100%' }}>
            <Sidebar
              isExpand={menuExpand}
              minWidth="64px"
              maxWidth="270px"
              permissionArray={PERMISSION_MENU}
              dataMenu={MENU_DATA}
              pathname={pathname}
              onClickMenu={data => history.push(data.path)}
            />
            <Content>
              <Component
                textSearch={easyTextSearch}
                objectId={objectId}
                categoryId={categoryId}
                showAdvanceSearch={!isShowSearch}
                onCloseAdvanceSearch={() => setIsShowSearch(true)}
              />
            </Content>
          </Layout>
        </Layout>
      )}
    />
  );
};

LayoutLogged.propTypes = {
  component: PropTypes.node,
  showSearch: PropTypes.bool,
  placeholderSearch: PropTypes.string,
};

export default LayoutLogged;
