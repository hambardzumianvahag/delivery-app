import React, { useState } from "react";
import styles from "./UserHeader.module.css";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router";
import LogoutIcon from "@mui/icons-material/Logout";
import UserProfile from "../UserProfile/UserProfile";

const UserHeader = ({ userData }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
    handleCloseMenu();
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.userHeader}>
      <div className={styles.headerContainer}>
        <div>
          <DeliveryDiningIcon
            className={styles.logo}
            style={{ fontSize: 50 }}
          />
        </div>
        <div>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>
              <div
                id="basic-button"
                aria-controls={openMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                onClick={handleClick}
                className={styles.menuItem}
              >
                <AccountCircleIcon />
              </div>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleOpenProfileModal}>My Profile</MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                  My Order's History
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    navigate("/delivery-app/");
                  }}
                >
                  <LogoutIcon
                    style={{ color: "#3b5998", marginRight: "10px" }}
                  />{" "}
                  <span> Logout</span>
                </MenuItem>
              </Menu>
            </li>
          </ul>
        </div>
      </div>
      <UserProfile
        userData={userData}
        isOpen={isProfileModalOpen}
        onClose={handleCloseProfileModal}
      />
    </div>
  );
};

export default UserHeader;
