import React from "react";
import styles from "./UserAbout.module.css";
import userAboutFirst from "../../../images/userAboutFirst.png";
import userAboutSecond from "../../../images/userAboutSecond.png";

const UserAbout = ({ language }) => {
  return (
    <div id="aboutUs" style={{ width: "90%", margin: "0 auto" }}>
      <div className={styles.aboutUsFirstSection}>
        <div>
          <img src={userAboutFirst} alt="" />
        </div>
        <div className={styles.aboutUsFirstText}>
          {language === "English" ? (
            <h1>
              Find Out A Little More <br /> About Us
            </h1>
          ) : (
            <h1>
              Իմացեք փոքր ինչ ավելին <br /> Մեր մասին
            </h1>
          )}
          {language === "English" ? (
            <p>
              We are a company dedicated to the distribution of <br /> products
              by delivery to your home or to the place <br /> where you are,
              with the best quality of dellivery
            </p>
          ) : (
            <p>
              Մենք ընկերություն ենք, որը նվիրված է <br /> ապրանքների առաքմամբ
              ձեր տուն կամ այնտեղ <br /> որտեղ դուք գտնվում եք, առաքման
              լավագույն որակով
            </p>
          )}
        </div>
      </div>
      <div className={styles.aboutUsSecondSection}>
        <div className={styles.aboutUsSecondText}>
          {language === "English" ? (
            <h1>
              Your Safety Is <br /> Important
            </h1>
          ) : (
            <h1>
              Կարևորը ձեր <br />
              անվտանգությունն է
            </h1>
          )}
          {language === "English" ? (
            <p>
              When your order reaches you, we have the health <br /> safety
              protocols, so that you are protected from <br /> any disease.
              Watch the video of how the delivery <br /> is made.
            </p>
          ) : (
            <p>
              Երբ ձեր պատվերը հասնում է ձեզ, մենք ունենք առողջապահական <br />{" "}
              անվտանգություն արձանագրություններ, որպեսզի դուք պաշտպանված լինեք{" "}
              <br /> ցանկացած հիվանդությունից: Դիտեք տեսանյութը, թե ինչպես է
              կատարվում առաքումը <br />:
            </p>
          )}
        </div>
        <div>
          <img src={userAboutSecond} alt="" />
        </div>
      </div>
    </div>
  );
};

export default UserAbout;
