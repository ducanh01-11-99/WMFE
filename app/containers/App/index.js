/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../res/theme/defaultTheme';
import LayoutNotLogin from '../../layout/LayoutNotLogin';
import LayoutLogged from '../../layout/LayoutLogged';

import {
  PATH_LOGIN,
  PATH_ROOT,
  PATH_PARTNER,
  PATH_HOMEPAGE,
} from '../../utils/constants';
import Login from '../Login/LoadableLogin';
import ErrorPage from '../../res/components/ErrorPage';
import Partner from '../Partner/LoadablePartner';
import Homepage from '../HomePage/Loadable';

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <Switch>
          <LayoutNotLogin exact path={PATH_ROOT} component={Homepage} />
          <LayoutNotLogin exact path={PATH_LOGIN} component={Login} />
          <LayoutNotLogin exact path={PATH_HOMEPAGE} component={Homepage} />
          <LayoutLogged path={PATH_PARTNER} component={Partner} />
          <Route path="" render={() => <ErrorPage code="404" />} />
        </Switch>
      </>
    </ThemeProvider>
  );
}
