import axios from "axios"

export const api = (() => {
    const BASE = "https://dummyjson.com/product"
    return axios.get(BASE)  
});
