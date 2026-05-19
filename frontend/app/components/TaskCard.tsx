"use client";

import { motion } from "framer-motion";

interface Task {
  id: number;
  title: string;
  assigned_agent: string;
  status: string;
}

export default function TaskCard({ task }: { task: Task }) {

  const statusColor =
    task.status === "Completed"
      ? "text-green-400"
      : task.status === "In Progress"
      ? "text-yellow-400"
      : "text-gray-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl"
    >
      <div className="flex justify-between items-center">

        <h2 className="text-xl font-semibold">
          {task.title}
        </h2>

        <span className={statusColor}>
          {task.status}
        </span>

      </div>

      <p className="text-zinc-400 mt-3">
        {task.assigned_agent}
      </p>

    </motion.div>
  );
}
