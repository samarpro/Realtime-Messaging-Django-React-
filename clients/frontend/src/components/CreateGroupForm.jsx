import React, { useEffect, useState } from "react";
import useEndpoints from "../context/endpoint";
import { Input } from "../components";

function CreateGroupForm() {
    console.log("Create Group Form mounted");
    const localToken = sessionStorage.getItem("token");
    const { root_url } = useEndpoints();
    const [groupDetails, setGroupDetails] = useState({
        owner: localToken ? localToken : "",
        group_name: "",
        members: [],
    });
    const [listFriends, setListFriends] = useState([]);

    useEffect(() => {
        const getListFriends = async () => {
            console.log("Local token:", localToken);
            if (!localToken) return;
            const resp = await fetch(`${root_url}index/`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Token ${localToken}`,
                },
            });
            const respList = await resp.json();
            // This API sends groups as well that the user is part of
            await setListFriends(respList);
            console.log(respList);
        };
        getListFriends();
    }, []);

    function updateUserDetails(e) {
        setGroupDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value, // computed property name, allows dynamic object name
        }));
        console.log(groupDetails);
    }
    async function OnCreateGroup(e) {
        e.preventDefault();
        const resp = await fetch(`${root_url}index/createGroup/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localToken}`,

            },
            body: JSON.stringify(groupDetails),
        });
        const respJSON = await resp.json()
        console.log(respJSON);
        console.log("Group Created!");
    }

    function handleCheckBtn(e) {
        console.log(groupDetails)
        setGroupDetails((prev) => ({
            ...prev,
            members: e.target.checked
                ? [...prev.members, e.target.name]
                : prev.members.filter((key, index) =>{
                    console.log(typeof e.target.name,e.target.name === key, typeof key)
                    return e.target.name === key ? null : key
                }
                ),
        }));
    }

    return (
        <form onSubmit={(e) => OnCreateGroup(e)}>
            <span>Group Name : </span>
            <Input
                type="text"
                placeholder="What to name it? 🐱‍💻"
                name="group_name"
                value={groupDetails.group_name}
                onChange={updateUserDetails}
                required={true}
            />
            {listFriends.map((item, index) => (
                // filtering groups
                item.username!=undefined?(
                <label key={index} className="block" htmlFor={item.pk}>
                    {item.username===undefined?item.group_name:item.username}   
                    <input
                        key={item.pk}
                        type="checkbox"
                        name={item.pk}
                        value={item.username}
                        onChange={(e) => handleCheckBtn(e)}
                    />
                </label>):
                null
            ))}
            {groupDetails.members.map((item, index) => (
                <span key={index}>{item}</span>
            ))}
            <Input
                type="submit"
                defaultValue="Create Group"
                className="text-white block bg-red-300"
            />
        </form>
    );
}

export default CreateGroupForm;
