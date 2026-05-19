export default function DashboardPage() {

    return (
      <main className="min-h-screen bg-black text-white p-10">
  
        <h1 className="text-5xl font-bold">
          SynapseOS Dashboard
        </h1>
  
        <div className="grid grid-cols-4 gap-6 mt-10">
  
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h2 className="text-xl">AI Agents</h2>
            <p className="text-4xl mt-4">38</p>
          </div>
  
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h2 className="text-xl">Workflows</h2>
            <p className="text-4xl mt-4">245</p>
        </div>

      </div>

    </main>
  );
}