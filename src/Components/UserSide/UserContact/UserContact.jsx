import React from "react";
import styles from "./UserContact.module.css";

const UserContact = () => {
  return (
    <div className={styles.userContact} id="contactUs">
      <div>
        <h1>
          Contact Us From <br /> Here
        </h1>
        <p>
          You can contact us from here, you can write to us, <br /> call us or
          visit our service center, we will gladly <br /> assit you.
        </p>
      </div>
      <div className={styles.userContactText}>
        <div>
          <p>
            <strong>Telephone: </strong> <span>999-888-777</span>
          </p>
          <p>
            <strong>Email: </strong> <span>example@example.com</span>
          </p>
          <p>
            <strong>Location: </strong> <span>Polytechnic</span>
          </p>
        </div>
        <div>
          <button>Contact Us</button>
        </div>
      </div>
    </div>
  );
};

export default UserContact;
