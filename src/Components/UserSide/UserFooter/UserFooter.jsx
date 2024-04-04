import React from "react";
import styles from "./UserFooter.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";

const UserFooter = ({ language }) => {
  return (
    <div className={styles.userFooter}>
      <div className={styles.userFooterContainter}>
        <div>
          <h3>{language === "English" ? "Delivery" : "Առաքում"}</h3>
          <ul>
            {language === "English" ? (
              <li>
                Order Products Faster <br /> Easier
              </li>
            ) : (
              <li>
                Պատվիրեք ապրանքներ ավելի արագ <br /> Ավելի հեշտ
              </li>
            )}
          </ul>
        </div>
        <div>
          <h3>
            {language === "English" ? "Our Company" : "Մեր Ընկերությունը"}
          </h3>
          <ul>
            <li>{language === "English" ? "Blog" : "Բլոգ"}</li>
            <li>
              {language === "English" ? "our Mission" : "մեր առաքելությունը"}
            </li>
            <li>{language === "English" ? "Get in Touch" : "Կապվեք"}</li>
          </ul>
        </div>
        <div>
          <h3>{language === "English" ? "Community" : "Համայնք"}</h3>
          <ul>
            <li>{language === "English" ? "Support" : "Աջակցություն"}</li>
            <li>{language === "English" ? "Questions" : "Հարցեր"}</li>
            <li>
              {language === "English"
                ? "Customer Help"
                : "Հաճախորդների օգնություն"}
            </li>
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
