"use client";

interface Props {
  total: number;
  completed: number;
  progress: number;
}

export default function DashboardStats({
  total,
  completed,
  progress
}: Props) {

  return (
    <div className="grid md:grid-cols-3 gap-4 mb-8">

      <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
        <h3 className="text-zinc-400">Total Tasks</h3>
        <p className="text-3xl font-bold mt-2">
          {total}
        </p>
      </div>

      <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
        <h3 className="text-zinc-400">Completed</h3>
        <p className="text-3xl font-bold mt-2 text-green-400">
          {completed}
        </p>
      </div>

      <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
        <h3 className="text-zinc-400">Progress</h3>
        <p className="text-3xl font-bold mt-2 text-blue-400">
          {progress}%
        </p>
      </div>

    </div>
  );
}
