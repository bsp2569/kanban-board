import React, { useState, useEffect, useRef } from "react";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  grouping: string;
  sorting: string;
  onGroupingChange: (value: any) => void;
  onSortingChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  grouping,
  sorting,
  onGroupingChange,
  onSortingChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button className={styles.dropdownToggle} onClick={toggleDropdown}>
        <img src="/Display.svg" alt="Display icon" className={styles.icon} />
        <span>Display</span>
        <img
          src="/down.svg"
          alt="Dropdown icon"
          className={`${styles.icon} ${isOpen ? styles.inverted : ""}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.dropdownItem}>
            <span className={styles.dropdownLabel}>Grouping</span>
            <select
              className={styles.dropdownSelect}
              value={grouping}
              onChange={(e) => onGroupingChange(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="priority">Priority</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className={styles.dropdownItem}>
            <span className={styles.dropdownLabel}>Ordering</span>
            <select
              className={styles.dropdownSelect}
              value={sorting}
              onChange={(e) => onSortingChange(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
