import React, { useEffect, useState } from "react";
import useEndpoints from "../../context/endpoint";
import { Link, useNavigate } from "react-router-dom";
function ElementsBox(props) {
  return (
    <li className="list-none">
      <Link className="bg-slate-400 border p-3 block" to={props.url}>
        {props.username === undefined ? props.group_name : props.username}
      </Link>
    </li>
  );
}

function List() {
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
    return (
      <>
        <div className="list">
          <h1>Friends</h1>
          {data.length == 0 ? <h1>No friends</h1> : (data.map((item, index) => {
            return (
              <ElementsBox
                key={index}
                username={item.username}
                group_name={item.group_name}
                url={item.group_url}
              />
            );
          }))}
        </div>
        <Link className='bg-slate-700 p-4 block' to='../createGroup' >Create Group</Link>
        <button onClick={() => {
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


export default List;
export { ElementsBox };
