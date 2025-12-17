import React, { useEffect, useState } from "react";
import useEndpoints from "../context/endpoint";
import { Input } from "../components";

function UpdateGroupForm({ groupName, members }) {
    console.log("Update Group Form mounted",groupName,members);
    const { root_url } = useEndpoints();
    const local_token = sessionStorage.getItem("token");
    const [data, setData] = useState([]);
    // const [groupMembers, setGroupMembers] = useState(members);
    // getting list of friends
    const GetList = async () => {
        console.log("Sending request to get list of friends");
        const resp = await fetch(`${root_url}index/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${local_token}`,
            },
        });
        const respDataList = await resp.json();
        setData(respDataList);
    };

    function handleCheckBtn(e) {
        let value = parseInt(e.target.value);
        // setGroupMembers((prev) =>
        //     e.target.checked
        //         ? [...prev, value]
        //         : prev.filter((member) => member !== value)
        // );
        members = e.target.checked
                    ? [...members, value]
                    : members.filter((member) => member !== value)
    }

    useEffect(()=>{
        console.log("Hello", members)
    },[members])

    async function OnUpdateGroup(e){
        e.preventDefault()
        console.log("Submitted to update")
        const foundElement = data.find(element => element.group_name == groupName.current);
        let pk = foundElement ? foundElement.pk : undefined;        
        const groupData  = {
            group_name:e.target.elements['group_name'.value],
            members:groupMembers,
            pk:pk
        }
        const resp = fetch(`${root_url}index/updateGroup/${pk}/`,{
            method:'PUT',
            headers:{
                'content-type':'Application/json',
                Authorization : local_token? `Token ${local_token}`: ''
            },
            body: JSON.stringify(groupData)
        })
        const respJson = await resp.json()
        console.log(respJson)
    }
    if (local_token) {
        useEffect(() => {
            GetList();
        }, []);

        return (
            <form onSubmit={(e) => OnUpdateGroup(e)}>
                <span>Group Name : </span>
                <Input
                    type="text"
                    placeholder="What to name it? 🐱‍💻"
                    name="group_name"
                    value={groupName.current}
                    // onChange={updateUserDetails}
                    required={true}
                />
                <div className="list">
                    <h1>Friends</h1>
                    {data.map((item, index) => {
                        if (!item.username) return;

                        return (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    value={item.pk}
                                    checked={members.includes(item.pk)}
                                    onChange={(e) => handleCheckBtn(e)}
                                />
                                <label htmlFor={item.pk}>{item.username}</label> <br />
                            </div>
                        );
                    })}
                </div>
                <Input
                    type="submit"
                    value="Update Group"
                    className="text-white block bg-red-300"
                />
            </form>
        );
    }
}
export default UpdateGroupForm;
