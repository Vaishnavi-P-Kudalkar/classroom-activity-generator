//import logo from './logo.svg';
import { useState } from "react";
import './App.css';

function App() {
  const [topic, setTopic] = useState("");
  const [activity, setActivity] = useState("");
  const [loading, setLoading] = useState(false);

  const generateActivity = async () => {
      setLoading(true);
      try {
          const response = await fetch("http://127.0.0.1:5000/generate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ topic }),
          });
          const data = await response.json();
          setActivity(data.activity);
      } catch (error) {
          console.error("Error:", error);
      }
      setLoading(false);
  };

  return (
      <div className="App">
          <h1>AI Classroom Activity Generator</h1>
          <input
              type="text"
              placeholder="Enter a topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
          />
          <button onClick={generateActivity} disabled={loading}>
              {loading ? "Generating..." : "Generate Activity"}
          </button>
          {activity && <p>{activity}</p>}
      </div>
  );
}

export default App;
