import React from "react";
import styles from "./UserFooter.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";

const UserFooter = () => {
  return (
    <div className={styles.userFooter}>
      <div className={styles.userFooterContainter}>
        <div>
          <h3>Delivery</h3>
          <ul>
            <li>
              Order Products Faster <br /> Easier
            </li>
          </ul>
        </div>
        <div>
          <h3>Our Company</h3>
          <ul>
            <li>Blog</li>
            <li>our Mission</li>
            <li>Get in Touch</li>
          </ul>
        </div>
        <div>
          <h3>Community</h3>
          <ul>
            <li>Support</li>
            <li>Questions</li>
            <li>Customer Help</li>
          </ul>
        </div>
        <div className={styles.userFooterLogos}>
          <span>
            <FacebookIcon />
          </span>
          <span>
            <XIcon />
          </span>
          <span>
            <InstagramIcon />
          </span>
        </div>
      </div>
      <p>© Vahag. All rights reserved</p>
    </div>
  );
};

export default UserFooter;
