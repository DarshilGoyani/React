import axios from "axios";

const API_KEY = "38fd13c7a6c7452eb94cb336a785a8c6"

export async function getData(category: string = "technology") {
    try {
        const res = await axios.get(`https://newsapi.org/v2/everything?q=${category}&apiKey=${API_KEY}`);

        return res.data;
    } catch (err) {
        console.log("Fetch Data Error : ", err)
    }
}

export async function searchNewsData(data: string) {
    try {
        const res = await axios.get(`https://newsapi.org/v2/everything?q=${data}&apiKey=${API_KEY}`);

        return res.data;
    } catch (err) {
        console.log("Searched Data Error : ", err);
    }
}