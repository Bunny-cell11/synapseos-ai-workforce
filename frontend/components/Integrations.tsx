"use client";

export default function Integrations() {

  const integrations = [
    "GitHub",
    "Slack",
    "Jira",
    "Notion",
    "Azure",
    "AWS"
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Enterprise Integrations
      </h2>

      <div className="grid grid-cols-2 gap-4">

        {integrations.map((item) => (

          <div
            key={item}
            className="bg-black border border-zinc-700 rounded-xl p-4 text-center"
          >
            {item}
          </div>

        ))}

      </div>

    </div>
  );
}
