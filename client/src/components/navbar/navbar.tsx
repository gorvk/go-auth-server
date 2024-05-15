import { MouseEvent, useState } from "react";
import { SxProps, Theme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SideDrawer from "./drawerList";
import AccountMenu from "./accountMenu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

export function Navbar() {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const appBarSxProps: SxProps<Theme> = {
    backgroundColor: "white",
    boxShadow: "0px 0px 0px 1px rgb(140 140 140/.2)",
    color: "black",
  };

  const titleTypographySxProps: SxProps<Theme> = {
    display: { xs: "none", sm: "block" },
  };

  const titleLinkStyleProps: React.CSSProperties = {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
  };

  const seperatorBoxSxProps: SxProps<Theme> = {
    flexGrow: 1,
    textAlign: "right",
    paddingRight: "20px"
  };

  return (
    <Box>
      <AppBar position="static" sx={appBarSxProps}>
        <Toolbar>
          <SideDrawer></SideDrawer>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={titleTypographySxProps}
          >
            <Link style={titleLinkStyleProps} to={"/"}>
              AUTH SERVER FROM SCRATCH USING REACT, GO AND PSQL
            </Link>
          </Typography>
          <Box sx={seperatorBoxSxProps}>{currentUser?.firstname && `Hi, ${currentUser?.firstname}` }</Box>
          {currentUser?.id !== undefined && (
            <Box display="flex">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <AccountMenu
        anchorEl={anchorEl}
        menuId={menuId}
        setAnchorEl={setAnchorEl}
      ></AccountMenu>
    </Box>
  );
}
