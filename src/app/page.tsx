import DashboardStats from "@/components/DashboardStats";
import VehicleInService from "@/components/VehicleInService";
import ServicesLog from "@/components/ServicesLog";
import HistoryTimeline from "@/components/HistoryTimeline";
import Checklist from "@/components/Checklist";

export default function Home() {
  return (
    <div className="flex gap-6 h-full">
      {/* Left Column */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardStats />
        <VehicleInService />
        <ServicesLog />
      </div>

      {/* Right Column */}
      <div className="w-80 xl:w-96 flex flex-col gap-6 shrink-0 h-full">
        <div className="flex-1 min-h-[300px]">
          <HistoryTimeline />
        </div>
        <div className="flex-1 min-h-[400px]">
          <Checklist />
        </div>
      </div>
    </div>
  );
}
