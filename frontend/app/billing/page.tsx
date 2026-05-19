export default function BillingPage() {

    return (
      <main className="min-h-screen bg-black text-white p-10">
  
        <h1 className="text-5xl font-bold">
          Billing & Subscription
        </h1>
  
        <div className="grid md:grid-cols-3 gap-6 mt-10">
  
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold">Starter</h2>
            <p className="text-5xl mt-6">$29</p>
          </div>
  
          <div className="bg-blue-600 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold">Enterprise</h2>
            <p className="text-5xl mt-6">$299</p>
          </div>

          </div>

</main>
);
}  