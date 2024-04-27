import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import CourierProfileModal from "../CourierProfileModal/CourierProfileModal";
import CourierOrdersHistory from "../CourierOrdersHistory/CourierOrdersHistory";

const CourierProfile = ({
  anchorEl,
  handleClose,
  open,
  language,
  courierData,
  setCourierData,
  courierOrders,
}) => {
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openOrdersModal, setOpenOrdersModal] = useState(false);
  const handleOpenOrdersModal = () => setOpenOrdersModal(true);
  const handleCloseOrdersModal = () => setOpenOrdersModal(false);
  const handleOpenProfileModal = () => setOpenProfileModal(true);
  const handleCloseProfileModal = () => setOpenProfileModal(false);

  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleOpenProfileModal();
          }}
        >
          {language === "English" ? "Profile" : "Տվյալներ"}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleOpenOrdersModal();
          }}
        >
          {language === "English" ? "Orders History" : "Պատվերների պատմություն"}
        </MenuItem>
      </Menu>
      <CourierProfileModal
        openModal={openProfileModal}
        onClose={handleCloseProfileModal}
        courierData={courierData}
        setCourierData={setCourierData}
        language={language}
      />
      <CourierOrdersHistory
        openModal={openOrdersModal}
        onClose={handleCloseOrdersModal}
        language={language}
        courierOrders={courierOrders}
      />
    </div>
  );
};

export default CourierProfile;
