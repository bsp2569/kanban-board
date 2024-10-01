// src/components/KanbanBoard.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./KanbanBoard.module.css";
import Card from "../common/Card/Card";
import Dropdown from "../common/Dropdown/Dropdown";
import { getPriorityIcon, getStatusIcon } from "../common/constants";
import { CgProfile } from "react-icons/cg";

interface Ticket {
  id: string;
  title: string;
  tag: string[];
  userId: string;
  status: string;
  priority: number;
}

interface User {
  id: string;
  name: string;
  available: boolean;
  profileImage?: string;
}

const KanbanBoard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [grouping, setGrouping] = useState<"status" | "user" | "priority">(
    () =>
      (localStorage.getItem("grouping") as "status" | "user" | "priority") ||
      "status"
  );
  const [sorting, setSorting] = useState<string>("priority");

  useEffect(() => {
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem("sorting", sorting);
  }, [sorting]);

  const getPriorityLabel = (priority: number): string => {
    switch (priority) {
      case 4:
        return "Urgent";
      case 3:
        return "High";
      case 2:
        return "Medium";
      case 1:
        return "Low";
      case 0:
        return "No Priority";
      default:
        return "Unknown";
    }
  };

  const groupTickets = (tickets: Ticket[]) => {
    const groups: { [key: string]: Ticket[] } = {};

    tickets.forEach((ticket) => {
      let groupKey: string;
      if (grouping === "status") {
        groupKey = ticket.status;
      } else if (grouping === "user") {
        const user = users.find((u) => u.id === ticket.userId);
        groupKey = user ? user.name : "Unassigned";
      } else if (grouping === "priority") {
        groupKey = getPriorityLabel(ticket.priority);
      } else {
        groupKey = "Other";
      }
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(ticket);
    });
    return groups;
  };

  const sortTickets = (tickets: Ticket[]): Ticket[] => {
    return tickets?.slice()?.sort((a, b) => {
      if (sorting === "priority") {
        return b.priority - a.priority;
      } else if (sorting === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const returnColumnIcon = (value: any) => {
    switch (grouping) {
      case "status":
        return getStatusIcon(value);
      case "priority":
        return getPriorityIcon(value);
      case "user":
        return "cg/CgProfile";
    }
  };
  const groupedTickets = groupTickets(tickets);

  return (
    <div>
      <div className={styles.controlsContainer}>
        <Dropdown
          grouping={grouping}
          sorting={sorting}
          onGroupingChange={setGrouping}
          onSortingChange={setSorting}
        />
      </div>
      <div className={styles.columnsContainer}>
        {Object.entries(groupedTickets)?.map(([groupName, groupTickets]) => (
          <div className={styles.column} key={groupName}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                className="left"
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <img
                  src={returnColumnIcon(groupName)}
                  alt="groupName"
                  style={{ width: "20px", height: "20px" }}
                />
                <h3 className={styles.columnTitle}>{groupName}</h3>
                <div className={styles.ticketCount}>{groupTickets.length}</div>
              </div>
              <div className="right" style={{ display: "flex", gap: "4px" }}>
                <img className={styles.image} src="/add.svg" />
                <img className={styles.image} src="/3 dot menu.svg" />
              </div>
            </div>

            {sortTickets(groupTickets).map((ticket) => {
              const user = users.find((u) => u.id === ticket.userId);
              return (
                <Card
                  key={ticket.id}
                  id={ticket.id}
                  grouping={grouping}
                  title={ticket.title}
                  user={{
                    name: user?.name || "Unassigned",
                    available: user?.available || false,
                    profileImage: user?.profileImage,
                  }}
                  status={ticket.status}
                  priority={ticket.priority}
                  tags={ticket.tag}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
