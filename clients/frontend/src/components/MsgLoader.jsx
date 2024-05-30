import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import useEndpoints from "../context/endpoint";
// import {MsgInput} from '../components'
function MsgLoader(props) {
  console.log("MsgLoader");
  const { mutual_url } = useParams();
  const [listOfMessages, setListOfMessages] = useState([]);
  const { root_url } = useEndpoints();
  const [hasToken, setHasToken] = useState(true);
  const local_token = localStorage.getItem("token");

  const getMessages = async () => {
    console.log("Getting all the Messages...");
    try {
      const response = await fetch(`${root_url}index/${mutual_url}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: local_token ? `Token ${local_token}` : "",
        },
      });
      const messagesList = await response.json();
      setListOfMessages(messagesList);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }

    // checking more messages
  };

  useEffect(() => {
    if (!local_token) {
      setHasToken(false);
      return;
    }
    getMessages();
  }, [local_token, mutual_url, root_url]);

  // useEffect(() => {
  //     console.log("Updating list")
  //     return
  // }, [listOfMessages])

  if (!hasToken) {
    return <h1>Error: No token found</h1>;
  }

  return (
    <div>
      {listOfMessages.length === 0 ? (
        <h1>No messages</h1>
      ) : (
        listOfMessages.map((item, index) => <h1 key={index}>{item.text}</h1>)
      )}
      <h1>hhh{mutual_url}</h1>
    </div>
  );
}
export default MsgLoader;
