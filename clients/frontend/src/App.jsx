import React from "react";
import { Endpoints_Context_Provider } from "./context/endpoint";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
    Login,
    SignUp,
    Dashboard,
    MsgView,
    CreateGroupForm,
    UpdateGroupForm,
    ErrorBoundary,
    Errors,
    Home,
} from "./components"; // when not exported as default then required to import as { }

const router = createBrowserRouter([
    {
        path: "/signups",
        element: <SignUp />,
    },
    {
        path: "/Dashboard/",
        element: <Dashboard />,
        children: [
            {
                // basically, children requires a complete path
                path: "/Dashboard/:mutual_url/",
                element: <MsgView />,
            },
        ],
    },
    {
        // basically, children requires a complete path
        path: "/createGroup",
        element: <CreateGroupForm />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <Home />,
    },
]);

function App() {
    return (
        <ErrorBoundary fallback={Errors}>
            <Endpoints_Context_Provider
                value={{
                    root_url: import.meta.env.VITE_ROOT_API,
                    root_ws_url: import.meta.env.VITE_ROOT_WS_API,
                }}
            >
                <RouterProvider router={router} />
            </Endpoints_Context_Provider>
        </ErrorBoundary>
    );
}

export default App;
