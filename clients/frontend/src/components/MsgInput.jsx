import React, { useEffect, useRef, useState } from "react";
import useEndpoints from "../context/endpoint";

function MsgInput(props) {
  console.log("Input Box Rendered!");
  // Consists of input box and handles the work of sending messages and updating listOfMsg
  const { group_name, setListOfMessages } = props;
  const wsRef = useRef(null);
  const msgRef = useRef(null);
  const { root_ws_url } = useEndpoints();
  let token = sessionStorage.getItem("token");
  if (!token) token = localStorage.getItem('token')

  useEffect(() => {
    console.log("Running UseEffect...");
    if (!token) return <h1>Token requierd</h1>;
    if (!group_name.current) return;
    const wsConn = new WebSocket(
      `${root_ws_url}SndCht/${group_name.current}/${token}/`
    );
    wsRef.current = wsConn;
    wsConn.onopen = () => {
      console.log("WebSocket Connection is Open");
      console.log(wsConn.url);
    };
    wsConn.onmessage = (event) => {
      const respData = JSON.parse(event.data);
      console.log("Data received:", respData);
      setListOfMessages((prev)=>[...prev,{
        token: respData["token"],
        text: respData["text"],
      }]);
    };

    wsConn.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    wsConn.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };
    return () => {
      if (wsRef.current) wsConn.close();
    };
  }, [group_name.current, token]);
  function SendMsg() {
    console.log(
      "MsgINput/Sending---------------------------------------------------------------"
    );
    console.log(wsRef, wsRef.current);
    if (wsRef.current.readyState != WebSocket.OPEN) {
      console.log("MsgInput Websocket connection is not open.");
      return;
    }
    const text = {
      text: msgRef.current.value,
    };
    let jsonText = JSON.stringify(text);
    wsRef.current.send(jsonText);
  }
  return (
    <div className="flex justify-center items-center">
      <input
        type="text"
        name="messageBox"
        className="w-3/4 p-2 m-4 rounded"
        ref={msgRef}
      />
      <button onClick={SendMsg}>Send</button>
    </div>
  );
}

export default MsgInput;
