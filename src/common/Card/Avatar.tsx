import React from "react";
import styles from "./Avatar.module.css";
import { CgProfile } from "react-icons/cg";

interface AvatarProps {
  name: string;
  imageUrl?: string;
  altText: string;
  isOnline: boolean;

}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, altText, isOnline, name }) => {
  return (
    <div className={styles.avatarContainer}>

      <div
        style={{
          borderRadius: "50%",
          height: "100%",
          width: "100%",
          color: "white",
          backgroundColor: "#B06E0C",
          display: "flex",
          alignItems: "center",
          textTransform: "uppercase",
          justifyContent: "center",
          fontSize:"16px"
        }}
      >
        {name[0]}{name[1]}

      </div>

      <span
        className={`${styles.statusDot} ${isOnline ? styles.online : styles.offline}`}
      />
    </div>
  );
};

export default Avatar;
