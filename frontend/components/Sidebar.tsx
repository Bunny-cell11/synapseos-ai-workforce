"use client";

import {
  LayoutDashboard,
  Bot,
  BarChart3,
  Server,
  Settings
} from "lucide-react";

export default function Sidebar() {

  const items = [
    {
      icon: LayoutDashboard,
      label: "Dashboard"
    },
    {
      icon: Bot,
      label: "AI Agents"
    },
    {
      icon: BarChart3,
      label: "Analytics"
    },
    {
      icon: Server,
      label: "Infrastructure"
    },
    {
      icon: Settings,
      label: "Settings"
    }
  ];

  return (
    <aside className="w-72 min-h-screen bg-zinc-950 border-r border-zinc-800 p-6">

      <h1 className="text-3xl font-bold mb-10">
        SynapseOS
      </h1>

      <div className="space-y-3">

        {items.map((item) => {

          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-900 transition-all cursor-pointer"
            >
              <Icon size={20} />

              <span>
                {item.label}
              </span>
            </div>
          );
        })}

      </div>

    </aside>
  );
}
