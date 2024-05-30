import React from "react";
import ReactDOM from "react-dom/client";
import { Endpoints_Context_Provider } from "./context/endpoint";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login, SignUp, Dashboard, MsgLoader } from "./components"; // when not exported as default then required to import as { }

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
        element: <MsgLoader />,
      },
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Endpoints_Context_Provider
    value={{
      root_url: import.meta.env.VITE_ROOT_API,
      root_ws_url: import.meta.env.VITE_ROOT_WS_API,
    }}
  >
    <RouterProvider router={router} />
  </Endpoints_Context_Provider>
  // </React.StrictMode>,
);
