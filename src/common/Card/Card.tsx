import React from "react";
import styles from "./Card.module.css";
import Avatar from "./Avatar";
import Tag from "./Tag";
import { getPriorityIcon, getStatusIcon } from "../constants";

interface CardProps {
  id: string;
  title: string;
  grouping: "user" | "status" | "priority";
  user: {
    name: string;
    available: boolean;
    profileImage?: string;
  };
  status: string;
  priority: number;
  tags: string[];
}

const Card: React.FC<CardProps> = ({
  title,
  user,
  status,
  priority,
  tags,
  id,
  grouping,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.id}>{id}</span>
        {grouping !== "user" && (
          <Avatar name={user.name}
            imageUrl={user.profileImage}
            altText={user.name}
            isOnline={user.available}
          />
        )}
      </div>
      <div className={styles.middle}>
        {grouping !== "status" && (
          <img
            src={getStatusIcon(status)}
            alt="Status"
            className={styles.icon}
          />
        )}
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.tags}>
        {grouping !== "priority" && (
          <Tag>
            <img
              src={getPriorityIcon(priority)}
              alt="Priority"
              className={styles.icon}
            />
          </Tag>
        )}
        {tags.map((tag, index) => (
          <Tag key={index} text={tag} />
        ))}
      </div>
    </div>
  );
};

export default Card;
