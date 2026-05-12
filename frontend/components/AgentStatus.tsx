"use client";

import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Bug, Search, ClipboardList } from "lucide-react";

interface Agent {
  name: string;
  status: string;
}

interface Props {
  agents: Agent[];
}

const getIcon = (name: string) => {

  if (name.includes("Planner")) {
    return <ClipboardList className="w-6 h-6" />;
  }

  if (name.includes("Research")) {
    return <Search className="w-6 h-6" />;
  }

  if (name.includes("Developer")) {
    return <Cpu className="w-6 h-6" />;
  }

  if (name.includes("QA")) {
    return <Bug className="w-6 h-6" />;
  }

  if (name.includes("Security")) {
    return <ShieldCheck className="w-6 h-6" />;
  }

  return <Cpu className="w-6 h-6" />;
};

export default function AgentStatus({ agents }: Props) {

  return (

    <div className="mt-12">

      <h2 className="text-3xl font-bold mb-6">
        Agent Status
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {agents.map((agent, index) => (

          <motion.div
            key={agent.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="
              bg-white/5
              border border-white/10
              backdrop-blur-lg
              rounded-2xl
              p-6
              shadow-xl
            "
          >

            <div className="flex items-center justify-between mb-4">

              <div className="flex items-center gap-3">

                <div className="
                  bg-blue-500/20
                  text-blue-400
                  p-3
                  rounded-xl
                ">
                  {getIcon(agent.name)}
                </div>

                <div>
                  <h3 className="text-xl font-semibold">
                    {agent.name}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    AI Agent
                  </p>
                </div>

              </div>

              <div className="
                flex items-center gap-2
                bg-green-500/10
                text-green-400
                px-3 py-1
                rounded-full
                text-sm
              ">

                <span className="
                  w-2 h-2
                  rounded-full
                  bg-green-400
                  animate-pulse
                " />

                {agent.status}

              </div>

            </div>

            <div className="mt-4">

              <div className="
                h-2
                bg-gray-800
                rounded-full
                overflow-hidden
              ">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.2
                  }}
                  className="
                    h-full
                    bg-gradient-to-r
                    from-blue-500
                    to-cyan-400
                  "
                />

              </div>

              <p className="text-gray-500 text-sm mt-2">
                Operational and monitoring workflow
              </p>

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
}
