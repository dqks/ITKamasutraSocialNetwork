import axios from "axios";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": `0b4562cf-54b0-4945-b7d0-9b21f69fc8f6`
    }
});