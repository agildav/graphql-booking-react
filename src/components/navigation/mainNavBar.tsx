import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import { IMainNavBarProps } from "./mainNavBar.model";
import { makeStyles } from "@material-ui/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem
} from "@material-ui/core";
import { CustomButton } from "../../shared/components/button.component";

import "./mainNavBar.scss";
const customStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {},
  title: {
    flexGrow: 1
  }
}));

export default function MainNavBar(props: IMainNavBarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const { appState, switchRegisterLogin, logout } = props;
  const { isAtLogin, isAtRegister } = appState.navigation;
  const isAuth: boolean = appState.auth.token.length > 0;

  const classes = customStyles();

  return (
    <AppBar position="static" className={classes.root} id="MainNavBar">
      <Toolbar>
        <IconButton
          id="NavbarMenuOpenButton"
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          aria-controls="NavbarMenu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          id="NavbarMenu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {isAuth && (
            <MenuItem onClick={handleClose}>
              <NavLink to="/events">
                <CustomButton
                  size="small"
                  type="button"
                  variant="text"
                  color="default"
                >
                  Events
                </CustomButton>
              </NavLink>
            </MenuItem>
          )}
          {isAuth && (
            <MenuItem onClick={handleClose}>
              <NavLink to="/bookings">
                <CustomButton
                  size="small"
                  type="button"
                  variant="text"
                  color="default"
                >
                  Bookings
                </CustomButton>
              </NavLink>
            </MenuItem>
          )}
          {isAuth && (
            <MenuItem onClick={handleClose}>
              <NavLink to="/auth">
                <CustomButton
                  onClick={logout}
                  size="small"
                  type="button"
                  variant="text"
                  color="default"
                >
                  Logout
                </CustomButton>
              </NavLink>
            </MenuItem>
          )}

          {!isAuth && (
            <MenuItem onClick={handleClose}>
              <NavLink to="/auth">
                <CustomButton
                  onClick={switchRegisterLogin}
                  size="small"
                  type="button"
                  variant="text"
                  color="default"
                >
                  {isAtLogin && "Register"}
                  {isAtRegister && "Login"}
                </CustomButton>
              </NavLink>
            </MenuItem>
          )}
        </Menu>

        <Typography align="left" variant="h5" className={classes.title}>
          <NavLink to="/">gEvent</NavLink>
        </Typography>
        <nav className="main-navbar-wrapper">
          <ul className="main-navbar-items">
            {!isAuth && (
              <NavLink className="auth" to="/auth">
                <CustomButton
                  onClick={switchRegisterLogin}
                  size="small"
                  type="button"
                  variant="contained"
                  color="primary"
                >
                  {isAtLogin && "Register"}
                  {isAtRegister && "Login"}
                </CustomButton>
              </NavLink>
            )}

            {isAuth && (
              <NavLink to="/events">
                <CustomButton
                  size="small"
                  type="button"
                  variant="contained"
                  color="primary"
                >
                  Events
                </CustomButton>
              </NavLink>
            )}
            {isAuth && (
              <NavLink to="/bookings">
                <CustomButton
                  size="small"
                  type="button"
                  variant="contained"
                  color="primary"
                >
                  Bookings
                </CustomButton>
              </NavLink>
            )}
            {isAuth && (
              <NavLink className="auth" to="/auth">
                <CustomButton
                  onClick={logout}
                  size="small"
                  type="button"
                  variant="contained"
                  color="primary"
                >
                  Logout
                </CustomButton>
              </NavLink>
            )}
          </ul>
        </nav>
      </Toolbar>
    </AppBar>
  );
}
