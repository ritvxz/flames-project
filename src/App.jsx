import { useState } from "react";

const App = () => {
  const [name1,setName1] = useState("");
  const [name2,setName2] = useState("");
  const [result,setResult] = useState("");
  const [consent, setConsent] = useState(false);


 const calculateFlames = () => {
  if (!name1 || !name2) {
    setResult("Please Enter both the names");
    return;
  }

  let n1 = name1.toLowerCase().split("");
  let n2 = name2.toLowerCase().split("");

  for (let i = 0; i < n1.length; i++) {
    let index = n2.indexOf(n1[i]);
    if (index !== -1) {
      n1.splice(i, 1);
      n2.splice(index, 1);
      i--;
    }
  }

  let count = n1.length + n2.length;

  let flames = ["F", "L", "A", "M", "E", "S"];
  let index = 0;

  while (flames.length > 1) {
    index = (index + count - 1) % flames.length;
    flames.splice(index, 1);
  }

  const map = {
    F: "💙 FRIENDS",
    L: "❤️ LOVE",
    A: "💛 AFFECTION",
    M: "💍 MARRIAGE",
    E: "💢 ENEMIES",
    S: "🤝 SIBLINGS",
  };

  const finalResult = map[flames[0]]; // ✅ store locally
  setResult(finalResult);

  if (consent) {
    fetch("/.netlify/functions/logNames", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name1,
        name2,
        result: finalResult, // ✅ correct value
        timestamp: new Date().toISOString(),
      }),
    });
  }
};


  return (
    <div className="
      min-h-screen w-screen flex items-center justify-center px-4
      bg-gradient-to-br from-slate-900 via-blue-800 to-slate-700
    ">
      <div className="
        w-full max-w-md
        bg-white/20 backdrop-blur-xl
        rounded-3xl shadow-2xl
        p-8
        border border-white/30
      ">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          🔥 FLAMES 🔥
        </h1>

        <p className="text-white/80 text-center mb-6">
          Relationship Calculator
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            className="
              w-full px-4 py-3 rounded-xl
              bg-white/80 text-gray-800
              focus:outline-none focus:ring-2 focus:ring-blue-500

            "
            value={name1}
            onChange={(e)=>setName1(e.target.value)}
          />

          <input
            type="text"
            placeholder="Second Name"
            className="
              w-full px-4 py-3 rounded-xl
              bg-white/80 text-gray-800
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
            value={name2}
            onChange={(e)=>setName2(e.target.value)}
          />
        </div>
        <div className="mt-4 text-sm text-white/80">
  <label className="flex items-start gap-2 cursor-pointer">
    <input
      type="checkbox"
      checked={consent}
      onChange={(e) => setConsent(e.target.checked)}
      className="mt-1 accent-blue-500"
    />
    <span>
      I agree
    </span>
  </label>
</div>


        {/* Button */}
        <button
          className="
            mt-6 w-full py-3 rounded-2xl
            bg-gradient-to-r from-blue-600 to-cyan-500
            text-white font-semibold text-lg
            hover:scale-[1.02] active:scale-95
            transition-all duration-200
            shadow-lg
          "
          onClick=
          {calculateFlames}
        >
          Calculate
        </button>
        {result && (
  <div className="
    mt-6 text-center text-xl font-semibold
    text-white
    bg-white/20 backdrop-blur-md
    rounded-xl py-3
    animate-pulse
  ">
    {result}
  </div>
)}

      </div>
    </div>
  );
};

export default App;
