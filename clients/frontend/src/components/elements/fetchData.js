
export function LocalHasToken() {
    const localToken = localStorage.getItem("token")
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
    task = task==="login"?task:""
    const resp = await fetch(`${root_url}${task}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const respData = await resp.json();
    if (respData['token']){
        localStorage.setItem('token',respData['token'])
        console.log("Redirection is required.")
    }
    console.log(respData)
    return respData["token"];
}
