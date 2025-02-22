import { io } from "socket.io-client";
import {BASE_URL} from "./Constant.js"


export const createSocketConnection = ()=>{

    return io(BASE_URL)

}