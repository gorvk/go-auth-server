import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { logoutApi } from "../../svc/auth";
import userSlice from "../../state/slices/userSlice";
import { IUser } from "../../interfaces/models";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import loaderSlice from "../../state/slices/loaderSlice";

const AccountMenu = (props: {
  menuId: string;
  anchorEl: null | HTMLElement;
  setAnchorEl: (anchor: null | HTMLElement) => void;
}) => {
  const { menuId, anchorEl, setAnchorEl } = props;
  const isMenuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const setLoader = loaderSlice.actions.setLoader;
    try {
      dispatch(setLoader(true));
      const loginResponse = await logoutApi();
      if (loginResponse.isSuccess) {
        const setCurrentUser = userSlice.actions.setCurrentUser;
        dispatch(setCurrentUser({} as IUser));
        handleAccountMenuClose();
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const menus = [
    { label: "Logout", handler: handleLogout },
  ];

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleAccountMenuClose}
    >
      {menus.map((menu, index) => (
        <MenuItem onClick={menu.handler} key={index}>
          {menu.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default AccountMenu;
