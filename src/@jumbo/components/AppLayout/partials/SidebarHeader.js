import React, { useContext } from 'react';
import { MenuItem, MenuList, Paper, Popover, Typography } from '@material-ui/core';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useDispatch } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SidebarThemeContext from '../../../../@coremat/CmtLayouts/SidebarThemeContext/SidebarThemeContext';
import AuthService from 'services/auth/AuthService';
import { updateToken } from 'redux/actions/Auth';
import { setAuthUser } from 'redux/actions/Auth';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '30px 16px 12px 16px',
    borderBottom: props => `solid 1px ${props.sidebarTheme.borderColor}`,
  },
  userInfo: {
    paddingTop: 24,
    transition: 'all 0.1s ease',
    height: 75,
    opacity: 1,
    '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
      height: 0,
      paddingTop: 0,
      opacity: 0,
      transition: 'all 0.3s ease',
    },
  },
  userTitle: {
    color: props => props.sidebarTheme.textDarkColor,
    marginBottom: 8,
  },
  userSubTitle: {
    fontSize: 14,
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: 0.25,
  },
}));

const SidebarHeader = () => {
  const { sidebarTheme } = useContext(SidebarThemeContext);
  const classes = useStyles({ sidebarTheme });
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const onLogoutClick = async () => {
    const deviceId = JSON.parse(localStorage.getItem('user')).deviceId;
    const userCode = JSON.parse(localStorage.getItem('user')).userCode;
    handlePopoverClose();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenStaging');
    dispatch(updateToken());
    dispatch(setAuthUser(null));
    await AuthService.onLogout({
      deviceId,
      userCode,
    });
  };
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';
  return (
    <div className={classes.root}>
      <CmtAvatar
        src={
          'https://firebasestorage.googleapis.com/v0/b/web54-ecomerce.appspot.com/o/image%20-%201638521035353.jpeg?alt=media&token=c32aca79-0e78-4831-87e7-8537c30bd7cd'
        }
        alt="User Avatar"
      />
      <div className={classes.userInfo} onClick={handlePopoverOpen}>
        <div
          className="pointer"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <div className="mr-2">
            <Typography className={classes.userTitle} component="h3" variant="h6">
              {user.userName ? user.userName : null}
            </Typography>
            <Typography className={classes.userSubTitle}>{user.phoneNumber ? user.phoneNumber : null}</Typography>
          </div>
          <ArrowDropDownIcon />
        </div>
      </div>

      {open && (
        <Popover
          open={open}
          anchorEl={anchorEl}
          container={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}>
          <Paper elevation={8}>
            <MenuList>
              <MenuItem onClick={onLogoutClick}>
                <ExitToAppIcon />
                <div className="ml-2">Logout</div>
              </MenuItem>
            </MenuList>
          </Paper>
        </Popover>
      )}
    </div>
  );
};

export default SidebarHeader;
