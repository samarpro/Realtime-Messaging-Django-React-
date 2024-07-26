import { UNSAFE_NavigationContext, useNavigate } from "react-router-dom"
export function LocalHasToken() {
    const localToken = sessionStorage.getItem("token")
    if (localToken)
        return true
    return false
}


// fetches data from a remote source
// handles authentication
// -> checks if token is already in local storage or else send Personal Info to server for validation
export async function AuthHandler(
    task,
    data,
    root_url
) {
    task = task==="login"?`${task}/`:''
    const resp = await fetch(`${root_url}${task}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // what goes from here is string "{ }"
    });
    const respData = await resp.json();
    if (respData['token']){
        sessionStorage.setItem('token',respData['token'])

    }
    console.log(respData)
    return respData["token"];
}
