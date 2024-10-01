import React from 'react';
import styles from './Tag.module.css';

interface TagProps {
  text?: string;
  children?: React.ReactNode;
}

const Tag: React.FC<TagProps> = ({ text, children }) => {
  return (
    <div className={styles.tag}>
      {children}
      {text && <span className={styles.tagText}>{text}</span>}
    </div>
  );
};

export default Tag;
