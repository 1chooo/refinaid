import type { ThemeInput } from "react-activity-calendar";

export const labels = {
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  weekdays: [
    "Sun", // Sunday first!
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ],
  totalCount: "{{count}} activities in {{year}}",
  legend: {
    less: "Less",
    more: "More",
  },
};

export const explicitTheme: ThemeInput = {
  light: ["#ebedf0", "#8ea9fa"],
  dark: ["#161b22", "#8ea9fa"],
};
