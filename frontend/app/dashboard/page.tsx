import AnalyticsChart from "@/components/AnalyticsChart";
import FileUpload from "@/components/FileUpload";
import SystemMonitoring from "@/components/SystemMonitoring";
import WorkspaceSwitcher from "@/components/WorkspaceSwitcher";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold">SynapseOS Dashboard</h1>

      <WorkspaceSwitcher />

      <div className="grid grid-cols-2 gap-4">
        <AnalyticsChart />
        <SystemMonitoring />
      </div>

      <FileUpload />
    </div>
  );
}