"use client";

import { ActivityCalendar } from "react-activity-calendar";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { labels, explicitTheme } from "@/lib/activity-heatmap";

// Generate sample data for the last year
function generateSampleData() {
  const data = [];
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  while (oneYearAgo <= today) {
    // Randomly decide if this day should have activity
    if (Math.random() > 0.8) {
      data.push({
        date: oneYearAgo.toISOString().split("T")[0],
        count: Math.floor(Math.random() * 15) + 1,
        level: Math.floor(Math.random() * 4) + 1,
      });
    }
    oneYearAgo.setDate(oneYearAgo.getDate() + 1);
  }
  return data;
}

export default function ActivityHeatmap() {
  const data = generateSampleData();

  // Calculate streaks
  const calculateStreaks = (data: Array<{ date: string; count: number }>) => {
    let currentStreak = 0;
    let longestStreak = 0;
    let currentDate = new Date();

    // Sort data by date
    const sortedData = [...data].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    // Calculate current streak
    for (const entry of sortedData) {
      const entryDate = new Date(entry.date);
      const diffDays = Math.floor(
        (currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 0 || diffDays === currentStreak + 1) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        break;
      }
      currentDate = entryDate;
    }

    return { currentStreak, longestStreak };
  };

  const { currentStreak, longestStreak } = calculateStreaks(data);
  const { resolvedTheme: colorScheme } = useTheme();

  return (
    <Card className="p-6">
      <div className="flex gap-8 mb-4">
        <div>
          <h3 className="text-sm font-normal mb-1">Longest Streak</h3>
          <p className="text-3xl font-semibold">{longestStreak} days</p>
        </div>
        <div>
          <h3 className="text-sm font-normal mb-1">Current Streak</h3>
          <p className="text-3xl font-semibold">{currentStreak} days</p>
        </div>
      </div>
      <ActivityCalendar
        colorScheme={colorScheme === "dark" ? "dark" : "light"}
        data={data}
        theme={explicitTheme}
        labels={labels}
        showWeekdayLabels
      />
    </Card>
  );
}
