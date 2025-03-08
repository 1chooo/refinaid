import { ContentLayout } from "@/components/admin-panel/content-layout";
import ActivityHeatmap from "@/components/chart/activity-heatmap";

export default function StatsPage() {
  return (
    <ContentLayout title="Categories">
      <div className="p-4">
        <ActivityHeatmap />
      </div>
    </ContentLayout>
  );
}
