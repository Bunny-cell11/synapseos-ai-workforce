export default function PricingPlans() {
    const plans = [
      { name: "Starter", price: "$0", features: ["Basic AI", "1 Project"] },
      { name: "Pro", price: "$29", features: ["Advanced AI", "10 Projects"] },
      { name: "Enterprise", price: "$99", features: ["Full AI Workforce", "Unlimited"] }
    ];
  
    return (
      <div className="grid grid-cols-3 gap-4">
        {plans.map((p) => (
          <div key={p.name} className="p-4 bg-white rounded-xl shadow">
            <h2 className="text-xl font-bold">{p.name}</h2>
            <p className="text-2xl">{p.price}</p>
  
            <ul className="mt-2 text-sm text-gray-600">
              {p.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
  
            <button className="mt-3 bg-black text-white px-3 py-1 rounded">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    );
  }