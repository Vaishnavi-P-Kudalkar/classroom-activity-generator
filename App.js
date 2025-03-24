import { useState } from "react";
import "./App.css";

function App() {
    const [topic, setTopic] = useState("");
    const [activity, setActivity] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); // ✅ Error state added

    const generateActivity = async () => {
        if (!topic.trim()) {
            setError("Please enter a topic!");
            return;
        }

        setLoading(true);
        setError(""); // Reset error message

        try {
            const response = await fetch("http://127.0.0.1:5000/generate-activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            setActivity(data.activity);
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to fetch activity. Please try again!");
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
            <button onClick={generateActivity} disabled={loading || !topic.trim()}>
                {loading ? "Generating..." : "Generate Activity"}
            </button>

            {error && <p className="error">{error}</p>} {/* ✅ Display errors */}
            {activity && <p className="result">{activity}</p>} {/* ✅ Display result */}
        </div>
    );
}

export default App;
