import React from "react";
import styles from "./Avatar.module.css";
import { CgProfile } from "react-icons/cg";

interface AvatarProps {
  imageUrl?: string;
  altText: string;
  isOnline: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, altText, isOnline }) => {
  return (
    <div className={styles.avatarContainer}>
      {/* <img
        src={imageUrl || "/default-avatar.png"}
        // alt={altText}
        className={styles.avatar}
      /> */}
      <CgProfile className={styles.avatar} />
      <span
        className={`${styles.statusDot} ${
          isOnline ? styles.online : styles.offline
        }`}
      />
    </div>
  );
};

export default Avatar;
