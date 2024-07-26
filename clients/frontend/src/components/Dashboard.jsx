import React from "react";
import List from "./elements/List";
import { Outlet } from "react-router-dom";
function Dashboard() {
  console.log("Running Dashboard")
  return (
    <>
      <div className="container mx-auto flex">
        <div className="listFriends w-1/4 max-w-sm min-w-min">
          <List />
        </div>
        <div className="mainContent relative w-3/4 bg-slate-800 h-screen">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
