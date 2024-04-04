import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./CourierHeader.module.css";
import { MenuItem, Select } from "@mui/material";
import CourierProfile from "../CourierProfile/CourierProfile";
import { useNavigate } from "react-router";

const CourierHeader = ({
  setCourierData,
  courierData,
  pendingOrders,
  language,
  setLanguage,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.courierHeader}>
      <ul>
        <li>
          <Select
            className={styles.languageSelect}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            label="Language"
          >
            <MenuItem value="English">EN</MenuItem>
            <MenuItem value="Armenian">AM</MenuItem>
          </Select>
        </li>
        <li>
          <AccountCircleIcon style={{ fontSize: 30 }} onClick={handleClick} />
        </li>
        <li>
          <LogoutIcon
            style={{ fontSize: 30 }}
            onClick={() => navigate("/delivery-app/")}
          />
        </li>
      </ul>
      <CourierProfile
        courierData={courierData}
        setCourierData={setCourierData}
        pendingOrders={pendingOrders}
        handleClose={handleClose}
        open={open}
        language={language}
        anchorEl={anchorEl}
      />
    </div>
  );
};

export default CourierHeader;
