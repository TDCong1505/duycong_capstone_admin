import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { rootPath } from 'helpers/buildUrl';

const CmtDropdownMenu = ({ TriggerComponent, items, onItemClick, id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setMenuItems(items);
  }, [items]);

  const openMenu = event => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item, selectedIndex, event) => {
    // console.log('handle', item, id);
    event.stopPropagation();
    let updatedItem = { ...item };

    if (item.onClick && typeof item.onClick === 'function') {
      updatedItem = item.onClick(item);
    } else if (onItemClick && typeof onItemClick === 'function') {
      updatedItem = onItemClick(item);
    }

    if (updatedItem) {
      let hasChange = false;
      const newMenuItems = menuItems.map((item, index) => {
        if (selectedIndex === index) {
          hasChange = true;
          item = updatedItem;
        }
        return item;
      });

      if (hasChange) setMenuItems(newMenuItems);
    }

    closeMenu();
  };

  return (
    <React.Fragment>
      <div className="pointer">
        <TriggerComponent.type {...TriggerComponent.props} onClick={openMenu} />
      </div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        {menuItems.map((item, index) => {
          return (
            <MenuItem key={index} disabled={item.disabled} onClick={event => handleMenuItemClick({ ...item }, index, event)}>
              {item.icon}
              <div>{item.id === 'showBlog' && <Link to={`${rootPath.fjobNew}/show/${id}`}>{item.label}</Link>}</div>
              <div>{item.id === 'editBlog' && <Link to={`${rootPath.fjobNew}/edit/${id}`}>{item.label}</Link>}</div>
              <div>{item.id === 'showJob' && <Link to={`${rootPath.jobPost}/show/${id}`}>{item.label}</Link>}</div>
              <div>{item.id === 'editJob' && <Link to={`${rootPath.jobPost}/edit/${id}`}>{item.label}</Link>}</div>
              <div>
                {item.id === 'changeStatusJob' && <Link to={`${rootPath.jobPost}/changeStatus/${id}`}>{item.label}</Link>}
              </div>
              <div>{item.id === 'showUser' && <Link to={`${rootPath.user}/show/${id}`}>{item.label}</Link>}</div>
              <div>{item.id === 'editUser' && <Link to={`${rootPath.user}/edit/${id}`}>{item.label}</Link>}</div>
              <div>
                {item.id === 'showUserIdentification' && (
                  <Link to={`${rootPath.userIdentification}/show/${id}`}>{item.label}</Link>
                )}
              </div>
              <div>
                {item.id === 'editUserIdentification' && (
                  <Link to={`${rootPath.userIdentification}/edit/${id}`}>{item.label}</Link>
                )}
              </div>
              <div>{item.id === 'showUserRole' && <Link to={`${rootPath.fjobUserRole}/show/${id}`}>{item.label}</Link>}</div>
              <div>{item.id === 'editUserRole' && <Link to={`${rootPath.fjobUserRole}/edit/${id}`}>{item.label}</Link>}</div>
              <div>{item.id === 'deleteUserRole' && <Button style={{ border: 'none' }}>{item.label}</Button>}</div>

              <div>
                {item.id === 'showCategoryBlog' && <Link to={`${rootPath.fjobNewCategory}/show/${id}`}>{item.label}</Link>}
              </div>
              <div>
                {item.id === 'editCategoryBlog' && <Link to={`${rootPath.fjobNewCategory}/edit/${id}`}>{item.label}</Link>}
              </div>
              <div>{item.id === 'deleteCategoryBlog' && <Button style={{ border: 'none' }}>{item.label}</Button>}</div>

              <div>{item.id === 'showSetting' && <Link to={`${rootPath.fjobSetting}/show/${id}`}>{item.label}</Link>}</div>
              <div>{item.id === 'editSetting' && <Link to={`${rootPath.fjobSetting}/edit/${id}`}>{item.label}</Link>}</div>
              <div>{item.id === 'deleteSetting' && <Button style={{ border: 'none' }}>{item.label}</Button>}</div>

              <div>
                {item.id === 'showMailSupport' && <Link to={`${rootPath.fjobMailSupport}/show/${id}`}>{item.label}</Link>}
              </div>
              <div>
                {item.id === 'editMailSupport' && <Link to={`${rootPath.fjobMailSupport}/edit/${id}`}>{item.label}</Link>}
              </div>
            </MenuItem>
          );
        })}
      </Menu>
    </React.Fragment>
  );
};

CmtDropdownMenu.propTypes = {
  items: PropTypes.array.isRequired,
  TriggerComponent: PropTypes.element.isRequired,
  onItemClick: PropTypes.func,
};

export default CmtDropdownMenu;
