export const getPriorityIcon = (priority: number | string): string => {
  switch (priority) {
    case 4:
    case "Urgent":
      return "/SVG - Urgent Priority colour.svg";
    case 3:
    case "High":
      return "/Img - High Priority.svg";
    case 2:
    case "Medium":
      return "/Img - Medium Priority.svg";
    case 1:
    case "Low":
      return "/Img - Low Priority.svg";
    default:
      return "/No-priority.svg";
  }
};

export const getStatusIcon = (status: string): string => {
  switch (status.toLowerCase()) {
    case "in progress":
      return "/in-progress.svg";
    case "done":
      return "/Done.svg";
    case "backlog":
      return "/Backlog.svg";
    case "canceled":
      return "/Canceled.svg";
    default:
      return "/To-do.svg";
  }
};
