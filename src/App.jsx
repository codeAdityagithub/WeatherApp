import { useState } from "react";

import "./App.css";

function App() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState(null);
    console.log()
    return (
        <div className="container">
            <form>
                <input
                    type="text"
                    className="queryInput"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>
            <div className="output">

            </div>
        </div>
    );
}

export default App;
