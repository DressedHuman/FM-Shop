import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)



// test_token function to check if a user is already authorized
const test_token = async (token) => {
    try {
        const res = await api.get("/api/user/test_token/", {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return res.status === 200;
    } catch (error) {
        return false;
    }
}



export { api, test_token };