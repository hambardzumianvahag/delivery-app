import React from "react";
import styles from "./UserAbout.module.css";
import userAboutFirst from "../../../images/userAboutFirst.png";
import userAboutSecond from "../../../images/userAboutSecond.png";

const UserAbout = () => {
  return (
    <div id="aboutUs" style={{ width: "90%", margin: "0 auto" }}>
      <div className={styles.aboutUsFirstSection}>
        <div>
          <img src={userAboutFirst} alt="" />
        </div>
        <div className={styles.aboutUsFirstText}>
          <h1>
            Find Out A Little More <br /> About Us
          </h1>
          <p>
            We are a company dedicated to the distribution of <br /> products by
            delivery to your home or to the place <br /> where you are, with the
            best quality of dellivery
          </p>
        </div>
      </div>
      <div className={styles.aboutUsSecondSection}>
        <div className={styles.aboutUsSecondText}>
          <h1>
            Your Safety Is <br /> Important
          </h1>
          <p>
            When your order reaches you, we have the health <br /> safety
            protocols, so that you are protected from <br /> any disease. Watch
            the video of how the delivery <br /> is made.
          </p>
        </div>
        <div>
          <img src={userAboutSecond} alt="" />
        </div>
      </div>
    </div>
  );
};

export default UserAbout;
