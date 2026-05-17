import { useState } from "react";
import Login from "./features/auth/Login";
import Dashboard from "./features/dashboard/Dashboard";

function App() {
    const [loggedIn, setLoggedIn] = useState(() => {
        return localStorage.getItem("access_token") !== null;
    });

    return (
        <>
            {loggedIn ? (
                <Dashboard onLogout={() => setLoggedIn(false)} />
            ) : (
                <Login onLogin={() => setLoggedIn(true)} />
            )}
        </>
    );
}

export default App;
