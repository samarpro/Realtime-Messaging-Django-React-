import React, {
    useEffect,
    useState,
    useRef,
    useCallback,
    useMemo,
} from "react";
import { useParams, useOutletContext, Link } from "react-router-dom";
import useEndpoints from "../context/endpoint";
import { MsgInput,UpdateGroupForm } from ".";
function MsgView() {
    console.log("MSGVIEW");
    // at first no url, so mutual_url -> undefined
    const { mutual_url } = useParams();
    const { root_url } = useEndpoints();
    const local_token = sessionStorage.getItem("token");
    const groupNameRef = useRef(mutual_url || ""); // used for reference only
    const [hasToken, setHasToken] = useState(true);
    const [listOfMessages, setListOfMessages] = useState([]);
    const [renderBoolean,setRenderBoolean] = useState(false)

    useEffect(() => {
        // there's a delay in execution of useEffect, runs only after initial render
        console.log("Running UseEffect from MsgLoader");
        groupNameRef.current = mutual_url;
    }, [mutual_url]);

    const MsgInp = useMemo(
        () => (
            <MsgInput
                group_name={groupNameRef}
                setListOfMessages={setListOfMessages}
            />
        ),
        [groupNameRef, mutual_url]
    );
    console.log(groupNameRef)
    const getMessages = useCallback(async () => {
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
            console.log("Mesage list",messagesList)
        } catch (error) {
            console.error("Error fetching messages:", error);
        }

        // checking more messages
    }, [mutual_url]);

    useEffect(() => {
        if (!local_token) {
            setHasToken(false);
            return;
        }
        getMessages();
    }, [local_token, mutual_url, root_url]);
    console.log("something ", listOfMessages.at(-1),listOfMessages)
    console.log([].at(-1))
    if (!hasToken) {
        return <h1>Error: No token found</h1>;
    }

    return (
        <div className="flex flex-col justify-between bg-red-400 h-full">
            <div className="messages-only ">
            <button className="p-3 bg-pink-400 rounded " onClick={()=>setRenderBoolean((prev)=>!prev)} >Settings</button>
            
            {renderBoolean?
            (<UpdateGroupForm groupName = {groupNameRef} members = {listOfMessages.length!==0?listOfMessages.at(-1).members:[]} />)
            :null}
            
                {listOfMessages.length === 0 ? (
                    <h1>No messages</h1>
                ) : (
                    listOfMessages.map((item, index) => (
                            <div key={index}>
                            <h1                                
                                className={
                                    item.token === local_token?"float-right" : "float-left"
                                }
                            >
                                {item.text}
                            </h1>
                                <br />
                            </div>
                    ))
                )}
            </div>
            <div className="input-only">{MsgInp}</div>
        </div>
    );
}
export default MsgView;
