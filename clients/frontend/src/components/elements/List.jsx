import React, { useEffect, useState } from "react";
import useEndpoints from "../../context/endpoint";
import { Link } from "react-router-dom";

function ElementsBox(props) {
  return (
    <li className="list-none">
      <Link className="bg-slate-400 border p-3 block" to={props.url}>
        {props.username}
      </Link>
    </li>
  );
}

function List() {
  const { root_url } = useEndpoints();
  console.log("fsdjkfhgsj");
  const [data, setData] = useState([]);
  const local_token = localStorage.getItem("token");
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
  if (local_token) {
    useEffect(() => {
      GetList();
    }, []);
    return (
      <>
        <div className="list">
          <h1>Friends</h1>
          {data.map((item, index) => {
            return (
              <ElementsBox
                key={index}
                username={item.username}
                url={item.group_url}
              />
            );
          })}
        </div>
      </>
    );
  }
  return (
    <>
      <h1>Required Login to view this Page.</h1>
    </>
  );
}

export default List;
