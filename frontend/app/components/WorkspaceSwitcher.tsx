"use client";

import { useState } from "react";

export default function WorkspaceSwitcher() {
  const [workspace, setWorkspace] = useState("Personal");

  const workspaces = ["Personal", "Team Alpha", "Enterprise Ops"];

  return (
    <div className="p-3 bg-white rounded-xl shadow">
      <select
        value={workspace}
        onChange={(e) => setWorkspace(e.target.value)}
        className="p-2 border rounded"
      >
        {workspaces.map((w) => (
          <option key={w}>{w}</option>
        ))}
      </select>
    </div>
  );
}