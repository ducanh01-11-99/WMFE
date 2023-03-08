import styled from 'styled-components';
import {
  STATUS_COMPLETE,
  STATUS_DELETED,
  STATUS_NEW_CREATE,
  STATUS_REFUSE_APPROVE,
  STATUS_REFUSE_SIGN,
  STATUS_WAIT_APPROVE,
  STATUS_WAIT_SIGN,
} from '../../../../containers/Profile/constantsProfile';

export const StatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  //margin-left: -35px;
  //overflow: unset !important;
`;

export const StatusLabel = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  color: ${props => (props.active ? props.theme.colors.status.active : props.theme.colors.status.inActive)};
`;

export const StatusProfile = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  ${props => props.status === STATUS_NEW_CREATE && `color: ${props.theme.colors.status.newCreate};`}
  ${props => props.status === STATUS_WAIT_SIGN && `color: ${props.theme.colors.status.waitSign};`}
  ${props => props.status === STATUS_REFUSE_SIGN && `color: ${props.theme.colors.status.refuseSign};`}
  ${props => props.status === STATUS_DELETED && `color: ${props.theme.colors.status.deleted};`}
  ${props => props.status === STATUS_COMPLETE && `color: ${props.theme.colors.status.complete};`}
  ${props => props.status === STATUS_WAIT_APPROVE && `color: ${props.theme.colors.status.waitApprove};`}
  ${props => props.status === STATUS_REFUSE_APPROVE && `color: ${props.theme.colors.status.refuseApprove};`}
`;
