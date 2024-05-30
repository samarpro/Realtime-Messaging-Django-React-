import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import List from "./elements/List";
import { MsgInput } from "../components";
import { Outlet, useParams } from "react-router-dom";
function Dashboard() {
  const { mutual_url } = useParams();
  const groupNameRef = useRef(mutual_url || "");
  console.log("Dashboard/Parameters are:", mutual_url);
  const [listOfMessages, setListOfMessages] = useState([]);

  const memoSetListOfMessages = useCallback(
    (newData) => setListOfMessages((prev) => [...prev, newData]),
    [mutual_url]
  );
  useEffect(() => {
    // there's a delay in execution of useEffect, runs only after initial render
    console.log("Running UseEffect from Dashboard.jsx");
    groupNameRef.current = mutual_url;
  }, [mutual_url]);

  const MsgInp = useMemo(
    () => (
      <MsgInput
        group_name={groupNameRef}
        setListOfMessages={memoSetListOfMessages}
      />
    ),
    [groupNameRef, mutual_url]
  );
  console.log(listOfMessages);

  useEffect(() => {
    // re-render the Outlet component when the props change
    console.log("Re-rendering Outlet component");
  }, [listOfMessages]);
  return (
    <>
      <div className="container mx-auto flex">
        <div className="listFriends w-1/4 max-w-sm min-w-min">
          <List />
        </div>
        <div className="mainContent relative w-3/4 bg-slate-800 h-screen">
          <Outlet></Outlet>
          <div className="input absolute bottom-0 w-full bg-black">
            {/* when parent renders this component will also re-render although it may seem like its props havenot changed. That's because of setListOfMessages. Which happens to get re-created with every render. */}
            {MsgInp}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
