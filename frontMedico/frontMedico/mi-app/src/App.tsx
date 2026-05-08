import { useState } from "react";
import Login from "./features/auth/Login";
import Dashboard from "./features/dashboard/Dashboard";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <>
            {loggedIn ? (
                <Dashboard />
            ) : (
                <Login onLogin={() => setLoggedIn(true)} />
            )}
        </>
    );
}

export default App;
