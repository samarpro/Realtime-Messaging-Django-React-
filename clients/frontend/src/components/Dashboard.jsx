import React, { useRef, useState } from "react";
import List from "./elements/List";
import { Outlet } from "react-router-dom";
import hamBar from '../assets/hamBar.svg'
import cross from '../assets/cross.svg'
function Dashboard() {

  const [triggerNav, setTriggerNav] = useState(false)
  return (
    <> 
      {triggerNav ?<p className="absolute top-1 right-1" onClick={()=>setTriggerNav(prev=>!prev)}><img src={cross} className="w-10" /></p>:<p className="absolute top-8 right-1" onClick={()=>setTriggerNav(prev=>!prev)}><img src={hamBar} className="w-12" /></p>}
      <div className={`flex w-screen overflow-x-hidden `}>
        <div className={`listFriends min-w-full ${triggerNav?"hidden":""}`} >
          <List setTriggerNav={setTriggerNav}/>
        </div>
        <div className="mainContent w-screen h-screen">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}1

export default Dashboard;
