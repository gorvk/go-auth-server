import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { logoutApi } from "../../svc/auth";
import userSlice from "../../state/slices/userSlice";
import { IUser } from "../../interfaces/models";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    try {
      const loginResponse = await logoutApi();
      if (loginResponse.isSuccess) {
        const setCurrentUser = userSlice.actions.setCurrentUser;
        handleAccountMenuClose();
        dispatch(setCurrentUser({} as IUser));
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handleMyAccount() {
    console.error(Error("Function not implemented."));
    handleAccountMenuClose();
  }

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
