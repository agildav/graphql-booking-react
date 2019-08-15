import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import { IMainNavBarProps } from "./mainNavBar.model";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
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
  const { appState, switchRegisterLogin, logout } = props;

  const isAuth: boolean = appState.auth.token.length > 0;
  const classes = customStyles();

  return (
    <AppBar position="static" className={classes.root} id="MainNavBar">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography align="left" variant="h5" className={classes.title}>
          <NavLink to="/">gEvent</NavLink>
        </Typography>
        <nav>
          <ul className="main-navbar-items">
            {!isAuth && (
              <NavLink to="/auth">
                <CustomButton
                  onClick={switchRegisterLogin}
                  size="small"
                  type="button"
                  variant="contained"
                  color="primary"
                >
                  {appState.navigation.isAtLogin && "Register"}
                  {appState.navigation.isAtRegister && "Login"}
                </CustomButton>
              </NavLink>
            )}
            {isAuth && (
              <React.Fragment>
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

                <NavLink to="/auth">
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
              </React.Fragment>
            )}
            {/* <button onClick={() => console.log(appState)}></button> */}
          </ul>
        </nav>
      </Toolbar>
    </AppBar>
  );
}
