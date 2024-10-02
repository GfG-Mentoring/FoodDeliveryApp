import React from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slices/auth.slice';

type Props = { children: React.ReactNode };

const UserDropdown = (props: Props) => {
  const authData = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>{props.children}</DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{authData.email}</p>
        </DropdownItem>
        {/* <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
        <DropdownItem key="logout" color="danger" onPress={logout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
