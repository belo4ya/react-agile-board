import React from 'react';
import api from "./api/api";

function App() {
    api.fetchBoards().then(data => console.log(data))
    return (
        <div className="App">
            Start
        </div>
    );
}

export default App;
