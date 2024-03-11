import React, { useState } from "react";
import styles from "./UserHeader.module.css";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router";
import LogoutIcon from "@mui/icons-material/Logout";
import UserProfile from "../UserProfile/UserProfile";
import MenuIcon from "@mui/icons-material/Menu";
import UserOrderHistory from "../UserOrderHistory/UserOrderHistory";

const UserHeader = ({ userData, setUserData }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isOrderHistoryModalOpen, setIsOrderHistoryModalOpen] = useState(false);
  const [burgerMenuAnchorEl, setBurgerMenuAnchorEl] = useState(null);
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
    setAccountMenuAnchorEl(null);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleOpenOrderHistoryModal = () => {
    setIsOrderHistoryModalOpen(true);
    setAccountMenuAnchorEl(null);
  };

  const handleCloseOrderHistoryModal = () => {
    setIsOrderHistoryModalOpen(false);
  };

  const handleBurgerMenuClick = (event) => {
    setBurgerMenuAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClick = (event) => {
    setAccountMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenus = () => {
    setBurgerMenuAnchorEl(null);
    setAccountMenuAnchorEl(null);
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAboutUsClick = () => {
    const aboutUsSection = document.getElementById("aboutUs");
    aboutUsSection.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactUsClick = () => {
    const contactUsSection = document.getElementById("contactUs");
    contactUsSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.userHeader}>
      <div className={styles.headerContainer}>
        <div>
          <DeliveryDiningIcon
            onClick={handleHomeClick}
            className={styles.logo}
            style={{ fontSize: 50, color: "#FDC72D" }}
          />
        </div>
        <div>
          <ul>
            <li>
              <div
                id="basic-button"
                aria-controls={burgerMenuAnchorEl ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={burgerMenuAnchorEl ? "true" : undefined}
                className={styles.burgerMenu}
                onClick={handleBurgerMenuClick}
              >
                <MenuIcon style={{ color: "#FDC72D" }} />
              </div>
              <Menu
                id="basic-menu"
                anchorEl={burgerMenuAnchorEl}
                open={Boolean(burgerMenuAnchorEl)}
                onClose={handleCloseMenus}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleHomeClick}>Home</MenuItem>
                <MenuItem onClick={handleAboutUsClick}>About Us</MenuItem>
                <MenuItem onClick={handleContactUsClick}>Contact</MenuItem>
              </Menu>
            </li>

            <li className={styles.menuList} onClick={handleHomeClick}>
              Home
            </li>
            <li className={styles.menuList} onClick={handleAboutUsClick}>
              About Us
            </li>
            <li className={styles.menuList} onClick={handleContactUsClick}>
              Contact
            </li>
            <li>
              <div
                id="basic-button"
                aria-controls={accountMenuAnchorEl ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={accountMenuAnchorEl ? "true" : undefined}
                onClick={handleAccountMenuClick}
                className={styles.menuItem}
              >
                <AccountCircleIcon style={{ color: "#FDC72D" }} />
              </div>
              <Menu
                id="basic-menu"
                anchorEl={accountMenuAnchorEl}
                open={Boolean(accountMenuAnchorEl)}
                onClose={handleCloseMenus}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleOpenProfileModal}>My Profile</MenuItem>
                <MenuItem onClick={handleOpenOrderHistoryModal}>
                  My Order's History
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseMenus();
                    navigate("/delivery-app/");
                  }}
                >
                  <LogoutIcon
                    style={{ color: "#FDC72D", marginRight: "10px" }}
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
        setUserData={setUserData}
      />
      <UserOrderHistory
      setUserData={setUserData}
        userData={userData}
        isOpen={isOrderHistoryModalOpen}
        onClose={handleCloseOrderHistoryModal}
      />
    </div>
  );
};

export default UserHeader;
