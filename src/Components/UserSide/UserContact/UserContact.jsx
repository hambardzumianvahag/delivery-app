import React from "react";
import styles from "./UserContact.module.css";

const UserContact = ({ language }) => {
  return (
    <div className={styles.userContact} id="contactUs">
      <div>
        {language === "English" ? (
          <h1>
            Contact Us From <br /> Here
          </h1>
        ) : (
          <h1>
            Կապվեք մեզ հետ <br /> այստեղից
          </h1>
        )}
        {language === "English" ? (
          <p>
            You can contact us from here, you can write to us, <br /> call us or
            visit our service center, we will gladly <br /> assit you.
          </p>
        ) : (
          <p>
            Դուք կարող եք կապվել մեզ հետ այստեղից, կարող եք գրել մեզ, <br />{" "}
            զանգահարել կամ այցելեք մեր սպասարկման կենտրոն, մենք սիրով <br />{" "}
            կաջակցենք ձեզ:
          </p>
        )}
      </div>
      <div className={styles.userContactText}>
        <div>
          <p>
            <strong>
              {language === "English" ? "Telephone: " : "Հեռախոսահամար։ "}{" "}
            </strong>{" "}
            <span>999-888-777</span>
          </p>
          <p>
            <strong>
              {" "}
              {language === "English" ? "Email: " : "Էլ․փոստ։ "}{" "}
            </strong>{" "}
            <span>example@example.com</span>
          </p>
          <p>
            <strong>
              {" "}
              {language === "English" ? "Location: " : "Հասցե "}{" "}
            </strong>{" "}
            <span>Teryan St. 105</span>
          </p>
        </div>
        <div>
          <button>
            {language === "English" ? "Contact Us" : "Կապ մեզ հետ"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserContact;
