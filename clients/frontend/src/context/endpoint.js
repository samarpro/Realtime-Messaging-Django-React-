import { createContext, useContext, useRef } from "react";

export const Endpoints_Context = createContext({
    root_url : import.meta.env.VITE_ROOT_API, // thiis is s initial value and cannot be accessed when using hook; shows undefined instead
    root_ws_url: import.meta.env.VITE_ROOT_WS_API,
}) 

export const Endpoints_Context_Provider = Endpoints_Context.Provider // provider makes sure that all the part of application are aware of global context.

export default function useEndpoints(){
    return useContext(Endpoints_Context)
}