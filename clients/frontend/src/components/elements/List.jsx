import React, { useEffect, useState, memo} from "react";
import useEndpoints from "../../context/endpoint";
import { Link, useNavigate } from "react-router-dom";
function ElementsBox(props) {
  return (
    <li className="list-none" onClick={props.onClick}>
      <Link className=" uppercase " to={props.url}>
        <p>{props.username === undefined ? props.group_name : props.username}</p>
      </Link>
    </li>
  );
}

function List({setTriggerNav}) {
  const { root_url } = useEndpoints();
  const [data, setData] = useState([]);
  const local_token = sessionStorage.getItem("token");
  const navigate = useNavigate()
  // asynchronously gets list of user
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
    console.log(respDataList)
  };
  if (local_token) {
    useEffect(() => {
      GetList();
    }, []);
    console.log("ListOfFriends")
    return (
      <>
        <div className="list my-10">
          <h1 className="text-2xl text-center">Your Doouts</h1>
          {data.length == 0 ? <h1>No friends</h1> : (data.map((item, index) => {
            return (
              <ElementsBox
                key={index}
                username={item.username}
                group_name={item.group_name}
                url={item.group_url}
                onClick={()=>setTriggerNav(prev=>!prev)}
              />
            );
          }))}
        </div>
        <Link className='bg-slate-700 p-2 m-1 rounded-md' to='../createGroup' >Create Group</Link>
        <button className='bg-slate-700 p-2 m-1 rounded-md block' onClick={() => {
          console.log("clicked")
          sessionStorage.clear()
          navigate('../')
        }}>Sign Out</button>
      </>
    )
  }
  console.log("useNavigate for this function")
  navigate('../')
  return (
    <>
      <h1>Required Login to view this Page.</h1>
    </>
  );
}


export default memo(List);
export { ElementsBox };
